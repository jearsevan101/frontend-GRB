import React, { Fragment, useState, useEffect } from "react";

const EditBook = ({ book }) => {
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  useEffect(() => {
    setBookData({
      store_id: book.store_id,
      author_id: book.author_id,
      publisher_id: book.publisher_id,
      book_name: book.book_name,
      publication_year: book.publication_year,
      book_price: book.book_price,
      pages: book.pages,
      book_quantity: book.book_quantity
    });
  }, [book]);

  const [bookData, setBookData] = useState({
    store_id: "",
    author_id: "",
    publisher_id: "",
    book_name: "",
    publication_year: "",
    book_price: "",
    pages: "",
    book_quantity: ""
  });
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
    getAuthors();
    getPublishers();
  }, []);
  const { store_id, author_id, publisher_id, book_name, publication_year, book_price, pages, book_quantity } = bookData;

  const onChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const updateBook = async () => {
    try {
      const body = {
        store_id,
        author_id,
        publisher_id,
        book_name,
        publication_year,
        book_price,
        pages,
        book_quantity
      };
      const response = await fetch(`https://backend-grb.vercel.app/books/${book.book_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      window.location = "/";
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Fragment>
      <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${book.book_id}`}>
        Edit
      </button>

      <div className="modal" id={`id${book.book_id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Book</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="store_id">Store ID:</label>
                <select className="form-control" name="store_id" value={store_id} onChange={onChange}>
                  {[...Array(10)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="author_id">Author:</label>
                <select className="form-control" name="author_id" value={author_id} onChange={onChange}>
                  {authors.map((author) => (
                    <option key={author.author_id} value={author.author_id}>
                      {author.author_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="publisher_id">Publisher:</label>
                <select className="form-control" name="publisher_id" value={publisher_id} onChange={onChange}>
                  {publishers.map((publisher) => (
                    <option key={publisher.publisher_id} value={publisher.publisher_id}>
                      {publisher.publisher_name}
                    </option>
                  ))}
                </select>
              </div>
              <label htmlFor="book_name">Book Name:</label>
              <input
                type="text"
                id="book_name"
                className="form-control"
                name="book_name"
                value={book_name}
                onChange={onChange}
              />
              <label htmlFor="publication_year">Publication Year:</label>
              <input
                type="text"
                id="publication_year"
                className="form-control"
                name="publication_year"
                value={publication_year}
                onChange={onChange}
              />

              <label htmlFor="book_price">Book Price:</label>
              <input
                type="text"
                id="book_price"
                className="form-control"
                name="book_price"
                value={book_price}
                onChange={onChange}
              />

              <label htmlFor="pages">Pages:</label>
              <input
                type="text"
                id="pages"
                className="form-control"
                name="pages"
                value={pages}
                onChange={onChange}
              />

              <label htmlFor="book_quantity">Book Quantity:</label>
              <input
                type="text"
                id="book_quantity"
                className="form-control"
                name="book_quantity"
                value={book_quantity}
                onChange={onChange}
              />
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={updateBook}>
                Edit
              </button>
              <button type="button" className="btn btn-danger" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditBook;
