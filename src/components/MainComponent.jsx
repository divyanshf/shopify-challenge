import { HashRouter as Router, Route, Routes } from "react-router-dom";
import HomeComponent from "./Home/HomeComponent";

const MainComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<HomeComponent />} />
      </Routes>
    </Router>
  );
};

export default MainComponent;
