const express= require('express');
const app =express();
const PORT = process.env.PORT || 3002;
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connection =require('./db');
const bcrypt = require('bcryptjs');
const path = require('path');



const publicDirectory = path.join(__dirname, './')
dotenv.config();
//create post request for register route

app.use(express.static((path.join(__dirname,'frontEnd'))))
// app.use(express.static("frontEnd"));
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

// app.post('/register',async (req,res)=> {
//     // console.log(req.body.firstName);
//     const {firstName, lastName, email, password} = req.body;
//     const hashedpassword = await bcrypt.hash(password,10)
  
//     connection 
// .promise() 

// .query(
//     'INSERT INTO signup (firstName, lastName, email, password) VALUES (?, ?, ?, ?)',
//     [ firstName, lastName, email, hashedpassword]

// );
// });
// // login validating

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check the database for the user
    const [results] = await connection
      .promise()
      .query('SELECT * FROM signup WHERE email = ? AND password = ?', [email, password]);

    if (results.length === 0) {
      // User not found
      return res.status(400).send('Invalid email or password');
    }

    const user = results[0];

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      // Passwords don't match
      return res.status(400).send('Invalid email or password');
    }

    // Successful login
    res.status(200).send('Login successful');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});
        // // Encrypt the password
        // bcrypt.hash(password, 10, (err, hashedPassword) => {
        //   if (err) {
        //     console.error(err);
        //     return res.status(500).send('Internal Server Error');
        //   }
  
          // Update user in the database
          // connection.query('UPDATE Users SET Username = ?, Password = ? WHERE ID = ?', [username, hashedPassword, userId], (err, results) => {
          //   if (err) {
          //     console.error(err);
          //     return res.status(500).send('Internal Server Error');
          //   }
  
            // return req.redirect('/login');
          // });
        // });
      
      





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

console.log(path.join(__dirname, 'frontEnd','Datapage', 'data.html'))