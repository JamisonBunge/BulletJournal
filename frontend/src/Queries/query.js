
import { gql } from "apollo-boost";

const get = gql`
query($lat: String!) {
    placesAt(lat: $lat) {
        temp
    }
}
`

const fetchJournalData = gql`
query($year: String!, $journalID: String!) {
    journalData(year: $year, journalID: $journalID) {
        frontEndID
        status
        fullDate
        year
        date
        month
        journalID
    }
}`


const testQuery = gql`
query {
    test
}`


const testMutation = gql`
mutation($name: String!,$description: String!) {
  post(name: $name,description: $description) {
    day
    month
    year
    journalID
    status
    frontEndID
    date
    }
}
`

export { get, testQuery, testMutation, fetchJournalData };