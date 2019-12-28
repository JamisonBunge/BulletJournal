
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const path = require('path')
const cors = require('cors')
const app = express();
const mongoose = require('mongoose');
const DayEntry = require('./Models/DayEntry')
const Journal = require('./Models/Journal')
const User = require('./Models/User')
const _ = require('lodash');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const isAuth = require('./middlewhere/is-auth')

//the way the database schema is set up, only one journal can exist right now
//this is because of full date being a unique key when we need fullDate and journalId to be a composite key
//this journalsfor needs to return a regular object not an array
const schema = gql`
type Query {
	test: String,
    journalDataByYear(year: String!):[DayEntry],
    journalData(year: String, month: String, date: String, journalID: String!): [DayEntry],
    journalsFor(userID: String!): [Journal],
    login(email: String!, password: String!): AuthData!
},
type DayEntry {
    date: String,
    month: String,
    year: String,
    journalID: String,
    status: String,
    frontEndID: String,
    fullDate: String,
},
type Journal {
    name: String,
    _id: ID,
    keys: [String],
    colors: [String]
    createdOn: String,
    userID: String,
    journalID: String
},
type User {
    _id: ID,
    firstName: String,
    lastName: String,
    email: String,
    password: String
},
type AuthData {
    userID: ID!,
    token: String!
    tokenExpiration: Int!
}
type Mutation {
    postRecord(year: String!, month: String!,
             date: String!, status: String!, journalID: String!): DayEntry,
    postJournal(journalID: String!, keys: [String]!, userID: String!, name: String!): Journal,
    postJournalNew(userID: String, keys: [String], colors: [String],  name: String): Journal,
    postUser(firstName: String!, lastName: String!, email: String!, password: String!): User
}
`

const resolvers = {
    Query: {
        test: () => { return "hello there :)" },
        journalDataByYear: (root, args) => { return DayEntry.find({ year: args.year }) },
        journalData: (roots, args) => {
            console.log("hi")
            console.log(args.journalID)
            let queryBy = { journalID: args.journalID };
            if (args.date) queryBy.date = args.date;
            if (args.month) queryBy.month = args.month;
            if (args.year) queryBy.year = args.year;
            return DayEntry.find(queryBy)
        },
        journalsFor: (obj, args, context, info) => {
            // console.log(info)

            console.log(context.isAuth);
            console.log(context.userID)
            console.log("itsme^")
            let query = { userID: args.userID }
            return Journal.find(query, function (err, docs) {
                //   console.log(docs);
                //  console.log(docs._id)

            });
        },
        login: async (root, { email, password }) => {
            console.log(email)
            const user = await User.findOne({ email: email });
            if (!user) {
                throw new Error('User does not exist')
            }

            const isEqual = await bcrypt.compare(password, user.password);
            if (!isEqual) {
                throw new Error('Password is incorrect')
            }

            console.log(user)
            const token = jwt.sign({ userID: user._id, email: user.email }, 'cuddles&jaxson', {
                expiresIn: '1h'
            })

            return { userID: user._id, token: token, tokenExpiration: 1 }
        }
    },
    Mutation: {
        postRecord: (root, args) => {

            let query = { year: args.year, month: args.month, date: args.date, journalID: args.journalID };
            let update = {
                status: args.status, frontEndID: `row-${args.date}-col-${args.month}`,
                fullDate: new Date(`${args.month}/${args.date}/${args.year}`)
            }
            //console.log("LALALA")
            console.log(query)
            console.log(update)
            console.log("\n\n")
            return DayEntry.findOneAndUpdate(query, update, {
                new: true,
                upsert: true // Make this update into an upsert
            });
        },
        postJournal: (root, args) => {

            //maybe make some changes
            //so that it checks to make sure journalID/name is not already taken

            let journal = new Journal({
                //DEPRICATED >>
                journalID: args.journalID,
                // <<
                keys: args.keys,
                userID: args.userID,
                createdOn: String(new Date),
                name: args.name
            });
            return journal.save();

        },
        postJournalNew: (root, args) => {

            let journal = new Journal({
                keys: args.keys,
                colors: args.colors,
                _id: mongoose.Types.ObjectId(),
                userID: args.userID,
                createdOn: String(new Date),
                name: args.name
            });
            return journal.save();
        },
        postUser: async (root, args) => {
            try {
                const existingUser = await User.findOne({ email: args.email }, function (err, obj) {
                    if (obj) {
                        console.log("in here")
                    }
                    console.log(obj);
                });
                console.log(existingUser)
                if (existingUser) {
                    throw new Error('User exists already.');
                }

                const hashedPassword = await bcrypt.hash(args.password, 12);

                const user = new User({
                    email: args.email,
                    firstName: args.firstName,
                    lastName: args.lastName,
                    password: hashedPassword,
                    _id: mongoose.Types.ObjectId(),
                });
                console.log("helllllllothereishouldnotbehappening")

                const result = await user.save();

                return { ...result._doc, password: null, _id: result.id };
            } catch (err) {
                //handle the existing user case by returning a null user
                //the front-end will be responsible for dealing with this
                const user = new User({
                    email: null,
                    _id: null,
                    firstName: null,
                    lastName: null,
                    password: null,
                    _id: null,
                });
                return user;
                // throw err;
            }

        }
    }
};



