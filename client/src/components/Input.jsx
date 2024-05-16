import React from "react";

export default function Input({ name, id, placeholder, onchange }) {
  return (
    <>
      <input
        type="text"
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={onchange}
      />
    </>
  );
}
