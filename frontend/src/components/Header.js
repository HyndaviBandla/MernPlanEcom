import React from "react";
import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import Rlogo from "../assets/Rlogo.jpeg";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
export const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              src={Rlogo}
              alt="Relax"
              height="40vh"
              style={{ borderRadius: "50%" }}
            />
            Relax
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/cart">
              <Nav.Link>
                <FaShoppingCart />
                Cart
                {cartItems.length > 0 && (
                  <Badge pill bg="warning" style={{ marginLeft: "5px" }}>
                    {cartItems.reduce((accum, curr) => accum + curr.qty, 0)}
                    {/* since our cartitems r in the form of array and current items can be of multple number so c.qty and passing 0 for accumilatoe (accum) */}
                  </Badge>
                )}
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link>
                <FaUser />
                SignIn
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;
