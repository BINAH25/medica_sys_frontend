import axios from "axios";
import Config from "./Config";
import Auth from "./Auth";
class CompanyBankAuth {
  // creating   company url
  static createCompanyBank = (
    bank_account_no,
    ifsc_no,
    company_id,
    callback
  ) => {
    axios
      .post(
        Config.companyBankUrl,
        {
          bank_account_no: bank_account_no,
          ifsc_no: ifsc_no,
          company_id: company_id,
        },
        { headers: { Authorization: "Bearer " + Auth.getLoginToken() } }
      )
      .then(function (response) {
        if (response.status === 200) {
          callback({
            error: "false",
            message: "Company Bank added Successful...",
          });
        }
      })
      .catch(function (error) {
        callback({
          error: "true",
          message: "Error, Failed to Add Company Bank..",
        });
      });
  };
  // creating edit  company url
  static editCompanyBank = (
    bank_account_no,
    ifsc_no,
    company_id,
    id,
    callback
  ) => {
    axios
      .put(
        Config.companyBankUrl + id + "/",
        {
          bank_account_no: bank_account_no,
          ifsc_no: ifsc_no,
          company_id: company_id,
        },
        { headers: { Authorization: "Bearer " + Auth.getLoginToken() } }
      )
      .then(function (response) {
        if (response.status === 200) {
          callback({
            error: "false",
            message: "Company Updated Successful...",
          });
        }
      })
      .catch(function (error) {
        callback({
          error: "true",
          message: "Error, Failed to Update Company..",
        });
      });
  };

  // url to get all company bank
  static getCompanyBankData = () => {
    axios.get(Config.companyBankUrl, {
      headers: { Authorization: "Bearer " + Auth.getLoginToken() },
    });
  };
}

export default CompanyBankAuth;
