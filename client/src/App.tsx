import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Home } from './pages/Home'
import { Signup } from './pages/Signup'
import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  // const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <>
      <BrowserRouter>
        {/* <Container maxWidth="xl"> */}
          {/* <Navbar /> */}
          <Routes>
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/" element={<Home />} />
            {/* <Route exact path="/posts/search" element={<Home />} />
            <Route exact path="/posts/:id" element={<PostDetails />} /> */}
            {/* {!user ? (
              <Route exact path="/auth" element={<Auth />} />
            ) : (
              <Route exact path="/posts" element={<Home />} />
            )} */}
            {/* <Route
              exact
              path="/auth"
              element={() => (!user ? <Auth /> : <Navigate to="/posts" />)}
            /> */}
          </Routes>
        {/* </Container> */}
      </BrowserRouter>
    </>
  );
}

export default App;
