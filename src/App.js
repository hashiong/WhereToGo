import React from "react";
import Nav from "./components/Nav";
import Upload from "./components/upload/Upload";
import ImagesList from "./components/imagesList/ImagesList";

function App() {
  return (
    <div>
      <Nav />
      <Upload />
      <ImagesList />
    </div>
  );
}

export default App;
