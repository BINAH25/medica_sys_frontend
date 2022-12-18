import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./components/Main";
import Company from "./components/company/Company";
import CompanyDetails from "./components/company/CompanyDetails";
import CompanyBank from "./components/companyBank/CompanyBank";
import CompanyBankDetail from "./components/companyBank/CompanyBankDetail";
import Medicine from "./components/medicine/Medicine";
import MedicineDetail from "./components/medicine/MedicineDetail";
import Medical from "./components/medical/Medical";
import MedicalDetail from "./components/medical/MedicalDetail";
import CompanyAccount from "./components/companyAccount/CompanyAccount";
import Employee from "./components/employee/Employee";
import EmployeeDetail from "./components/employee/EmployeeDetail";
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Login />} path="" />
        <Route element={<Main />} path="/home" />
        <Route element={<Company />} path="/company" />
        <Route element={<CompanyDetails />} path="/company/:id" />
        <Route element={<CompanyBank />} path="/company_bank" />
        <Route element={<CompanyBankDetail />} path="/company_bank/:id" />
        <Route element={<Medicine />} path="/medicine" />
        <Route element={<MedicineDetail />} path="/medicine/:id" />
        <Route element={<Medical />} path="/medical" />
        <Route element={<MedicalDetail />} path="/medical/:id" />
        <Route element={<CompanyAccount />} path="/company_account" />
        <Route element={<Employee />} path="/employee" />
        <Route element={<EmployeeDetail />} path="/employee/:id/" />
      </Routes>
    </Router>
  );
}

export default App;
