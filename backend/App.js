
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const path = require('path')
const cors = require('cors')
const app = express();
const MongoClient = require('mongodb').MongoClient;
const DayEntry = require('./Models/DayEntry')
const Journal = require('./Models/Journal')
const _ = require('lodash');


const schema = gql`
type Query {
	test: String,
    getYear(year: String!): String

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
    Day: String,
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
        }
    },
    Mutation: {
        post: (root, args) => {
            let dayEntry = new DayEntry({
                name: args.name,
                day: "16",
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


//mongoose.connect('mongodb+srv://jami:<password>@cluster0-ugiqo.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });




const uri = "mongodb+srv://jami:<password>@cluster0-ugiqo.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true }, { useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    console.log('connected')
    // perform actions on the collection object
    client.close();
});





app.use(express.static('public'))
//redirect everything that isnt to /graphql to the index.thml of the react app build

// Add the Apollo Server’s middleware
server.applyMiddleware({ app })

//allow cross-origin requres
app.use(cors());

// app.get('*', (req, res) => {
// 	res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
// })


app.listen({ port: process.env.PORT || 5001 }, () => console.log(`Apollo Server is listening on ${server.graphqlPath}`))