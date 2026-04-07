import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <h1 className="company-name">ADESH DECORATORS</h1>
      <p className="company-info">
        763, Bhawani Peth, Agarwal Colony, Pune 1.<br />
        <b>Mobile:</b> 9822409636 / 9422081172<br />
        <b>GST No : 27AJAPD4667R1ZP</b><br />
        <b>PAN No : AJAPD4667R</b>
      </p>
      <button onClick={() => navigate("/invoice")}>Create New Invoice</button>
      <button onClick={() => navigate("/view-bills")}>View Previous Bills</button>
    </div>
  );
};

export default HomePage;
