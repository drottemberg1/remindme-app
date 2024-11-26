import "./Home.styles.css";

import React from "react";
import { WTClient } from "SDK"
import { WelcomeBlock } from '../../main'

const Home = () => {
  return (
    <div className="home-page">
      {/* Welcome Text */}
      <div className="home-page-content">
        <WelcomeBlock />
        {/* Home Page Img */}
        <div className="wel-page-img"></div>
      </div>
    </div>
  );
};

export default Home;
