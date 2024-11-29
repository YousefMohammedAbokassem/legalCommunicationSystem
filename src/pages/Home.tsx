import React from "react";
import Lawyers from "../components/lawyers/Lawyers";
import MainSection from "../components/mainSection/MainSection";
import OurServices from "../components/ourServices/OurServices";
import WhoAreWe from "../components/WhoAreWe/WhoAreWe";
export default function Home() {
  return (
    <div>
      <MainSection />
      <Lawyers />
      <OurServices />
      <WhoAreWe />
      {/* <Footer /> */}
    </div>
  );
}
