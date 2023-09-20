import React from "react";
import { Spinner } from "reactstrap"; // Import Reactstrap Spinner component

const Loader = () => {
  return (
    <div className="loading">
      <Spinner
        color="primary"
        style={{
          width: "10vmax",
          height: "10vmax",
          alignItems: "center",
          marginLeft: "550px",
        }}
      />
    </div>
  );
};

export default Loader;
