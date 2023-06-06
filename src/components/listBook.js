import React, { Fragment, useEffect, useState } from "react";
import EditBook from "./editBook";


const ListBook = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const deleteBook = async id => {
    try {
      const deleteBook = await fetch(`https://backend-grb.vercel.app/books/${id}`,{method: "DELETE"});
      
      setBooks(books.filter(book =>book.book_id !==id));
    } catch (err) {
      console.error(err.message);
    }
  }
  const getBooks = async () => {
    try {
      const response = await fetch("https://backend-grb.vercel.app/books");
      const jsonData = await response.json();

      const booksArray = jsonData.rows; // Access the rows array

      console.log("Books:", booksArray);
      setBooks(booksArray);
      setIsLoading(false);
    } catch (err) {
      console.error(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  console.log("Books:", books);

  return (
    <Fragment>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-bordered mt-5 text-center">
          <thead>
            <tr>
              <th>Book Id</th>
              <th>Store Id</th>
              <th>Author Id</th>
              <th>Publisher Id</th>
              <th>Book Name</th>
              <th>Publication Year</th>
              <th>Book Price</th>
              <th>Pages</th>
              <th>Book Quantity</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? (
              books.map((book) => (
                <tr key={book.book_id}>
                  <td>{book.book_id}</td>
                  <td>{book.store_id}</td>
                  <td>{book.author_id}</td>
                  <td>{book.publisher_id}</td>
                  <td>{book.book_name}</td>
                  <td>{book.publication_year}</td>
                  <td>{book.book_price}</td>
                  <td>{book.pages}</td>
                  <td>{book.book_quantity}</td>
                  <td><EditBook book={book} /></td>
                  <td><button className="btn btn-danger" onClick={() =>deleteBook(book.book_id)}>Delete</button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11">No books found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </Fragment>
  );
};

export default ListBook;
