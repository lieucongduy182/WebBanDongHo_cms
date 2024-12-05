import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <Box>
      <Outlet />
    </Box>
  );
}

export default App;
