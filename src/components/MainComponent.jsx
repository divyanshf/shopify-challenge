import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeComponent from "./Home/HomeComponent";

const MainComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<HomeComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainComponent;
