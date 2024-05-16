import React from "react";
import {Link} from "react-router-dom"
import { config } from "../config";

export default function WelcomePage() {
  return (
    <>
      <div>
        <h1 className="c">Welcome to</h1>
        <h1 className="c">
          {config.programName}, {config.year}
        </h1>
        <h2 className="c">(Campus Section)</h2>
      </div>

      <div className="n">
        <Link to="/login"></Link>
      </div>
    </>
  );
}
