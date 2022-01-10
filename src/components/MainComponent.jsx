import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeComponent from "./Home/HomeComponent";

const MainComponent = () => {
  return (
    <Router basename="/shopify-challenge">
      <Routes>
        <Route path="/" exact element={<HomeComponent />} />
      </Routes>
    </Router>
  );
};

export default MainComponent;
