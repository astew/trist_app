import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DefaultIcon from "../defaultIcon.svg";
import todo_icon from "./todo/todo_icon.jpg";
import smarthome_icon from "./smarthome_icon.jpg";
import clipboard_icon from "./clipboard_icon.jpg";

const HomePage = ({ authToken }) => {
  const navigate = useNavigate();

  useEffect(() => {
    let rd = typeof authToken !== "string" || authToken === "";
    if (rd) {
      console.log("navigating to /login");
      navigate("/login");
    }
  }, [authToken, navigate]);

  // Define your modules here
  const modules = [
    {
      name: "To-Do",
      route: "/todo",
      icon: todo_icon,
    },
    {
      name: "Smart Home",
      route: "/smarthome",
      icon: smarthome_icon,
    },
    {
      name: "Clipboard",
      route: "/clipboard",
      icon: clipboard_icon,
    },
  ];

  return (
    <div className="home">
      <h1>Home</h1>
      <div className="modules">
        {modules.map((module, index) => (
          <Link
            to={module.route}
            key={index}
          >
            <div className="module-icon">
              <img
                src={module.icon || DefaultIcon}
                alt={module.name}
              />
              <div>{module.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
