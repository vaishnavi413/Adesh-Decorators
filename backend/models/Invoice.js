import mongoose from "mongoose";

// Item sub-schema
const itemSchema = new mongoose.Schema({
  description: { type: String, default: "" },
  hsn: { type: String, default: "" },
  qty: { type: Number, default: 0 },
  rate: { type: Number, default: 0 },
  gstRate: { type: Number, default: 18 },
  amount: { type: Number, default: 0 },
});

// Invoice schema
const invoiceSchema = new mongoose.Schema(
  {
    invoiceNo: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    address: { type: String, default: "" },
    invoiceDate: { type: String, default: "" },
    poNo: { type: String, default: "" },
    poDate: { type: String, default: "" },
    items: [itemSchema],
    total: { type: Number, default: 0 },
    cgst: { type: Number, default: 0 },
    sgst: { type: Number, default: 0 },
    grandTotal: { type: Number, default: 0 },
    notes: { type: [String], default: [] },
    panNo: { type: String, default: "" },
    gstNo: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Adesh_Decorator", invoiceSchema, "Adesh_Decorators");
