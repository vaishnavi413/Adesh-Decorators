import express from "express";
import Invoice from "../models/Invoice.js";

const router = express.Router();

// --- Get next invoice number ---
router.get("/next-number", async (req, res) => {
  try {
    const lastInvoice = await Invoice.findOne().sort({ createdAt: -1 });
    const nextNumber = lastInvoice
      ? String(parseInt(lastInvoice.invoiceNo) + 1)
      : "1";

    res.json({ nextInvoiceNo: nextNumber });
  } catch (err) {
    console.error("Error fetching next invoice number:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// --- Get all invoices ---
router.get("/", async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 });
    res.json(invoices);
  } catch (err) {
    console.error("❌ Error fetching invoices:", err);
    res.status(500).json({ message: "Error fetching invoices" });
  }
});

// --- Save Invoice (AUTO-GENERATE invoiceNo HERE) ---
router.post("/save", async (req, res) => {
  try {
    const invoiceData = req.body;

    // Format items correctly
    invoiceData.items = (invoiceData.items || []).map((item) => ({
      description: item.description || "",
      hsn: item.hsn || "",
      qty: Number(item.qty) || 0,
      rate: Number(item.rate) || 0,
      gstRate: Number(item.gstRate) || 18,
      amount:
        Number(item.amount) ||
        (Number(item.qty) || 0) * (Number(item.rate) || 0),
    }));

    invoiceData.total = Number(invoiceData.total) || 0;
    invoiceData.cgst = Number(invoiceData.cgst) || 0;
    invoiceData.sgst = Number(invoiceData.sgst) || 0;
    invoiceData.grandTotal = Number(invoiceData.grandTotal) || 0;

    // *** OLD SYSTEM AUTO INVOICE NO ***
    const lastInvoice = await Invoice.findOne().sort({ createdAt: -1 });

    const nextInvoiceNo = lastInvoice
      ? String(parseInt(lastInvoice.invoiceNo) + 1)
      : "1";

    invoiceData.invoiceNo = nextInvoiceNo;

    // Save invoice
    const newInvoice = new Invoice(invoiceData);
    await newInvoice.save();

    res.status(201).json({
      message: "Invoice saved successfully",
      invoice: newInvoice,
    });

  } catch (err) {
    console.error("❌ Error saving invoice:", err.message);
    res.status(500).json({ error: "Failed to save invoice" });
  }
});

// --- Update an invoice ---
router.put("/:id", async (req, res) => {
  try {
    const invoiceData = req.body;

    invoiceData.items = (invoiceData.items || []).map((item) => ({
      description: item.description || "",
      hsn: item.hsn || "",
      qty: Number(item.qty) || 0,
      rate: Number(item.rate) || 0,
      gstRate: Number(item.gstRate) || 18,
      amount:
        Number(item.amount) ||
        (Number(item.qty) || 0) * (Number(item.rate) || 0),
    }));

    invoiceData.total = Number(invoiceData.total) || 0;
    invoiceData.cgst = Number(invoiceData.cgst) || 0;
    invoiceData.sgst = Number(invoiceData.sgst) || 0;
    invoiceData.grandTotal = Number(invoiceData.grandTotal) || 0;

    const updatedInvoice = await Invoice.findByIdAndUpdate(req.params.id, invoiceData, { new: true });
    if (!updatedInvoice) return res.status(404).json({ message: "Invoice not found" });
    
    res.json({
      message: "Invoice updated successfully",
      invoice: updatedInvoice,
    });
  } catch (err) {
    console.error("❌ Error updating invoice:", err);
    res.status(500).json({ message: "Error updating invoice" });
  }
});


// --- Get a single invoice by ID ---
router.get("/:id", async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });
    res.json(invoice);
  } catch (err) {
    console.error("❌ Error fetching invoice by ID:", err);
    res.status(500).json({ message: "Error fetching invoice" });
  }
});

// --- Delete an invoice ---
router.delete("/:id", async (req, res) => {
  try {
    await Invoice.findByIdAndDelete(req.params.id);
    res.json({ message: "Invoice deleted successfully" });
  } catch (err) {
    console.error("❌ Delete Error:", err);
    res.status(500).json({ message: "Error deleting invoice" });
  }
});

export default router;

