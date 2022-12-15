import React from "react";

const MedicalPage = () => {
  const [getMedicals, setGetMedicals] = useState([]);
  const [getMedicine, setGetMedicine] = useState([]);
  const [medical, setMedical] = useState({
    medicine_id: "",
    salt_name: "",
    salt_qty: "",
    salt_qty_type: "",
    description: "",
    companyStatus: 0,
    dataLoaded: false,
  });
  // Handle Inputs

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setMedical({ ...medical, [name]: value });
  };

  // Handle formSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    setMedical({
      companyStatus: 1,
    });
    CompanyBankAuth.createCompanyBank(
      medical.medicine_id,
      medical.salt_name,
      medical.salt_qty,
      medical.salt_qty_type,
      medical.description,
      handleResponse
    );
    setMedical({
      medicine_id: "",
      salt_name: "",
      salt_qty: "",
      salt_qty_type: "",
      description: "",
    });
  };

  // getting login response
  const handleResponse = (data) => {
    if (data.message === "Error, Failed to add Medical..") {
      setMedical({
        companyStatus: 4,
      });
    } else {
      setMedical({
        companyStatus: 3,
      });
    }
  };

  // getting login message
  const getMessage = () => {
    if (medical.companyStatus === 0) {
      return "";
    } else if (medical.companyStatus === 1) {
      return (
        <div className="alert alert-warning">
          <strong>Logging in!</strong> Please Wait...
        </div>
      );
    } else if (medical.companyStatus === 3) {
      return (
        <div className="alert alert-success">
          <strong>Medical added Successful!</strong>
        </div>
      );
    } else if (medical.companyStatus === 4) {
      return (
        <div className="alert alert-danger">
          <strong>Failed to Add Medical </strong>
        </div>
      );
    }
  };
  //getting all medicals
  useEffect(() => {
    getAllMedicals();
  }, []);
  let getAllMedicals = async () => {
    let res = await axios.get(Config.companyBankUrl, {
      headers: { Authorization: "Bearer " + Auth.getLoginToken() },
    });
    setGetMedicals(res.data);
    setMedical({ dataLoaded: true });
  };
  //getting all medicines
  useEffect(() => {
    getAllMedicines();
  }, []);
  let getAllMedicines = async () => {
    let res = await axios.get(Config.companyUrl, {
      headers: { Authorization: "Bearer " + Auth.getLoginToken() },
    });
    setGetMedicine(res.data);
  };

  return <div>MedicalPage</div>;
};

export default MedicalPage;
