const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

//creating an array of the object books
let getAllBooks = Object.values(books)

//created these users for testing purposes.
// const registeredUsers = [
//   {username:'12@gmail.com', password: '123'},
//   {username:'1@gmail.com', password: '135'}
// ]


public_users.post("/register", (req,res) => {
  const  {username, password}  = req.body
  if(!username){
    res.send('username is empty')
  }
  if(!password){
    res.send('password is empty')
  }

  users.filter(user => {
    if(user.username === username && user.password === password ){
      res.status(300).send('username already exist')
    }
  } )


  users.push({username, password});
  res.status(201).send(users); 
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
 
  res.status(200).send(getAllBooks);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn
  res.status(200).send(isbn);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
   const author = req.params.author;
   getAllBooks.filter((book) =>{
    if(book.author===author){
      res.status(200).send(book)
    }
  })
  res.send('oops author does not exist')
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  getAllBooks.filter((book) =>{
    if(book.title===title){
      res.status(200).send(book)
    }
  })
  res.send('oops title does not exist')

});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  
 
  return res.status(300).json({message: "Review body empty"});
});

module.exports.general = public_users;
