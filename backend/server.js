// -------------------------------
// ✅ IMPORTS
// -------------------------------
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import invoiceRoutes from "./routes/invoiceRoutes.js";

// -------------------------------
// ✅ CONFIGURATION
// -------------------------------
dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// -------------------------------
// ✅ DATABASE CONNECTION
// -------------------------------
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/invoiceDB";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// -------------------------------
// ✅ ROUTES
// -------------------------------

// Default route
app.get("/", (req, res) => {
  res.send("Server is running successfully ✅");
});

// 🆕 EXPLICIT DELETE ROUTE FIX (Moved BEFORE Router)
app.delete("/api/invoices/:id", async (req, res) => {
  const { id } = req.params;
  console.log(`🗑️ DELETE REQUEST RECEIVED FOR: ${id}`);
  
  try {
    const deleted = await mongoose.model("Invoice").findByIdAndDelete(id);
    if (!deleted) {
      console.log(`❌ NOT FOUND: ${id}`);
      return res.status(404).json({ message: "Invoice not found in Database" });
    }
    console.log(`✅ DELETED: ${deleted.invoiceNo}`);
    res.status(200).json({ message: "Delete Success" });
  } catch (err) {
    console.error("❌ DELETE ERROR:", err);
    res.status(500).json({ message: "Server Error during delete" });
  }
});

// Invoice routes
app.use("/api/invoices", invoiceRoutes);

// -------------------------------
// ✅ START SERVER
// -------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
