import React from "react";
import Overlay from "./Overlay";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import HomeComponent from "./HomeComponent";
import "adminbsb-materialdesign/css/themes/all-themes.css";
import GoogleFontLoader from "react-google-font-loader";

const Main = () => {
  document.getElementById("root").className = "theme-red";

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

      <Overlay />
      <Navbar />
      <Sidebar />
      <HomeComponent />
    </>
  );
};

export default Main;
