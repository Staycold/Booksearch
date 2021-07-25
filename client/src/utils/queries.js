import { gql } from '@apollo/client';




export const QUERY_USER = gql`
query me{
    user{
        _id
        username
        savedbooks{
            _id
            title
            authors
            description
            image
            link
        }
    }
}`
