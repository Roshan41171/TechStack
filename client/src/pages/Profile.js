import React, { useContext, useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";

import { AuthContext } from "../helpers/AuthContext";

import Axios from "axios";

const Profile = () => {
  const { authState } = useContext(AuthContext);

  const [error, setError] = useState("");

  const [details, setDetails] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const onSubmit = () => {
    const { old_password, new_password, confirm_password } = details;

    if (old_password === "" || new_password === "" || confirm_password === "") {
      setError("Fill up all the forms");
    } else if (new_password !== confirm_password) {
      setError("Passwords Don't Match");
    } else {
      Axios.put(`http://localhost:5000/update/password/${authState.id}`, {
        old_password: details.old_password,
        new_password: details.new_password,
      }).then((response) => {
        setError(response.data.message);
      });
    }
    
  };

  return (
    <>
      {authState.status && (
        <>
          <div style={{ marginLeft: "40%", marginTop: "100px" }}>
            <h1>User name is : {authState.username}</h1>

          </div>

          <div>
            <TextField
              variant="standard"
              id="outlined-basic"
              label="Old_Password"
              type="password"
              name="old_password"
              style={{ width: "60%", marginLeft: "20%", marginTop: "30px" }}
              onChange={handleChange}
            />
            <TextField
              variant="standard"
              id="outlined-basic"
              label="New_Password"
              type="password"
              name="new_password"
              style={{ width: "60%", marginLeft: "20%", marginTop: "30px" }}
              onChange={handleChange}
            />
            <TextField
              variant="standard"
              id="outlined-basic"
              label="Confirm_Password"
              type="password"
              name="confirm_password"
              style={{ width: "60%", marginLeft: "20%", marginTop: "30px" }}
              onChange={handleChange}
            />

            <br />

            <Button
              onClick={onSubmit}
              style={{ marginLeft: "40%", marginTop: "30px" }}
              variant="contained"
            >
              Change Password
            </Button>
            <br />

            <Typography
              style={{ marginLeft: "40%", marginTop: "30px", color: "red" }}
            >
              {error && error}
            </Typography>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
