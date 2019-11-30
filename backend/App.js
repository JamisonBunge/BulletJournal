
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const path = require('path')
const cors = require('cors')
const app = express();
const mongoose = require('mongoose');
const DayEntry = require('./Models/DayEntry')
const Journal = require('./Models/Journal')
const _ = require('lodash');

//the way the database schema is set up, only one journal can exist right now
//this is because of full date being a unique key when we need fullDate and journalId to be a composite key
//this journalsfor needs to return a regular object not an array
const schema = gql`
type Query {
	test: String,
    journalDataByYear(year: String!):[DayEntry],
    journalData(year: String, month: String, date: String, journalID: String!): [DayEntry],
    journalsFor(userID: String!): [Journal]
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
    keys: [String],
    createdOn: String,
    userID: String,
    journalID: String

}
type Mutation {
    postRecord(year: String!, month: String!,
             date: String!, status: String!, journalID: String!): DayEntry,
    postJournal(journalID: String!, keys: [String]!, userID: String!, name: String!): Journal
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
        journalsFor: (root, args) => {
            let query = { userID: args.userID }
            return Journal.find(query, function (err, docs) {
                console.log(docs);
            });
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
                journalID: args.journalID,
                keys: args.keys,
                userID: args.userID,
                createdOn: String(new Date),
                name: args.name
            });
            return journal.save();

        }
    }
};

const server = new ApolloServer({
    typeDefs: schema,
    resolvers
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
