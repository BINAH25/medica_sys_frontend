class Config {
  static loginUrl = "http://127.0.0.1:8000/token/";
  static homeUrl = "/home";
  static companyUrl = "http://127.0.0.1:8000/api/company/";
  static companyBankUrl = "http://127.0.0.1:8000/api/company_bank/";
  static medicineUrl = "http://127.0.0.1:8000/api/medicine/";
  static medicalUrl = "http://127.0.0.1:8000/api/medicine_details/";
  static companyAccountUrl = "http://127.0.0.1:8000/api/company_account/";

  // SIDE BAR URLS
  static sidebarItem = [
    {
      index: "0",
      title: "Home",
      url: "/home",
      icons: "home",
    },
    {
      index: "1",
      title: "Company",
      url: "/company",
      icons: "assessment",
    },
    {
      index: "2",
      title: "Company Bank",
      url: "/company_bank",
      icons: "assessment",
    },
    {
      index: "3",
      title: "Add Medicine",
      url: "/medicine",
      icons: "assessment",
    },
    {
      index: "4",
      title: "Add Medical",
      url: "/medical",
      icons: "assessment",
    },
    {
      index: "5",
      title: "Add Account",
      url: "/company_account",
      icons: "assessment",
    },
    {
      index: "6",
      title: "Add Employee",
      url: "/employee",
      icons: "assessment",
    },
  ];
}
export default Config;
