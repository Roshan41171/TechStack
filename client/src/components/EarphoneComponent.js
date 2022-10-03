import React, { useState, useContext } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Paper } from "@mui/material";

import Axios from "axios";

import { AuthContext } from "../helpers/AuthContext";

const EarphoneComponent = (props) => {
  const { name, description, price, image } = props;
  const [add, setAdd] = useState("Add to Cart");

  const { authState } = useContext(AuthContext);

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
    <Paper variant="elevation" square={true}>
      <Card
        sx={{
          maxWidth: 345,
          color: "mediumslateblue",
          float: "left",
          marginLeft: "5%",
          marginTop: "4%",
          backgroundColor: "ghostwhite",
        }}
      >
        <CardActionArea>
          <div style={{marginLeft:"60px"}}>{image}</div>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ fontWeight: "bold" }}
            >
              {description}
            </Typography>
            <Typography variant="body2" color="tomato">
              <br />
              &#x20B9; {price}
            </Typography>
          </CardContent>
        </CardActionArea>
        {authState.status && (
          <>
            <CardActions>
              <Button
                variant="contained"
                size="small"
                color="primary"
                style={{ marginLeft: "35%" }}
                onClick={() => {
                  setAdd("Added to Cart");
                  addToCart(authState.id, authState.username);
                }}
              >
                {add}
              </Button>
            </CardActions>
          </>
        )}
      </Card>
    </Paper>
  )
};

export default EarphoneComponent;
