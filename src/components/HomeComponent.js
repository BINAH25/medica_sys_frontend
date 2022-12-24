import axios from "axios";
import React, { useEffect, useState } from "react";
import Config from "../auth/Config";
import Auth from "../auth/Auth";
// MAIN FUNCTION
const HomeComponent = () => {
  const [customer_request, setCustomerRequest] = useState(null);
  useEffect(() => {
    getData();
  }, []);
  // getting customer request count
  let getData = async () => {
    let res = await axios.get(Config.customerRequestCountUrl, {
      headers: { Authorization: "Bearer " + Auth.getLoginToken() },
    });
    setCustomerRequest(res.data);
  };
  return (
    <section className="content">
      <div className="container-fluid">
        <div className="block-header">
          <h2>DASHBOARD</h2>
        </div>

        <div className="row clearfix">
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <div className="info-box bg-pink hover-expand-effect">
              <div className="icon">
                <i className="material-icons">bookmark</i>
              </div>
              <div className="content">
                <div className="text">TOTAL CUSTOMER REQUEST</div>
                <div
                  className="number count-to"
                  data-from="0"
                  data-to="125"
                  data-speed="15"
                  data-fresh-interval="20"
                >
                  {customer_request?.customer_requests}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <div className="info-box bg-cyan hover-expand-effect">
              <div className="icon">
                <i className="material-icons">bookmark</i>
              </div>
              <div className="content">
                <div className="text">TOTAL SALES</div>
                <div
                  className="number count-to"
                  data-from="0"
                  data-to="257"
                  data-speed="1000"
                  data-fresh-interval="20"
                >
                  {customer_request?.bill}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <div className="info-box bg-light-green hover-expand-effect">
              <div className="icon">
                <i className="material-icons">bookmark</i>
              </div>
              <div className="content">
                <div className="text">TOTAL MEDICINES</div>
                <div
                  className="number count-to"
                  data-from="0"
                  data-to="243"
                  data-speed="1000"
                  data-fresh-interval="20"
                >
                  {customer_request?.medicine}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <div className="info-box bg-orange hover-expand-effect">
              <div className="icon">
                <i className="material-icons">bookmark</i>
              </div>
              <div className="content">
                <div className="text">TOTAL COMPANY</div>
                <div
                  className="number count-to"
                  data-from="0"
                  data-to="1225"
                  data-speed="1000"
                  data-fresh-interval="20"
                >
                  {customer_request?.company}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row clearfix">
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <div className="info-box bg-pink hover-expand-effect">
              <div className="icon">
                <i className="material-icons">bookmark</i>
              </div>
              <div className="content">
                <div className="text">TOTAL EMPLOYEE</div>
                <div
                  className="number count-to"
                  data-from="0"
                  data-to="125"
                  data-speed="15"
                  data-fresh-interval="20"
                >
                  {customer_request?.employee}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <div className="info-box bg-cyan hover-expand-effect">
              <div className="icon">
                <i className="material-icons">bookmark</i>
              </div>
              <div className="content">
                <div className="text">TOTAL CUSTOMER</div>
                <div
                  className="number count-to"
                  data-from="0"
                  data-to="257"
                  data-speed="1000"
                  data-fresh-interval="20"
                >
                  {customer_request?.customer}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <div className="info-box bg-light-green hover-expand-effect">
              <div className="icon">
                <i className="material-icons">bookmark</i>
              </div>
              <div className="content">
                <div className="text">TOTAL SALES AMOUNT</div>
                <div
                  className="number count-to"
                  data-from="0"
                  data-to="243"
                  data-speed="1000"
                  data-fresh-interval="20"
                >
                  125887
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <div className="info-box bg-orange hover-expand-effect">
              <div className="icon">
                <i className="material-icons">bookmark</i>
              </div>
              <div className="content">
                <div className="text">MEDICINE EXPIRE IN WEEK</div>
                <div
                  className="number count-to"
                  data-from="0"
                  data-to="1225"
                  data-speed="1000"
                  data-fresh-interval="20"
                >
                  0
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row clearfix">
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <div className="info-box bg-pink hover-expand-effect">
              <div className="icon">
                <i className="material-icons">bookmark</i>
              </div>
              <div className="content">
                <div className="text">COMPLETED REQUEST</div>
                <div
                  className="number count-to"
                  data-from="0"
                  data-to="125"
                  data-speed="15"
                  data-fresh-interval="20"
                >
                  100
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <div className="info-box bg-cyan hover-expand-effect">
              <div className="icon">
                <i className="material-icons">bookmark</i>
              </div>
              <div className="content">
                <div className="text">PENDING REQUEST</div>
                <div
                  className="number count-to"
                  data-from="0"
                  data-to="257"
                  data-speed="1000"
                  data-fresh-interval="20"
                >
                  2
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <div className="info-box bg-light-green hover-expand-effect">
              <div className="icon">
                <i className="material-icons">bookmark</i>
              </div>
              <div className="content">
                <div className="text">TODAY SALES AMOUNT</div>
                <div
                  className="number count-to"
                  data-from="0"
                  data-to="243"
                  data-speed="1000"
                  data-fresh-interval="20"
                >
                  2,000.00
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <div className="info-box bg-orange hover-expand-effect">
              <div className="icon">
                <i className="material-icons">bookmark</i>
              </div>
              <div className="content">
                <div className="text">TODAY SALES PROFIT</div>
                <div
                  className="number count-to"
                  data-from="0"
                  data-to="1225"
                  data-speed="1000"
                  data-fresh-interval="20"
                >
                  5682
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="header">
                <h2>Profit Chart</h2>
              </div>
              <div className="body"></div>
            </div>
          </div>
        </div>
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="header">
                <h2>Sell Chart</h2>
              </div>
              <div className="body"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeComponent;
