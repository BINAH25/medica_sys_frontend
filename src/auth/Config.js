class Config {
  static loginUrl = "http://127.0.0.1:8000/token/";
  static homeUrl = "/home";
  static companyUrl = "http://127.0.0.1:8000/api/company/";
  static companyBankUrl = "http://127.0.0.1:8000/api/company_bank/";

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
  ];
}
export default Config;
