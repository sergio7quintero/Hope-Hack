document
  .getElementsByClassName("search-container")
  .addEventListener("submit", async (event) => {
    console.log("testing");
    event.preventDefault();

    const city = document.getElementById("city").value.trim();
    const state = document.getElementById("state").value.trim();
    const resultsDiv = document.getElementById("results");

    // Clear previous results
    resultsDiv.innerHTML = "";

    // Check for empty inputs
    if (!city || !state) {
      resultsDiv.innerHTML = `<p>Please provide both city and state.</p>`;
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/resources?city=${encodeURIComponent(
          city
        )}&state=${encodeURIComponent(state)}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      // Validate data and display
      if (data.error) {
        resultsDiv.innerHTML = `<p>${data.error}</p>`;
      } else {
        resultsDiv.innerHTML = `
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>City:</strong> ${data.city}</p>
          <p><strong>State:</strong> ${data.state}</p>
          <p><strong>Description:</strong> ${data.description}</p>
          <p><strong>Type:</strong> ${data.type}</p>
          <p><strong>Full Address:</strong> ${data.full_address}</p>
          <p><strong>Phone Number:</strong> ${data.phone_number}</p>
          <p><strong>Business Hours:</strong> ${data.business_hours}</p>
        `;
      }
    } catch (error) {
      console.error(error);
      resultsDiv.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
    }
  });
