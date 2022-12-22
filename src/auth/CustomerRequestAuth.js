import axios from "axios";
import Config from "./Config";
import Auth from "./Auth";
class CustomerRequestAuth {
  // creating   company url
  static createCustomerRequest = (
    customer_name,
    phone,
    medicine_details,
    callback
  ) => {
    axios
      .post(
        Config.customerRequestUrl,
        {
          customer_name: customer_name,
          phone: phone,
          medicine_details: medicine_details,
        },
        { headers: { Authorization: "Bearer " + Auth.getLoginToken() } }
      )
      .then(function (response) {
        if (response.status === 200) {
          callback({
            error: "false",
            message: "Customer Request added Successful...",
          });
        }
      })
      .catch(function (error) {
        callback({
          error: "true",
          message: "Error, Failed to Add Customer Request..",
        });
      });
  };
  // creating edit  company url
  static editCustomerRequest = (
    customer_name,
    phone,
    medicine_details,
    status,
    id,
    callback
  ) => {
    axios
      .put(
        Config.customerRequestUrl + id + "/",
        {
          customer_name: customer_name,
          phone: phone,
          medicine_details: medicine_details,
          status: status,
        },
        { headers: { Authorization: "Bearer " + Auth.getLoginToken() } }
      )
      .then(function (response) {
        if (response.status === 200) {
          callback({
            error: "false",
            message: "Customer Request Updated Successful...",
          });
        }
      })
      .catch(function (error) {
        callback({
          error: "true",
          message: "Error, Failed to Update Customer Request..",
        });
      });
  };
}

export default CustomerRequestAuth;
