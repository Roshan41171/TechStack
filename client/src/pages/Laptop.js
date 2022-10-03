import React from "react";

import LaptopComponent from "../components/LaptopComponent";

import { LaptopDetails } from "../Details/LaptopDetails";

const Laptop = () => {
  return (
    <>
      {LaptopDetails.map((detail) => {
        const {
          id,
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
        } = detail;
        return (
          <LaptopComponent
            key={id}
            image={image}
            name={name}
            os={os}
            ports={ports}
            storage={storage}
            battery={battery}
            processor={processor}
            dng={dng}
            mp={mp}
            sp={sp}
            residual={residual}
            price={price}
          />
        );
      })}
    </>
  );
};

export default Laptop;
