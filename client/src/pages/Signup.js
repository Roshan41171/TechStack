import React, { useState, useRef } from "react";

import { TextField, Button, Typography, Paper, Link } from "@material-ui/core";

import { useNavigate } from "react-router-dom";

import Axios from "axios";

const SignUp = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const navigate = useNavigate();

  const addUser = () => {
    Axios.post("http://localhost:5000/insert/user", {
      name: firstname,
      email: email,
      password: password,
    });
  };

  return (
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
          <Typography style={{ fontSize: "40px" }}>SignUp</Typography>
        </div>
        <br />
        <div style={{ marginTop: "20px" }}>
          <TextField
            variant="standard"
            id="outlined-basic"
            name="firstname"
            validators={["required"]}
            errorMessages={["this field is required"]}
            label="First Name"
            style={{ width: "25%", marginLeft: "20%" }}
            onChange={(event) => {
              setFirstname(event.target.value);
            }}
          />

          <TextField
            variant="standard"
            id="outlined-basic"
            label="Last Name"
            name="lastname"
            type="text"
            style={{ width: "25%", marginLeft: "10%" }}
            onChange={(event) => {
              setLastname(event.target.value);
            }}
          />
          <br />
        </div>
        <br />
        <div style={{ marginTop: "20px" }}>
          <TextField
            variant="standard"
            id="outlined-basic"
            label="UserName"
            validators={["required"]}
            errorMessages={["this field is required"]}
            name="username"
            style={{ width: "60%", marginLeft: "20%" }}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <br />
        </div>
        <br />
        <div style={{ marginTop: "20px" }}>
          <TextField
            variant="standard"
            id="outlined-basic"
            label="Password"
            type="password"
            name="password"
            validators={["required"]}
            errorMessages={["this field is required"]}
            style={{ width: "60%", marginLeft: "20%" }}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <br />
        </div>
        <div style={{ marginTop: "30px" }}>
          <TextField
            variant="standard"
            id="outlined-basic"
            label="Confirm Password"
            type="password"
            name="confirmpassword"
            validators={["required"]}
            errorMessages={["this field is required"]}
            style={{ width: "60%", marginLeft: "20%" }}
            onChange={(event) => {
              setConfirmpassword(event.target.value);
            }}
          />
          <br />
        </div>
        <br />
        <div style={{ marginTop: "50px", marginLeft: "45%" }}>
          <Button
            variant="contained"
            type="submit"
            onClick={addUser}
            color="primary"
          >
            Sign Up
          </Button>
        </div>
        <div style={{ marginLeft: "60%", marginTop: "30px" }}>
          <button onClick={() => navigate("/signin")}>
            <Link underline="hover">Already have an Account?? Sign In</Link>
          </button>
        </div>
      </Paper>
    </>
  );
};

export default SignUp;
