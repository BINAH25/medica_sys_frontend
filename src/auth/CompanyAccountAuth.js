import axios from "axios";
import Config from "./Config";
import Auth from "./Auth";
class CompanyAccountAuth {
  static createAccount = (
    company_id,
    transaction_type,
    transaction_amt,
    transaction_date,
    payment_mode,
    callback
  ) => {
    axios
      .post(
        Config.companyAccountUrl,
        {
          company_id: company_id,
          transaction_type: transaction_type,
          transaction_amt: transaction_amt,
          transaction_date: transaction_date,
          payment_mode: payment_mode,
        },
        { headers: { Authorization: "Bearer " + Auth.getLoginToken() } }
      )
      .then(function (response) {
        if (response.status === 200) {
          callback({
            error: "false",
            message: "Account Added Successful...",
          });
        }
      })
      .catch(function (error) {
        callback({
          error: "true",
          message: "Error, Failed to add Account..",
        });
      });
  };
}

export default CompanyAccountAuth;
