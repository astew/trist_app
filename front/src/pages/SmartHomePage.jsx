import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

const SmartHomePage = ({ authToken }) => {
  const navigate = useNavigate();

  useEffect(() => {
    let rd = typeof authToken !== "string" || authToken === "";
    if (rd) {
      console.log("navigating to /login");
      navigate("/login");
    }
  }, [authToken, navigate]);

  return <h1>Smart Home</h1>;
};

export default SmartHomePage;
