
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const path = require('path')
const cors = require('cors')
const app = express();
const mongoose = require('mongoose');
const DayEntry = require('./Models/DayEntry')
const Journal = require('./Models/Journal')
const _ = require('lodash');


const schema = gql`
type Query {
	test: String,
    getYear(year: String!): String,
    JournalByYear(year: String!):[DayEntry]
},
type DayEntry {
    day: String,
    month: String,
    year: String,
    journalID: String,
    status: String,
    frontEndID: String,
    date: String,
},
type Journal {
    name: String,
    keys: [String],
}
type Mutation {
  post(name: String!): DayEntry
}
`

const resolvers = {
    Query: {
        test: () => {
            console.log("hit")
            return "something else"
        },
        getYear: () => {
            return "jami"
            return { "name": "jami" };
        },
        JournalByYear: (root, args) => {
            // dayEntry.find({})
            //console.log(args.year);

            return DayEntry.find({ year: args.year })

            console.log(DayEntry.find({}));
            let dayEntry = new DayEntry({
                day: args.name,
                month: "12",
                year: "2019",
                journalID: "1",
                status: "1",
                frontEndID: "row-16-col-12",
                date: "doesntmatter",
            });
            return dayEntry;
        }
    },
    Mutation: {
        post: (root, args) => {
            let dayEntry = new DayEntry({
                day: args.name,
                month: "12",
                year: "2019",
                journalID: "1",
                status: "1",
                frontEndID: "row-16-col-12",
                date: "doesntmatter",
            });
            return dayEntry.save();
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
            day: entry.getDay(),
            month: entry.getMonth() + 1,
            year: entry.getFullYear(),
            journalID: "1",
            status: random,
            frontEndID: `row-${entry.getDay() + 1}-col-${entry.getMonth()}`,
            date: entry,
        });
        dayEntry.save();
        console.log(new Date(start))
    }



}
