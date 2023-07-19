class Config {
  constructor() {
    this.hostname = window.location.hostname;
    if (this.hostname === "localhost") this.hostname += ":3000";
    this.SiteBaseURL = `${window.location.protocol}//${this.hostname}/api`;

    this.APIBaseURL = `${process.env.REACT_APP_API_URL}`;
  }
}

const config = new Config()

export default config;