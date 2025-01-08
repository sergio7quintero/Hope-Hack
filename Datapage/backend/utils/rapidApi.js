const request = require("postman-request");

//wrap in function, then export
function getData() {
    let data = '';
const options = {
  method: "GET",
  url: "https://homeless-shelters-and-foodbanks-api.p.rapidapi.com/resources",
  qs: {
    city: "charlotte",
    state: "nc",
  },
  headers: {
    "x-rapidapi-key": "11885e9052msha6a3cda9c716efep1c12f9jsn62702adca62f",
    "x-rapidapi-host": "homeless-shelters-and-foodbanks-api.p.rapidapi.com",
  },
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  data = body
});

    return data;
}

module.exports = getData;