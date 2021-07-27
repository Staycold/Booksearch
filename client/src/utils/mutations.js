import { gql } from '@apollo/client';


export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
      }
    }
  }
`;
//bookData: BookSearch!
export const SAVE_BOOK = gql`
mutation saveBook($bookData: BookSearch){
    saveBook(bookData:$bookData ){
        id
        username
        savedBooks{
          _id
          title
          authors
          description
          image
          link
        }

}`;


export const DELETE_BOOK = gql`
mutation deleteBook($bookId: String!){
    deleteBook(bookId:$bookId){
      id
      username
      savedBooks{
        _id
        title
        authors
        description
        image
        link
      }
}
`
;
