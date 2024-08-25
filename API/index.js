const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB (replace 'your_connection_string' with your actual MongoDB connection string)
mongoose
  .connect(
    "mongodb+srv://8341stkabirdin:WRiFAJwsvsPMYYFG@bajajtask.2eags.mongodb.net/?retryWrites=true&w=majority&appName=BajajTask",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Dummy data for user (to be replaced with database data)
const user = {
  fullName: "Kahaan Soni",
  dob: "17091999",
  email: "kahaan.soni2021@vitstudent.ac.in",
  rollNumber: "21BCE2957",
};

// Helper function to determine the highest lowercase alphabet
function getHighestLowercaseAlphabet(alphabets) {
  const lowercaseAlphabets = alphabets.filter(
    (char) => char === char.toLowerCase()
  );
  return lowercaseAlphabets.length ? [lowercaseAlphabets.sort().pop()] : [];
}

// POST route
app.post("/bfhl", (req, res) => {
  const data = req.body.data;
  if (!Array.isArray(data)) {
    return res
      .status(400)
      .json({ is_success: false, message: "Invalid data format" });
  }

  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter((item) => isNaN(item));
  const highestLowercaseAlphabet = getHighestLowercaseAlphabet(alphabets);

  res.status(200).json({
    is_success: true,
    user_id: `${user.fullName.replace(/\s+/g, "_").toLowerCase()}_${user.dob}`,
    email: user.email,
    roll_number: user.rollNumber,
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet,
  });
});

// GET route
app.get("/bfhl", (req, res) => {
  res.status(200).json({
    operation_code: 1,
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
