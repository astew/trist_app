class Config {
  constructor() {
    if (process.env.NODE_ENV !== 'production') {
      this.API_URL_Prefix = `${process.env.REACT_APP_API_DEV_URL_PREFIX}/api`;
    }
    else {
      this.API_URL_Prefix = "/api";
    }
  }
}

const config = new Config()

export default config;