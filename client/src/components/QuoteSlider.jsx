import React, { useState } from "react";
import { Quotes } from "../quotes.js";

export default function QuoteSlider() {
  const [CurrentQuote, setCurrentQuote] = useState({});

  const FlipQuote = (quote) => {
    // Array.prototype.random = () => {
    //   this[Math.floor(Math.random() * this.length)];
    // };
    return quote[Math.floor(Math.random() * quote.length)];
  };

  //   const ;

  return <div></div>;
}
