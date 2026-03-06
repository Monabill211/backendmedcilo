import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Booking from "./models/Booking.js";

const app = express();

app.use(cors());
app.use(express.json());

async function connectDB() {
  console.log("Connecting to MongoDB...");
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.log("Database Error ❌");
    console.error(error);
  }
}

connectDB();

app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// إضافة حجز
app.post("/api/bookings", async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating booking" });
  }
});

// جلب الحجوزات
app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});