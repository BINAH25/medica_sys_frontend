import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./components/Main";
import Company from "./components/company/Company";
import CompanyDetails from "./components/company/CompanyDetails";
import CompanyBank from "./components/companyBank/CompanyBank";
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Login />} path="" />
        <Route element={<Main />} path="/home" />
        <Route element={<Company />} path="/company" />
        <Route element={<CompanyDetails />} path="/company/:id" />
        <Route element={<CompanyBank />} path="/company_bank" />
      </Routes>
    </Router>
  );
}

export default App;
