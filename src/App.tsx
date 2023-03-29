import React, { useEffect } from "react";
import "./App.scss";
import "antd/dist/reset.css";
import Header from "./components/header/Header";
import Navigation from "./components/navigation/Navigation";
import Content from "./pages/content/Content";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import axios from "axios";

function App() {
//   useEffect(() => {
//     axios.get("https://dashboard.bit76.ru/graphValues", { headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Content-Type': 'application/json',
//     },
//    })
//  .then(response => {
//      // If request is good...
//      console.log(response.data);
//   })
//  .catch((error) => {
//      console.log('error ' + error);
//   });
//     // const axiosRequest = async () => {
//     //   return axios(url, {
//     //     method: "GET",
//     //     mode: "no-cors",
//     //     headers: {
//     //       "Access-Control-Allow-Origin": "*",
//     //       "Content-Type": "application/json",
//     //     },
//     //     withCredentials: true,
//     //     credentials: "same-origin",
//     //   }).then((response) => {});
//     //   // const res = await axios({

//     //   //   method: "get",
//     //   //   url: "https://dashboard.bit76.ru/graphValues",
//     //   //   params: {},
//     //   // }).then(res=>console.log(res))
//     // };
//   });

  return (
    <div className="App">
      <Header />
      <Navigation />
      <Routes>
        <Route path="/main" element={<Content />} />
      </Routes>
    </div>
  );
}

export default App;
