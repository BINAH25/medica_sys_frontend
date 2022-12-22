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
import EmployeeBank from "./components/employeeBank/EmployeeBank";
import EmployeeBankDetail from "./components/employeeBank/EmployeeBankDetail";
import EmployeeSalary from "./components/employeeSalary/EmployeeSalary";
import EmployeeSalaryDetail from "./components/employeeSalary/EmployeeSalaryDetail";
import Customer from "./components/customer/Customer";
import Bill from "./components/bill/Bill";
import BillDetail from "./components/billDetail/BillDetail";
import CustomerRequest from "./components/customerRequest/CustomerRequest";
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
        <Route element={<EmployeeBank />} path="/employee_bank/" />
        <Route element={<EmployeeBankDetail />} path="/employee_bank/:id/" />
        <Route element={<EmployeeSalary />} path="/employee_salary" />
        <Route
          element={<EmployeeSalaryDetail />}
          path="/employee_salary/:id/"
        />
        <Route element={<Customer />} path="/customer" />
        <Route element={<Bill />} path="/bill" />
        <Route element={<BillDetail />} path="/bill_detail" />
        <Route element={<CustomerRequest />} path="/customer_request" />
      </Routes>
    </Router>
  );
}

export default App;
