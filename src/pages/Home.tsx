import React from "react";
import Layers from "../components/layers/Layers";
import MainSection from "../components/mainSection/MainSection";
import OurServices from "../components/ourServices/OurServices";
import WhoAreWe from "../components/WhoAreWe/WhoAreWe";
export default function Home() {
  return (
    <div>
      <MainSection />
      <Layers />
      <OurServices />
      <WhoAreWe />
      {/* <Footer /> */}
    </div>
  );
}
