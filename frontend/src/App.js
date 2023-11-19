import React from "react";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <>
      <ToastContainer />

      <Header />
      <main className="py-3">
        <Container>
          <Outlet />
          {/* <HomeScreen /> */}
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
