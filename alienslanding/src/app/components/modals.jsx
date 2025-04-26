// components/Modal.tsx
"use client";
import React from "react";

export default function Modal({ x, y, name, info }) {
  return (
    <div
      className="absolute bg-white text-black rounded shadow-md p-3 text-sm w-48 z-50"
      style={{ left: x, top: `calc(${y} - 60px)` }}
    >
      <h3 className="font-bold">{name}</h3>
      <p className="mt-1">{info}</p>
    </div>
  );
}
