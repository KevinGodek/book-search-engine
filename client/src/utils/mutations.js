import gql from 'graphql-tag';

export const userLogin = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const addNewUser = gql`
    mutation addUser($username:String!, $email:String!, $password:String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const storeBook = gql`
    mutation saveBook($book:BookInput!) {
        saveBook(book: $book) {
        _id
        username
        email
        bookCount
        savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;

export const delete_book = gql`
    mutation removeBook($bookId: String!) {
        removeBook(bookId:$bookId) {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;