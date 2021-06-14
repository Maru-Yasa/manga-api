const HttpsProxyAgent = require('https-proxy-agent');
const baseUrl = require("../constants/urls");
const axiosDefaultConfig = {
  baseURL: baseUrl,
  proxy: false,
  httpsAgent: new HttpsProxyAgent('http://103.139.181.103:3128/')
};

const axios = require("axios").create(axiosDefaultConfig);
const tunnel = require("tunnel");
const axiosCookieJarSupport = require("axios-cookiejar-support").default;
const tough = require("tough-cookie");
let randomUserAgent = require('random-user-agent')
axiosCookieJarSupport(axios);
const cookiejar = new tough.CookieJar();
// const tunnelAgent = tunnel.httpsOverHttp({
//   proxy: {
//     host: "36.67.124.197",
//     port: 80,
//   },
// });
// var httpsAgent = new HttpsProxyAgent('http://103.139.181.103:3128/')

// axios.defaults.baseURL = baseUrl;
// axios.defaults.httpsAgent = tunnelAgent;
// axios.defaults.jar = cookiejar;
// 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_2; rv:10.0.1) Gecko/20100101 Firefox/10.0.1';
const AxiosService = async (url) => {
  return new Promise(async (resolve, reject) => {
    const _url = url == null?url:encodeURI(url);
    try {
      const response = await axios.get(_url);
//       console.log(response.config.httpsAgent)
      if (response.status === 200) {
        return resolve(response);
      }
      return reject(response);
    } catch (error) {
      return reject(error.message);
    }
  });
};


module.exports = AxiosService;

