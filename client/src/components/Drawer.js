import { Drawer, Button } from "@mui/material";
import React, { Fragment, useState } from "react";

import DehazeIcon from "@mui/icons-material/Dehaze";
import { useNavigate } from "react-router-dom";

const MyDrawer = () => {
  const navigate = useNavigate();

  const [state, setState] = useState(false);

  return (
    <div>
      <Fragment>
        <Button onClick={() => setState(true)}>
          <DehazeIcon />
        </Button>
        <Drawer anchor="left" open={state} onClose={() => setState(false)}>
          <Button onClick={() => navigate("/")}>Mobile</Button>
          <Button onClick={() => navigate("/laptop")}>Laptop</Button>
          <Button onClick={() => navigate("/earphone")}>Earphone</Button>
        </Drawer>
      </Fragment>
    </div>
  );
};

export default MyDrawer;
