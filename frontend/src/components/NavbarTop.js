import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from "reactstrap";

import logo from "../images/logo.png";
import { useSelector } from "react-redux";

const NavbarTop = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Navbar expand="sm" className="" light>
        <Container>
          <NavbarBrand href="/">
            <img
              src={logo}
              alt="miniLoan"
              width="80"
              onClick={(e) => e.preventDefault()}
            />
            <p>Welcome to Mini Loan Website</p>
          </NavbarBrand>
          <NavbarToggler onClick={toggle}></NavbarToggler>
          <Collapse isOpen={isOpen} navbar color="secondary">
            <Nav className="ml-auto navbar-light" navbar>
              {isAuthenticated && <NavItem>Hi, {user?.name}!</NavItem>}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarTop;
