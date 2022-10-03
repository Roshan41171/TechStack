import React from "react";

import Mobile from "../components/MobileComponent";

import { MobileDetails } from "../Details/MobileDetails";

const Home = () => {
  return (
    <>
      {MobileDetails.map((detail) => {
        const {
          id,
          name,
          image,
          memory,
          battery,
          processor,
          camera,
          frontcamera,
          size,
          mp,
          sp,
          residual,
          price,
        } = detail;

        return (
          <Mobile
            key={id}
            image={image}
            name={name}
            memory={memory}
            battery={battery}
            processor={processor}
            camera={camera}
            frontcamera={frontcamera}
            size={size}
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

export default Home;
