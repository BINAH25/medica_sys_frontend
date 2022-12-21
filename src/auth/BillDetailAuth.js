import axios from "axios";
import Config from "./Config";
import Auth from "./Auth";
class BillDetailAuth {
  static createBillDetail = (bill_id, medicine_id, qty, callback) => {
    axios
      .post(
        Config.billDetailUrl,
        {
          bill_id: bill_id,
          medicine_id: medicine_id,
          qty: qty,
        },
        { headers: { Authorization: "Bearer " + Auth.getLoginToken() } }
      )
      .then(function (response) {
        if (response.status === 200) {
          callback({
            error: "false",
            message: "BillDetail added Successful...",
          });
        }
      })
      .catch(function (error) {
        callback({
          error: "true",
          message: "Error, Failed to Add BillDetail..",
        });
      });
  };

  // url to get all company
}

export default BillDetailAuth;
