const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

// Define a function to fetch data
async function fetchData(city, state) {
  const options = {
    method: "GET",
    url: "https://homeless-shelters-and-foodbanks-api.p.rapidapi.com/resources",
    params: {
      city: city,
      state: state,
    },
    headers: {
      "x-rapidapi-key": `11885e9052msha6a3cda9c716efep1c12f9jsn62702adca62f`, // Use environment variable for security
      "x-rapidapi-host": "homeless-shelters-and-foodbanks-api.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return {
        response
    //   name: response.data[1].name,
    //   city: response.data[1].city,
    //   state: response.data[1].state,
    //   description: response.data[1].description,
    //   type: response.data[1].type,
    //   full_address: response.data[1].full_address,
    //   phone_number: response.data[1].phone_number,
    //   business_hours: response.data[1].business_hours,
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    if (error.response) {
      console.error("Status Code:", error.response.status);
      console.error("Response Data:", error.response.data);
    }
  }
}

// Call the function
fetchData(`charlotte`, `nc`).then((data) => console.log(data));

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);

//   data = body
// });

//     return data;
// }

module.exports = fetchData;
