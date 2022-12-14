import axios from "axios";
import Config from "./Config";
import Auth from "./Auth";
class MedicineAuth {
  static createMedicine = (
    name,
    medical_typ,
    buy_price,
    sell_price,
    c_gst,
    s_gst,
    batch_no,
    shelf_no,
    expire_date,
    mfg_date,
    company_id,
    description,
    in_stock_total,
    qty_in_strip,
    callback
  ) => {
    axios
      .post(
        Config.medicineUrl,
        {
          name: name,
          medical_typ: medical_typ,
          buy_price: buy_price,
          sell_price: sell_price,
          c_gst: c_gst,
          s_gst: s_gst,
          batch_no: batch_no,
          shelf_no: shelf_no,
          expire_date: expire_date,
          mfg_date: mfg_date,
          company_id: company_id,
          description: description,
          in_stock_total: in_stock_total,
          qty_in_strip: qty_in_strip,
        },
        { headers: { Authorization: "Bearer " + Auth.getLoginToken() } }
      )
      .then(function (response) {
        if (response.status === 200) {
          callback({
            error: "false",
            message: "Medicine Added Successful...",
          });
        }
      })
      .catch(function (error) {
        callback({
          error: "true",
          message: "Error, Failed to add Medicine..",
        });
      });
  };

  static editMedicine = (
    name,
    medical_typ,
    buy_price,
    sell_price,
    c_gst,
    s_gst,
    batch_no,
    shelf_no,
    expire_date,
    mfg_date,
    company_id,
    description,
    in_stock_total,
    qty_in_strip,
    id,
    callback
  ) => {
    axios
      .put(
        Config.medicineUrl + id + "/",
        {
          name: name,
          medical_typ: medical_typ,
          buy_price: buy_price,
          sell_price: sell_price,
          c_gst: c_gst,
          s_gst: s_gst,
          batch_no: batch_no,
          shelf_no: shelf_no,
          expire_date: expire_date,
          mfg_date: mfg_date,
          company_id: company_id,
          description: description,
          in_stock_total: in_stock_total,
          qty_in_strip: qty_in_strip,
        },
        { headers: { Authorization: "Bearer " + Auth.getLoginToken() } }
      )
      .then(function (response) {
        if (response.status === 200) {
          console.log("Medicine Added Successful...");
        }
      })
      .catch(function (error) {
        console.log("failed To Add Medicine ...");
      });
  };
}

export default MedicineAuth;
