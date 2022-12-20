import axios from "axios";
import Config from "./Config";
import Auth from "./Auth";
class BillAuth {
  static createBill = (customer_id, callback) => {
    axios
      .post(
        Config.billUrl,
        {
          customer_id: customer_id,
        },
        { headers: { Authorization: "Bearer " + Auth.getLoginToken() } }
      )
      .then(function (response) {
        if (response.status === 200) {
          callback({ error: "false", message: "Bill added Successful..." });
        }
      })
      .catch(function (error) {
        callback({
          error: "true",
          message: "Error, Failed to Add Bill..",
        });
      });
  };

  // url to get all company
}

export default BillAuth;
