
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

const fetchJournalsByUser = gql`
query($userID: String!) {
    journalsFor(userID: $userID) {
        createdOn
        name
        journalID
        userID
    }
}`



const testQuery = gql`
query {
    test
}`


const updateRecord = gql`
mutation($year: String!, $month: String!, $date: String!, $status: String!, $journalID: String!) {
    postRecord(year: $year, month: $month, date: $date, status: $status, journalID: $journalID)  {
        month
        year
        journalID
        status
        frontEndID
        date
    }
}
`

export { get, testQuery, updateRecord, fetchJournalData, fetchJournalsByUser };