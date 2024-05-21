const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
const Cars = require("./models/carModel");
require("dotenv").config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 7070;
app.use(
  cors({
    origin: "*",
  })
);

connectDb();
//create a car
app.post("/create-car", async (req, res) => {
  const { arabic_name, english_name, company, model, year, color } = req.body;

  if (!arabic_name)
    return res
      .status(400)
      .json({ error: true, message: "arabic is not given" });
  if (!english_name)
    return res
      .status(400)
      .json({ error: true, message: "english is not given" });
  if (!company)
    return res
      .status(400)
      .json({ error: true, message: "company is not given" });
  if (!model)
    return res.status(400).json({ error: true, message: "model is not given" });
  if (!year)
    return res.status(400).json({ error: true, message: "year is not given" });
  if (!color)
    return res.status(400).json({ error: true, message: "color is not given" });

  try {
    console.log(req.body, "req.body");
    const car = new Cars({
      arabic_name,
      english_name,
      company,
      model,
      year,
      color,
    });

    await car.save();

    console.log(car, "car");
    return res
      .status(201)
      .json({ error: false, car, message: "new car created" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: true, message: "internal server error" });
  }
});

// get all cars
app.get("/get-cars", async (req, res) => {
  try {
    const cars = await Cars.find({});
    if (!cars) {
      return res.json({ error: false, message: "no cars" });
    }
    return res
      .status(200)
      .json({ error: false, message: "fetched all the cars", cars });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: true, message: "internal server error" });
  }
});

//get a perticualar car
app.get("/get-a-car/:carId", async (req, res) => {
  const carId = req.params.carId;

  try {
    const car = await Cars.findOne({ _id: carId });
    if (!car) {
      return res.json({ error: false, message: "no such car" });
    }
    return res
      .status(200)
      .json({ error: false, message: "fetched the car", car });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: true, message: "internal server error" });
  }
});

//update a car
app.put("/update-a-car/:carId", async (req, res) => {
  const carId = req.params.carId;
  const { arabic_name, english_name, company, model, year, color } = req.body;

  if (!arabic_name && !english_name && !company && !model && !year && !color) {
    return res.status(400).json({ error: false, message: "give any input" });
  }

  try {
    const car = await Cars.findOne({ _id: carId });
    if (!car) {
      return res.json({ error: false, message: "no such car" });
    }
    return res
      .status(200)
      .json({ error: false, message: "fetched the car", car });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: true, message: "internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`listening to the port ${PORT}`);
});
