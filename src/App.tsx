import { Box } from "@mui/material";

import DrawingSection from "./Components/DrawingSection";
import Header from "./Components/Header";
import RouteList from "./Components/RouteList";

import "./Styles/components/app.css";

const App = (): JSX.Element => {
  return (
    <Box>
      <Header />
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "300px 1fr" }}
        gap="2rem"
        padding="2rem"
      >
        <RouteList />
        <DrawingSection />
      </Box>
    </Box>
  );
};

export default App;
