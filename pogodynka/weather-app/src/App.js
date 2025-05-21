import { useState } from "react";
import LookFor from "./Components/LookFor";
import React from "react";
import { Routes, Route } from "react-router-dom";
import DisplaySearch from "./DisplaySearch";
// import { lazy, Suspense } from "react";
// import Loading from "./Components/Loading";

// const DisplaySearch = lazy(() => import("./DisplaySearch"))

export default function App() {
  return (
    <Routes >
      <Route path="/" element={<LookFor />}/>
      <Route path="/search" element={
            <DisplaySearch />
      }/>
    </Routes>
  );
}