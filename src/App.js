import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Login />} path="" />
      </Routes>
    </Router>
  );
}

export default App;
