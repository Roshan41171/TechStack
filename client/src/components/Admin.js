import React, { useState, useEffect } from "react";
import Axios from "axios";

import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Paper,
} from "@material-ui/core";

const Admin = () => {
  const [listofdetails, setListofdetails] = useState([]);
  const [listOfUsers, setListOfUsers] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:5000/admin/fetchData`).then((response) => {
      setListofdetails(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get(`http://localhost:5000/admin/fetchUsers`).then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  return (
    <div>
      <div
        style={{
          marginTop: "100px",
        }}
      >
        <h1 style={{ paddingLeft: "40%" }}>
          List of Users and their Cart are::
        </h1>

        {listOfUsers.map((row) => (
          <div key={row._id} style={{ marginTop: "100px" }}>
            <h1 style={{ marginLeft: "51%" }}>
              {row.name.charAt(0).toUpperCase() + row.name.substring(1)}
            </h1>
            <TableContainer
              component={Paper}
              style={{ marginLeft: "100px", width: "90%" }}
            >
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead style={{ backgroundColor: "grey" }}>
                  <TableRow style={{ color: "white" }}>
                    <TableCell>Product Name</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                {listofdetails.map((val) => {
                  if (val.userId === row._id)
                    return (
                      <>
                        <TableBody>
                          <TableRow key={val._id} style={{ height: "50px" }}>
                            <TableCell component="th" scope="row">
                              {val.name}
                            </TableCell>
                            <TableCell align="right">{val.price}</TableCell>
                            <TableCell align="right">{val.count}</TableCell>
                            <TableCell align="right">
                              {val.price * val.count}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </>
                    );
                })}
              </Table>
            </TableContainer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
