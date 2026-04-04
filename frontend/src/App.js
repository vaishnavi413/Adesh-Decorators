// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InvoiceForm from "./components/InvoiceForm";
import InvoiceView from "./pages/InvoiceView";
import PreviousInvoicePage from "./components/PreviousInvoicePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InvoiceForm />} />
        <Route path="/edit-invoice/:id" element={<InvoiceForm />} />
        <Route path="/invoice/:id" element={<InvoiceView />} />
        <Route path="/previous-invoices/all" element={<PreviousInvoicePage />} />
      </Routes>
    </Router>
  );
}

export default App;
