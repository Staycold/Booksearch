const { gql } = require('apollo-server-express');

const typeDefs = gql`

type Query {
    me: User
    users: [User]
    user(username: String!): User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!) : Auth
    saveBook(bookData: BookSearch!) : User
    removeBook(bookId: ID!) : User
}

type User {
    _id: ID
    username: String
    email: String
    password: String
    bookCount: Int
    savedBooks: [Book]
}

type Auth {
    token: ID!
    user: User
}

type Book {
    bookId: String
    title: String
    authors: [String]
    description: String
    image: String
    link: String
}
 
input BookSearch {
    bookId:ID!
    title: String
    authors: [String]
    description: String
    image: String
    bookLink: String
}
`;

module.exports = typeDefs;