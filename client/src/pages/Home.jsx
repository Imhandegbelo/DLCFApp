import React from "react";
import  {Theme}  from "../Theme";

export default function Home() {
  return (
    <div className={`bg-[${Theme.BaseColor}]`} >
      <h1 className="text-5xl">Home</h1>
    </div>
  );
}

// BaseRed: "#F2290D",
// BaseGreen: "#59CBDD",
// BaseBlue: "#309EDC",