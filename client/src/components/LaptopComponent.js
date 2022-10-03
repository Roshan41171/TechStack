import React, { useState, useContext } from "react";
import Axios from "axios";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { AuthContext } from "../helpers/AuthContext";

export default function LaptopComponent(props) {
  const [value, setValue] = useState("Add to Cart");

  const { authState } = useContext(AuthContext);

  const {
    name,
    image,
    os,
    battery,
    ports,
    processor,
    storage,
    dng,
    mp,
    sp,
    residual,
    price,
  } = props;

  const addToCart = (id, username) => {
    Axios.post("http://localhost:5000/insert/product", {
      name: name,
      price: price,
      count: 1,
      userId: id,
      userName: username,
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody style={{ height: "430px" }}>
          <TableCell style={{ width: "36%" , float:"right" }}><div style={{marginTop:"80px"}}>{image}</div></TableCell>
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
              }}
            >
              <li style={{ marginTop: "3px" }}>{processor}</li>
              <li style={{ marginTop: "3px" }}>{battery}</li>
              <li style={{ marginTop: "3px" }}>{storage}</li>
              <li style={{ marginTop: "3px" }}>{ports}</li>
              <li style={{ marginTop: "3px" }}>{os}</li>
              <li style={{ marginTop: "3px" }}>{dng}</li>
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
