import axios from "axios";
import Config from "./Config";
import Auth from "./Auth";
class CompanyAuth {
  static companyCreate = (
    name,
    license_no,
    address,
    contact_no,
    email,
    description,
    callback
  ) => {
    axios
      .post(
        Config.companyUrl,
        {
          name: name,
          license_no: license_no,
          address: address,
          contact_no: contact_no,
          email: email,
          description: description,
        },
        { headers: { Authorization: "Bearer " + Auth.getLoginToken() } }
      )
      .then(function (response) {
        if (response.status === 200) {
          callback({ error: "false", message: "Company added Successful..." });
        }
      })
      .catch(function (error) {
        callback({
          error: "true",
          message: "Error, Failed to Add Company..",
        });
      });
  };

  static editCompany = (
    name,
    license_no,
    address,
    contact_no,
    email,
    description,
    id,
    callback
  ) => {
    axios
      .put(
        Config.companyUrl + id + "/",
        {
          name: name,
          license_no: license_no,
          address: address,
          contact_no: contact_no,
          email: email,
          description: description,
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

  // url to get all company
}

export default CompanyAuth;
