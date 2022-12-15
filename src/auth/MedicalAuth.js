import axios from "axios";
import Config from "./Config";
import Auth from "./Auth";
class MedicalAuth {
  static createMedical = (
    medicine_id,
    salt_name,
    salt_qty,
    salt_qty_type,
    description,
    callback
  ) => {
    axios
      .post(
        Config.medicalUrl,
        {
          medicine_id: medicine_id,
          salt_name: salt_name,
          salt_qty: salt_qty,
          salt_qty_type: salt_qty_type,
          description: description,
        },
        { headers: { Authorization: "Bearer " + Auth.getLoginToken() } }
      )
      .then(function (response) {
        if (response.status === 200) {
          console.log(response);
          callback({
            error: "false",
            message: "Medical Added Successful...",
          });
        }
      })
      .catch(function (error) {
        callback({
          error: "true",
          message: "Error, Failed to add Medical..",
        });
      });
  };

  static editMedical = (
    medicine_id,
    salt_name,
    salt_qty,
    salt_qty_type,
    description,
    id,
    callback
  ) => {
    axios
      .put(
        Config.medicalUrl + id + "/",
        {
          medicine_id: medicine_id,
          salt_name: salt_name,
          salt_qty: salt_qty,
          salt_qty_type: salt_qty_type,
          description: description,
        },
        { headers: { Authorization: "Bearer " + Auth.getLoginToken() } }
      )
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          callback({
            error: "false",
            message: "Medical Updated Successful...",
          });
        }
      })
      .catch(function (error) {
        callback({
          error: "true",
          message: "Error, Failed to Update Medical..",
        });
      });
  };
}

export default MedicalAuth;
