const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import the DataModel and connectDB
const DataModel = require("./DataModel");
const connectDB = require("./Database");

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json({ extended: false }));

// Use CORS middleware because frontend and backend run on different ports
app.use(cors());

// Endpoint to test server response
app.get("/readfromserver", (req, res) => {
  res.json({ message: "Hey Aasif from server" });
});

// Endpoint to fetch data from the database
app.get("/fetchfromdatabase", async (req, res) => {
  try {
    const data = await DataModel.find();
    res.json(data);
  } catch (error) {
    console.log("Ошибка сервера при получении данных", error.message);
    res.status(500).send("Server error while fetching data");
  }
});

// Endpoint to save data to the database
app.post("/writeanswer", async (req, res) => {
  try {
    const { content } = req.body;
    const newData = new DataModel({ content });
    await newData.save();
    res.json({ message: "Data saved successfully / Данные сохранены" });
  } catch (error) {
    console.log("Ошибка сервера при сохранении данных", error.message);
    res.status(500).send("Server error while saving data/Ошибка сервера при сохранении данных");
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
