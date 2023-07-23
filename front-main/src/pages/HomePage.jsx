import React from "react";
import { Link } from "react-router-dom";
import DefaultIcon from "../defaultIcon.svg";

import tristram_modules from "../script/modules";

const HomePage = () => {
  return (
    <div className="home">
      <h1>Home</h1>
      <div className="modules">
        {tristram_modules.getModules().map((module, index) => (
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
