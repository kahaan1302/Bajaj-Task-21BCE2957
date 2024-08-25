document.addEventListener("DOMContentLoaded", () => {
  const jsonForm = document.getElementById("jsonForm");
  const jsonInput = document.getElementById("jsonInput");
  const errorDiv = document.getElementById("error");
  const filterSection = document.getElementById("filterSection");
  const filterSelect = document.getElementById("filter");
  const applyFilterBtn = document.getElementById("applyFilter");
  const responseSection = document.getElementById("responseSection");
  const responsePre = document.getElementById("response");

  // Function to validate JSON input
  function isValidJSON(jsonString) {
    try {
      JSON.parse(jsonString);
      return true;
    } catch (e) {
      return false;
    }
  }

  // Function to send data to backend
  async function sendData(data) {
    try {
      const response = await fetch("http://localhost:3000/bfhl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }

  // Function to render the response data
  function renderResponse(data) {
    if (data) {
      responsePre.textContent = JSON.stringify(data, null, 2);
      responseSection.classList.remove("hidden");
    }
  }

  // Function to handle form submission
  jsonForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const inputValue = jsonInput.value;

    // Validate JSON input
    if (!isValidJSON(inputValue)) {
      errorDiv.textContent = "Invalid JSON format";
      return;
    }

    errorDiv.textContent = ""; // Clear any previous errors

    // Send data to backend
    const responseData = await sendData(inputValue);

    // Check if responseData is valid
    if (responseData) {
      filterSection.classList.remove("hidden");
      renderResponse(responseData);
    } else {
      errorDiv.textContent = "Failed to fetch data from the backend";
    }
  });

  // Function to filter response based on selected options
  applyFilterBtn.addEventListener("click", () => {
    const selectedOptions = Array.from(filterSelect.selectedOptions).map(
      (option) => option.value
    );
    const responseData = JSON.parse(responsePre.textContent);

    if (responseData) {
      const filteredData = {};

      if (selectedOptions.includes("alphabets")) {
        filteredData.alphabets = responseData.alphabets;
      }
      if (selectedOptions.includes("numbers")) {
        filteredData.numbers = responseData.numbers;
      }
      if (selectedOptions.includes("highestLowercase")) {
        filteredData.highest_lowercase_alphabet =
          responseData.highest_lowercase_alphabet;
      }

      responsePre.textContent = JSON.stringify(filteredData, null, 2);
    }
  });
});
