import React, { Fragment, useState, useEffect } from "react";

const InputBook = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [bookData, setBookData] = useState({
    book_id: "",
    store_id: "",
    author_id: "",
    publisher_id: "",
    book_name: "",
    publication_year: "",
    book_price: "",
    pages: "",
    book_quantity: ""
  });

  const getBooks = async () => {
    try {
      const response = await fetch("https://backend-grb.vercel.app/books");
      const jsonData = await response.json();

      const booksArray = jsonData.rows; // Access the rows array

      console.log("Books:", booksArray);
      setBooks(booksArray);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getAuthors = async () => {
    try {
      const response = await fetch("https://backend-grb.vercel.app/author");
      const jsonData = await response.json();
      const authorsArray = jsonData.rows; // Access the rows array
      setAuthors(authorsArray);
    } catch (err) {
      console.error(err.message);
    }
  };
  

  const getPublishers = async () => {
    try {
      const response = await fetch("https://backend-grb.vercel.app/publisher");
      const jsonData = await response.json();
      const publishersArray = jsonData.rows; // Access the rows array
      setPublishers(publishersArray);
    } catch (err) {
      console.error(err.message);
    }
  };
  

  useEffect(() => {
    getBooks();
    getAuthors();
    getPublishers();
  }, []);

  const { book_id, store_id, author_id, publisher_id, book_name, publication_year, book_price, pages, book_quantity } =
    bookData;
  const maxId = books.length > 0 ? Math.max(...books.map((book) => book.book_id)) : 0;

  const onChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const convertedData = {
        ...bookData,
        book_id: parseInt(maxId + 1),
        store_id: parseInt(bookData.store_id),
        author_id: parseInt(bookData.author_id),
        publisher_id: parseInt(bookData.publisher_id),
        publication_year: parseInt(bookData.publication_year),
        book_price: parseInt(bookData.book_price),
        pages: parseInt(bookData.pages),
        book_quantity: parseInt(bookData.book_quantity)
      };

      const response = await fetch("https://backend-grb.vercel.app/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(convertedData)
      });

      const data = await response.json();
      console.log(data);
      setBookData({
        book_id: "",
        store_id: "",
        author_id: "",
        publisher_id: "",
        book_name: "",
        publication_year: "",
        book_price: "",
        pages: "",
        book_quantity: ""
      });
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">Good Reading Bookstore</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input type="text" disabled className="form-control" name="book_id" placeholder={maxId+1} value={book_id}  />
        <select className="form-control" name="store_id" value={store_id} onChange={onChange}>
          {[...Array(10)].map((_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
        <select className="form-control" name="author_id" value={author_id} onChange={onChange}>
          {authors.map((author) => (
            <option key={author.author_id} value={author.author_id}>
              {author.author_name}
            </option>
          ))}
        </select>
        <select className="form-control" name="publisher_id" value={publisher_id} onChange={onChange}>
          {publishers.map((publisher) => (
            <option key={publisher.publisher_id} value={publisher.publisher_id}>
              {publisher.publisher_name}
            </option>
          ))}
        </select>
        <input type="text" className="form-control" name="book_name" placeholder="Book Name" value={book_name} onChange={onChange} />
        <input type="text" className="form-control" name="publication_year" placeholder="Publication Year" value={publication_year} onChange={onChange} />
        <input type="text" className="form-control" name="book_price" placeholder="Book Price" value={book_price} onChange={onChange} />
        <input type="text" className="form-control" name="pages" placeholder="Pages" value={pages} onChange={onChange} />
        <input type="text" className="form-control" name="book_quantity" placeholder="Book Quantity" value={book_quantity} onChange={onChange} />
        <button className="btn btn-success">Add</button>
      </form>
    </Fragment>
  );
};

export default InputBook;
