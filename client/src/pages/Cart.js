import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";

import { AuthContext } from "../helpers/AuthContext";

import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Paper,
  Button,
} from "@material-ui/core";

const Cart = () => {
  const { authState } = useContext(AuthContext);
  let flag;

  const [listofdetails, setListofdetails] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:5000/read/${authState.id}`).then((response) => {
      setListofdetails(response.data);
    });
  }, [listofdetails]);

  const deleteCart = (id) => {
    Axios.delete(`http://localhost:5000/delete/${id}`).then(() => {
      setListofdetails(
        listofdetails.filter((val) => {
          return val._id !== id;
        })
      );
    });
  };

  const updateCount = async (c, flag, id) => {
    if (flag == 1) {
      c = c + 1;
    } else {
      c = c - 1;
    }

    await Axios.put("http://localhost:5000/update/count", {
      increaseCount: c,
      id: id,
    });
  };

  return (
    <TableContainer
      component={Paper}
      style={{ marginLeft: "100px", width: "90%" }}
    >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listofdetails.map((row) => (
            <TableRow key={row._id} style={{ height: "50px" }}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.count}</TableCell>
              <TableCell align="right">{row.price * row.count}</TableCell>
              <Button
                style={{ marginLeft: "40px", marginTop: "10px" }}
                variant="contained"
                color="primary"
                onClick={() => {
                  updateCount(row.count, (flag = 1), row._id);
                }}
              >
                Increase
              </Button>

              <Button
                style={{ marginLeft: "40px", marginTop: "10px" }}
                variant="contained"
                color="primary"
                onClick={() => {
                  updateCount(row.count, (flag = 0), row._id);
                }}
              >
                Decrease
              </Button>

              <Button
                style={{ marginLeft: "40px", marginTop: "10px" }}
                variant="contained"
                color="primary"
                onClick={() => {
                  deleteCart(row._id);
                }}
              >
                Remove
              </Button>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Cart;
