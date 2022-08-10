import React from "react";
import ImagesList from "./components/imagesList/ImagesList";
import { Container } from "@mui/material";
import getDestinations from "./flightinfo/GetFlightInfo"


function App() {
  getDestinations()
  return (
    <Container maxWidth="lg" sx={{textAlign:'center', mt: '3rem'}}>
      <ImagesList />
    </Container>
  );
}

export default App;
