import "./App.css";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import "./App.css";
import { useSelector } from "react-redux";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";

function App() {
  const user: any = useSelector((state: any) => state.userReducer.token);
  // const user = false;
  console.log(user);
  // const parsedUser = user ? JSON.parse(user) : null;
  // console.log(parsedUser);
  console.log(user);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Container maxWidth="xl"> */}
          {/* <Navbar /> */}
          <Route
            path="/alarms"
            element={!user ? <Navigate to="/login" /> : <Home />}
          />
          <Route
            path="/"
            element={!user ? <Navigate to="/login" /> : <Home />}
          />

          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />

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
