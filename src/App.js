import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./components/Main";
import Company from "./components/company/Company";
import CompanyUpdate from "./components/company/CompanyUpdate";
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Login />} path="" />
        <Route element={<Main />} path="/home" />
        <Route element={<Company />} path="/company" />
        <Route element={<CompanyUpdate />} path="/company/:id" />
      </Routes>
    </Router>
  );
}

export default App;
