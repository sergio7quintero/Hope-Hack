const express= require('express');
const app =express();
const PORT = process.env.PORT || 3000;
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connection =require('./db');
const bcrypt = require('bcryptjs');
const path = require('path');
const { error } = require('console');
const endcoder = bodyParser.urlencoded();



const publicDirectory = path.join(__dirname, './')
dotenv.config();
//create post request for register route

app.use(express.static((path.join(__dirname,'frontEnd'))))
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())



app.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    const [results] = await connection
      .promise()
      .query(
        'INSERT INTO signup (firstName, lastName, email, password) VALUES (?, ?, ?, ?)',
        [firstName, lastName, email, hashedPassword]
      );

    // Send a success response
    res.status(201).json({ message: 'Registration successful!' });
  } catch (error) {
    console.error(error);

    // Check for duplicate email error (MySQL error code 1062)
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Email already exists.' });
    }

    // Send a generic error response
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// // login validating


app.post('/',endcoder, (req,res)=>{
  const email = req.body.email;
  const password = req.body.password;


  connection.query('select * from user where email = ? and password = ? ',[email,password], (error,results,fields) => {
      if(results.length > 0){
          
          const name = results[0].firstName;
          res.send(`Welcome ${name}`) }  //alter to create user dashboard popup
      else {
          res.send('Invalid email or password')
      }


      if(error){
          console.log(error);
          return res.status(500).send('Internal server error')
      }; 
      res.end()
  })
})





// Route to serve the index.html file (default for root route)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontEnd','HomePage', 'index.html')); // Serves index.html
  });
  
//do routes for each page
  // Route to serve the login.html file in the homepage folder
  app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname,'frontend','registration', 'login.html')); // Serves login.html
  });
  app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname,'frontend','registration', 'signup.html')); // Serves login.html
  });


  app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname,'frontEnd', 'AboutUs', 'about.html')); // Serves login.html
  });

  app.get('/data', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontEnd','Datapage', 'data.html')); // Serves data.html
  });



app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
});

// console.log(path.join(__dirname, 'frontEnd','Datapage', 'data.html')); 