// JWT token middleware
// app.use(async (req, res, next) => {
//     const bearerToken = req.headers['authorization'];
//     if (bearerToken) {
//         try {
//             const token = bearerToken.split(" ")[1];
//             const currentUser = await jwt.verify(token, process.env.SECRET);
//             console.log("middleware", currentUser)
//             req.currentUser = currentUser;
//         } catch (err) {
//             console.log(err)
//         }
//     }
//     next();
// })

//getUser()


const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: ({ req }) => {
        // get the user token from the headers

        //this context needs to set two things
        //isauth,
        //userid


        const token = req.headers.authorization || '';
        const splitToken = token.split(' ')[1]; //Authorizaton: Berer blahblahblah

        let info = { isAuth: false, userID: "" };

        //the token did not exist or is empty, return the default values
        if (!splitToken || splitToken == "") {
            return info;
        }

        //  console.log(splitToken);


        // console.log(token)
        // const decodedToken = jwt.verify(token, 'cuddles&jaxson');
        let decodedToken;
        try {
            console.log('dd')
            decodedToken = jwt.verify(splitToken, 'cuddles&jaxson');
            console.log(decodedToken)
            console.log('aa')
            info.userID = decodedToken.userID;
            info.isAuth = true;
        } catch (err) {
            console.log('here')
            info.isAuth = false;
            info.userID = '';
        }

        return info;

        // console.log(decodedToken)

        // try to retrieve a user with the token
        //const user = getUser(token);

        // add the user to the context
        // return { isAuth };
    },
});





// server.listen().then(({ url }) => {
// 	console.log(`Server ready at ${url}`);
// });

// server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
// 	console.log(`🚀 Server ready at ${url}`);
// });




mongoose.connect('mongodb+srv://jami:thisismypassword@cluster0-ugiqo.mongodb.net/test?retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
    console.log('connected to the DB');
    //populateRandomData();
});


app.listen({ port: process.env.PORT || 5001 }, () => console.log(`Apollo Server is listening on ${server.graphqlPath}`))








app.use(cors());
app.use(express.static('public'))
//redirect everything that isnt to /graphql to the index.thml of the react app build

// Add the Apollo Server’s middleware

server.applyMiddleware({ app })
//app.use(isAuth)

//allow cross-origin requres


// app.get('*', (req, res) => {
// 	res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
// })



//function to create random data for the year of 2019

let populateRandomData = () => {

    //  let thisYear = (new Date).getYear();
    let thisYear = 2019;
    let start = new Date(`01/01/${thisYear}`);
    let end = new Date(`12/31/${thisYear}`)
    // let newend = end.setDate(end.getDate() + 1);
    // let end = new Date(newend);
    // while (start < end) {
    //     console.log(start);

    //     let newDate = start.setDate(start.getDate() + 1);
    //     start = new Date(newDate);
    // }


    let now = new Date();
    let daysOfYear = [];
    for (let start = new Date(`01/01/${thisYear}`); start <= end; start.setDate(start.getDate() + 1)) {
        daysOfYear.push(new Date(start));

        let entry = new Date(start);
        let random = Math.floor(Math.random() * 3)

        let dayEntry = new DayEntry({
            date: entry.getDate(),
            month: entry.getMonth() + 1,
            year: entry.getFullYear(),
            journalID: "51",
            status: random,
            frontEndID: `row-${entry.getDate()}-col-${entry.getMonth() + 1}`,
            fullDate: entry,
        });
        console.log(dayEntry)
        dayEntry.save();
        //console.log(new Date(start))
    }



}
