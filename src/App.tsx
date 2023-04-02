import React from "react";
import "./App.scss";
import "antd/dist/reset.css";
import Header from "./components/header/Header";
import Navigation from "./components/navigation/Navigation";
import Content from "./pages/content/Content";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { useGetDevice } from "./hooks/useGetDevice";

function App() {
  const { isMobile } = useGetDevice();
  return (
    <div className="App">
      <Header>{isMobile ? <Navigation /> : null}</Header>
      {!isMobile && <Navigation />}
      <Routes>
        <Route path="/main" element={<Content />} />
      </Routes>
    </div>
  );
}

export default App;
