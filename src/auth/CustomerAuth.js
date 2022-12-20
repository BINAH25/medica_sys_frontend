import axios from "axios";
import Config from "./Config";
import Auth from "./Auth";
class CustomerAuth {
  static createCustomer = (name, address, contact, callback) => {
    axios
      .post(
        Config.customerUrl,
        {
          name: name,
          address: address,
          contact: contact,
        },
        { headers: { Authorization: "Bearer " + Auth.getLoginToken() } }
      )
      .then(function (response) {
        if (response.status === 200) {
          callback({ error: "false", message: "Customer added Successful..." });
        }
      })
      .catch(function (error) {
        callback({
          error: "true",
          message: "Error, Failed to Add Customer..",
        });
      });
  };

  static editCustomer = (name, address, contact, id, callback) => {
    axios
      .put(
        Config.customerUrl + id + "/",
        {
          name: name,
          address: address,
          contact: contact,
        },
        { headers: { Authorization: "Bearer " + Auth.getLoginToken() } }
      )
      .then(function (response) {
        if (response.status === 200) {
          callback({
            error: "false",
            message: "Customer Updated Successful...",
          });
        }
      })
      .catch(function (error) {
        callback({
          error: "true",
          message: "Error, Failed to Update Customer..",
        });
      });
  };

  // url to get all company
}

export default CustomerAuth;
