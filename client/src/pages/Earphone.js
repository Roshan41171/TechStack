import React from "react";

import EarphoneComponent from "../components/EarphoneComponent"; 
import { EarphoneDetails } from "../Details/EarphoneDetails"; 

const Earphone = () => { 

  return ( 
    <div style={{ marginTop: "5%" }}> 
      {EarphoneDetails.map((detail) => { 
        const { id, name, description, price, image } = detail; 

        return ( 
          <EarphoneComponent 
            key={id} 
            description={description} 
            name={name} 
            price={price} 
            image={image} 
          /> 
        ); 
      })} 
    </div> 
  ); 
}; 

 

export default Earphone
