import React, { useState, useContext } from "react";
import Axios from "axios";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { AuthContext } from "../helpers/AuthContext";

export default function Mobile(props) {
  const [value, setValue] = useState("Add to Cart");

  const { authState } = useContext(AuthContext);

  const {
    memory,
    image,
    name,
    battery,
    processor,
    camera,
    frontcamera,
    size,
    mp,
    sp,
    price,
    residual,
  } = props;

  const addToCart = (id, username) => {
    Axios.post("http://localhost:5000/insert/product", {
      name: name,
      price: price,
      count: 1,
      userId: id,
      userName: username,
      memory: memory,
      processor: processor,
      frontcamera: camera,
      backcamera: camera,
      size: size,
      battery: battery,
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody style={{ height: "430px" }}>
          <TableCell style={{ width: "37%" , float:"right"}}>{image}</TableCell>
          <TableCell style={{ width: "30%" }}>
            <div
              style={{
                marginTop: "1px",
                width: "100%",
                height: "100%",
                textAlign: "center",
                fontWeight: "900",
                top: "0px",
              }}
            >
              <div>{name}</div>
            </div>
            <ul
              style={{
                font: " 20px Arial, sans-serif",
                fontWeight: "300",
                listStyleType: "square",
                paddingLeft:"90px"
              }}
            >
              <li style={{ marginTop: "3px" }}>{memory}</li>
              <li style={{ marginTop: "3px" }}>{battery}</li>
              <li style={{ marginTop: "3px" }}>{processor}</li>
              <li style={{ marginTop: "3px" }}>{camera}</li>
              <li style={{ marginTop: "3px" }}>{frontcamera}</li>
              <li style={{ marginTop: "3px" }}>{size}</li>
            </ul>
          </TableCell>
          <TableCell style={{ width: "10%", textAlign: "center" }}>
            <ul style={{ listStyleType: "none" }}>
              <li style={{ color: "magenta" }}>{sp}</li>
              <li style={{ textDecoration: "line-through" }}>{mp}</li>
              <li>{residual}</li>
            </ul>
          </TableCell>
          {authState.status ? (
            <>
              <TableCell style={{ width: "30%" }}>
                <Button
                  variant="contained"
                  onClick={() => {
                    setValue("Added to Cart");
                    addToCart(authState.id, authState.username);
                  }}
                  style={{ marginLeft: "200px" }}
                >
                  {value}
                </Button>
              </TableCell>
            </>
          ) : (
            <>
              <TableCell style={{ width: "30%" }}></TableCell>
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
