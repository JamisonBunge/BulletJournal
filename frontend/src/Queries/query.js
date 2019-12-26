
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
        _id
        userID
        colors
        keys
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

const postJournal = gql`
mutation($userID: String, $name: String, $keys:[String], $colors:[String]) {
    postJournalNew(userID: $userID, name: $name, keys: $keys, colors: $colors) {
        createdOn
        name
        keys
        colors
        userID
    }
}
`

export { get, testQuery, updateRecord, fetchJournalData, fetchJournalsByUser, postJournal };