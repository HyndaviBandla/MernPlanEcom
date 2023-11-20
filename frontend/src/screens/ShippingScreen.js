import React from "react";
import { useState } from "react";
// So I'm going to bring in since we're interacting with the cart state, we want to bring in use dispatch
// and use use selector.
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  FormGroup,
  FormControl,
  FormLabel,
} from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch(shippingAddress?.country || "");
  const navigate = useNavigate(shippingAddress?.country || "");
  const [address, setAddress] = useState(shippingAddress?.country || "");
  const [city, setCity] = useState(shippingAddress?.country || "");
  const [postalCode, setPostalCode] = useState(shippingAddress?.country || "");
  const [country, setCountry] = useState(shippingAddress?.country || "");

  //   And then we want to call this save shipping address or we want to dispatch it so that we can update
  // that in the state and in local storage.

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };
  return (
    <>
      <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
          <FormGroup className="my-2">
            <FormLabel>Address</FormLabel>
            <FormControl
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></FormControl>
          </FormGroup>
          <FormGroup className="my-2">
            <FormLabel>City</FormLabel>
            <FormControl
              type="text"
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></FormControl>
          </FormGroup>
          <Form.Group className="my-2" controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter postal code"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ShippingScreen;
