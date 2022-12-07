import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./components/Main";
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Login />} path="" />
        <Route element={<Main />} path="/home" />
      </Routes>
    </Router>
  );
}

export default App;
