import React, { useState } from "react";
import Overlay from "./Overlay";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import HomeComponent from "./HomeComponent";
import "adminbsb-materialdesign/css/themes/all-themes.css";
import GoogleFontLoader from "react-google-font-loader";

const Main = () => {
  const [theme, setTheme] = useState({
    bodyClass: "theme-red ls-closed",
    displayOverlay: "none",
  });
  const onBarClick = () => {
    if (theme.bodyClass == "theme-red ls-closed overlay-open") {
      setTheme({ bodyClass: "theme-red ls-closed" });
      setTheme({ displayOverlay: "none" });
    } else if (theme.bodyClass == "theme-red ls-closed") {
      setTheme({ bodyClass: "theme-red ls-closed overlay-open" });
      setTheme({ displayOverlay: "block" });
    }
  };
  if (window.screen.width > 1150) {
    document.getElementById("root").className = "theme-red";
  } else {
    document.getElementById("root").className = theme.bodyClass;
  }

  return (
    <>
      <GoogleFontLoader
        fonts={[
          {
            font: "Roboto",
            weights: [400, 700],
          },
        ]}
        subsets={["latin", "cyrillic-ext"]}
      />
      <GoogleFontLoader
        fonts={[
          {
            font: "Material+Icons",
          },
        ]}
      />

      <Overlay display={theme.displayOverlay} />
      <Navbar onBarClick={onBarClick} />
      <Sidebar />
      <HomeComponent />
    </>
  );
};

export default Main;
