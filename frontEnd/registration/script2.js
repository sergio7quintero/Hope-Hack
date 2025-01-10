const registerForm = document.querySelector('.s-form');
const loginForm = document.querySelector('.loginform');
const registerSubmitButton = document.querySelector('.s-form button')
const loginSubmitButton = document.querySelector('.form button')
const dashboardSection = document.querySelector('.dashboard-section'); 
const registerMessage = document.querySelector('#register-message');
const loginMessage = document.querySelector('#login-message'); 
const welcomeMessage = document.querySelector('.welcome-message'); 
const logoutButton = document.querySelector('#logout-button'); 

// Base API URL
const API_URL = '/';

// Handle Registration
registerSubmitButton.addEventListener('click', async e => {
  e.preventDefault();
  const firstName = document.querySelector('#firstname').value;
  const lastName = document.querySelector('#lastname').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
console.log({firstName, lastName, email, password})
  try {
    const response = await fetch(`${API_URL}register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      registerMessage.textContent = 'Registration successful!';
      registerMessage.style.color = 'green';
    } else {
      registerMessage.textContent = data.error || 'Registration failed.';
      registerMessage.style.color = 'red';
    }
  } catch (error) {
    registerMessage.textContent = 'An error occurred.';
    registerMessage.style.color = 'red';
  }
});

///////////////////////////////////////////////////////////////////////////////////
// Handle Login

loginForm.addEventListener('click', async e => {
  //event listener for asynch function
  e.preventDefault(); //preventing form auto action
  const email = document.querySelector('#loginemail').value;
  const password = document.querySelector('#loginpassword').value;

  try {
    const response = await fetch(`${API_URL}login`, {
          // Make a POST request to the server's `/login` endpoint using the `fetch` API.
      method: 'POST', //http method for request
      headers: { 'Content-Type': 'application/json' }, //specifiying req.body type
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json(); //make sure serever response is valid json to avoid errors
    if (response.ok) { //error handling
      localStorage.setItem('token', data.token); //saving authentification token with localstorage in browser
      loginMessage.textContent = '  welcome back!';
      loginForm.reset(); //clearing form input
      showDashboard(data.token); // calling function to show user info
    } else {
      loginMessage.textContent = data.error || 'Login failed.';
      loginMessage.style.color = 'red';
    }
  } catch (error) {
    loginMessage.textContent = 'An error occurred.';
    loginMessage.style.color = 'red';
  }
});

// Show Dashboard - displaying user dashboard and personalizing info with token
function showDashboard(token) {
  
  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  //token.split to extract payload of jwt
  //pasringing into JSON
  welcomeMessage.textContent = `Welcome, ${decodedToken.firstName} ${decodedToken.lastName}!`;
  dashboardSection.style.display = 'block';
  loginForm.style.display = 'none';
  registerForm.style.display = 'none';
}

// Handle Logout
// logoutButton?.addEventListener('click', () => {
//   localStorage.removeItem('token');
//   dashboardSection.style.display = 'none';
//   loginForm.style.display = 'block';
//   registerForm.style.display = 'block';
// });


/*
  const firstNmaeLoggedIN = fetch('/api/login')
  dashboard.textContent = firstNmaeLoggedIN

*/
console.log('Token:', token);
