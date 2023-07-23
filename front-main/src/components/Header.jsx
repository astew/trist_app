import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation } from "react-router-dom";

import tristram_modules from "../script/modules";

const Header = () => {
  const location = useLocation();

  return (
    <Navbar
      className="justify-content-between"
      collapseOnSelect
      expand="false"
      bg="dark"
      variant="dark"
    >
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Brand>Tristram</Navbar.Brand>
      <Navbar.Brand className="text-muted">
        {tristram_modules.getNameFromRoute(location.pathname)}
      </Navbar.Brand>

      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          {tristram_modules.getModules().map((module, index) => (
            <LinkContainer
              to={module.route}
              key={index}
            >
              <Nav.Link>{module.name}</Nav.Link>
            </LinkContainer>
          ))}

          <NavDropdown.Divider />
          <LinkContainer to="/modal/login">
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
