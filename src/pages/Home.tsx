import React from "react";
import Nav from "../components/nav/Nav";
import Layers from "../components/layers/Layers";
import MainSection from "../components/mainSection/MainSection";
export default function Home() {
  return (
    <div>
      <Nav />
      <MainSection />
      <Layers />
    </div> 
  );
}
