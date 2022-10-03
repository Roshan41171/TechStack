import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Axios from "axios";

import { Button } from "@material-ui/core";

import Home from "../pages/Mobile";
import SignIn from "../pages/Signin";
import SignUp from "../pages/Signup";
import Cart from "../pages/Cart";
import Profile from "../pages/Profile";
import Laptop from "../pages/Laptop";
import Earphone from "../pages/Earphone";
import Admin from "./Admin";
import MyDrawer from "./Drawer";
import PageNotFound from "../pages/PageNotFound";

import { AuthContext } from "../helpers/AuthContext";

const MyNavbar = () => {
  const navigate = useNavigate();

  const [authState, setAuthState] = useState({
    username: "",
    id: "",
    status: false,
  });

  useEffect(() => {
    Axios.get("http://localhost:3001/auth/auth", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) => {
      if (response.data.error) {
        setAuthState({ ...authState, status: false });
      } else {
        setAuthState({
          username: response.data.email,
          id: response.data.id,
          status: true,
        });
      }
    });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: "", status: false });
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <div
        style={{
          backgroundColor: "cadetblue",
          alignItems: "center",
          padding: "0",
          width: "100%",
          height: "90px",
          margin: "0",
        }}
      >
        <Button
          style={{
            float: "left",
            padding: "32px 16px",
          }}
        >
          <MyDrawer />
        </Button>
        <Button
          onClick={() => navigate("/")}
          style={{
            float: "left",
            padding: "32px 16px",
          }}
        >
          <span style={{ fontSize: "10px", color: "red" }}>&#128722;</span>{" "}
          TechStack
        </Button>
        {!authState.status && (
          <>
            <Button
              onClick={() => navigate("/signin")}
              style={{
                float: "right",
                padding: "32px 16px",
                borderRadius: "50%",
                backgroundColor: "teal",
              }}
            >
              Sign In
            </Button>
            <Button
              onClick={() => navigate("/signup")}
              style={{
                float: "right",
                padding: "32px 16px",
              }}
            >
              SignUp
            </Button>
          </>
        )}
        {authState.status && (
          <>
            <Button
              onClick={() => navigate("/cart")}
              style={{
                float: "right",
                padding: "32px 16px",
              }}
            >
              Cart
            </Button>
            <Button
              onClick={() => navigate("/profile")}
              style={{
                float: "right",
                padding: "32px 16px",
                borderRadius: "50%",
                backgroundColor: "teal",
              }}
            >
              {authState.username}
            </Button>
            <Button
              onClick={logout}
              style={{
                float: "right",
                padding: "32px 16px",
              }}
            >
              Logout
            </Button>
          </>
        )}
        <br />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/earphone" element={<Earphone />} />
          <Route path="/laptop" element={<Laptop />} />
          <Route path="/admin/1234" element={<Admin />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
};
export default MyNavbar;
