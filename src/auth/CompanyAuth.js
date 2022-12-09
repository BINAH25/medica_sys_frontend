import axios from "axios";
import Config from "./Config";

class CompanyAuth {
  static company = (
    name,
    license_no,
    address,
    contact_no,
    email,
    description,
    callback
  ) => {
    axios
      .post(Config.companyUrl, {
        name: name,
        license_no: license_no,
        address: address,
        contact_no: contact_no,
        email: email,
        description: description,
      })
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
}

export default CompanyAuth;
