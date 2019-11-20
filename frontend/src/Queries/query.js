
import { gql } from "apollo-boost";

const get = gql`
query($lat: String!) {
    placesAt(lat: $lat) {
        temp
    }
}
`

const testGrabYear = gql`
query($year: String!) {
    getYear(year: $year)
        day
        month
        year
        journalID
        status
        frontEndID
        date
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

export { get, testQuery, testMutation, testGrabYear };