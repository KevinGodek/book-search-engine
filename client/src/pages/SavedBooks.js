// import React, { useState, useEffect } from 'react';
import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/react-hooks';

//import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import GET_ME from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations'
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
    const { loading, data } = useQuery(GET_ME);
    const [ deleteBook ] = useMutation(REMOVE_BOOK)
    const user = data?.me || {};

  // use this to determine if `useEffect()` hook needs to run again
  //  const userDataLength = Object.keys(userData).length;
    if (loading) {
      return <h2>Loading, please wait.</h2>;
    }
    if (!user?.username) {
      return (
        <h4>
          Please login to view page.
        </h4>
      )
    }
  // useEffect(() => {
  //   const getUserData = async () => {
  //     try {
    // accepts bookID and delete book from database
    const handleDeleteBook = async (bookId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
          return false;
        }

        // const response = await getMe(token);

        // if (!response.ok) {
        //   throw new Error('something went wrong!');
        // }

        try {
          // use REMOVE_BOOK mutation
          await deleteBook({
            variable: { bookId }
          });
          // remove book id from localstorage
          removeBookId(bookId);
        } catch (err) {
          console.log(err);
        }
      };

      //   const user = await response.json();
      //   setUserData(user);
      // } catch (err) {
      //   console.error(err);
      // }
    // };

  //   getUserData();
  // }, [userDataLength]);

  // // create function that accepts the book's mongo _id value as param and deletes the book from the database
  // const handleDeleteBook = async (bookId) => {
  //   const token = Auth.loggedIn() ? Auth.getToken() : null;

  //   if (!token) {
  //     return false;
  //   }

  //   try {
  //     const response = await deleteBook(bookId, token);

  //     if (!response.ok) {
  //       throw new Error('something went wrong!');
  //     }

  //     const updatedUser = await response.json();
  //     setUserData(updatedUser);
  //     // upon success, remove book's id from localStorage
  //     removeBookId(bookId);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // // if data isn't here yet, say so
  // if (!userDataLength) {
  //   return <h2>LOADING...</h2>;
  // }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {user.savedBooks.length
            ? `Viewing ${user.savedBooks.length} saved ${user.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {user.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
