class Config {
  constructor() {
    this.hostname = window.location.hostname;
    if (this.hostname === "localhost") this.hostname += ":3000";
    this.SiteBaseURL = `${window.location.protocol}//${this.hostname}/api`;

    this.APIBaseURL = `http://10.0.0.191:5000/api`;
  }
}

const config = new Config()

export default config;