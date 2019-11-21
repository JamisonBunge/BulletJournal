
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
    journalDataByYear(year: String!):[DayEntry],
    journalData(year: String, month: String, date: String): [DayEntry]
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
}
type Mutation {
  post(name: String!): DayEntry,
  postRecord(year: String!, month: String!, date: String!, status: String!): DayEntry
}
`

const resolvers = {
    Query: {
        test: () => { return "hello there :)" },
        journalDataByYear: (root, args) => { return DayEntry.find({ year: args.year }) },
        journalData: (roots, args) => {
            let queryBy = {};
            if (args.date) queryBy.date = args.date;
            if (args.month) queryBy.month = args.month;
            if (args.year) queryBy.year = args.year;
            return DayEntry.find(queryBy)
        }
    },
    Mutation: {
        post: (root, args) => {
            let dayEntry = new DayEntry({
                date: args.name,
                month: "12",
                year: "2019",
                journalID: "1",
                status: "1",
                frontEndID: "row-16-col-12",
                fullDate: "doesntmatter",
            });
            return dayEntry;
        },
        postRecord: (root, args) => {

            let existingRecord = DayEntry.find({ year: args.year, month: args.month, date: args.date })

            //check to see if the record exists already
            if (existingRecord) { console.log("here") }
            else { console.log("nope") }




            //temp return
            let dayEntry = new DayEntry({
                date: args.name,
                month: "12",
                year: "2019",
                journalID: "1",
                status: "1",
                frontEndID: "row-16-col-12",
                fullDate: "doesntmatter",
            });
            return dayEntry;
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
            journalID: "1",
            status: random,
            frontEndID: `row-${entry.getDay() + 1}-col-${entry.getMonth()}`,
            fullDate: entry,
        });
        console.log(dayEntry)
        dayEntry.save();
        //console.log(new Date(start))
    }



}
