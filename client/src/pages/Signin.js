import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { TextField, Button, Typography, Paper, Link } from "@material-ui/core";

import Axios from "axios";

import { AuthContext } from "../helpers/AuthContext";

const SignIn = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errormessage, setErrormessage] = useState("");

  const { setAuthState } = useContext(AuthContext);

  Axios.defaults.withCredentials = true;

  const checkUser = () => {
    Axios.post("http://localhost:5000/login/user", {
      email: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setErrormessage(response.data.message);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.email,
          id: response.data.id,
          status: true,
        });
        navigate("/");
      }
    });
  };

  return (
    <>
      {false ? (
        <div style={{ marginTop: "20%", marginLeft: "45%" }}>
          <h1>Hello Sir</h1>
        </div>
      ) : (
        <>
          <Paper
            elevation={24}
            style={{
              marginTop: "150px",
              height: "600px",
              alignItems: "center",
              width: "800px",
              marginLeft: "600px",
              backgroundColor: "whitesmoke",
            }}
          >
            <div
              style={{
                width: "100%",
                paddingLeft: "350px",
                paddingTop: "30px",
                color: "darkseagreen",
              }}
            >
              <Typography style={{ fontSize: "40px" }}>SignIn</Typography>
            </div>
            <br />
            <div style={{ marginTop: "50px" }}>
              <TextField
                variant="standard"
                id="outlined-basic"
                label="Email"
                type="email"
                style={{ width: "60%", marginLeft: "20%" }}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <br />
            <div style={{ marginTop: "50px" }}>
              <TextField
                variant="standard"
                id="outlined-basic"
                label="Password"
                type="password"
                style={{ width: "60%", marginLeft: "20%" }}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <br />
            <div style={{ marginTop: "50px", marginLeft: "45%" }}>
              <Button variant="contained" color="primary" onClick={checkUser}>
                Login
              </Button>
            </div>
            <div style={{ marginLeft: "60%", marginTop: "120px" }}>
              <button onClick={() => navigate("/signup")}>
                <Link underline="hover">Don't have an Account?? Sign Up</Link>
              </button>
            </div>
            <div>
              <h1>{errormessage}</h1>
            </div>
          </Paper>
        </>
      )}
    </>
  );
};

export default SignIn;
