class Request {
  constructor() {
    // this.mainRoute = "http://159.65.216.209:5000/api/v1/"
    // this.mainRoute = 'https://excelist.tk:5000/'
    this.mainRoute = 'http://143.244.156.125:5000/api/v1/'
    // this.mainRoute = "https://api.excelist.am/api/v1/";
  }

  get = (url) => this.sendRequest("GET", url);

  post = (url, data) => this.sendRequest("POST", url, data, null);

  postJson = (url, data) =>
    this.sendRequest("POST", url, JSON.stringify(data), "application/json");

  postFormData = (url, data) => this.sendRequest("POST", url, data);

  postJson = (url, data) =>
    this.sendRequest("POST", url, JSON.stringify(data), "application/json");

  put = (url, data) =>
    this.sendRequest("PUT", url, JSON.stringify(data), "application/json");

  putFormData = (url, data) => this.sendRequest("PUT", url, data);

  delete = (url) => this.sendRequest("DELETE", url);

  sendRequest(method, url, data, contentType) {
    const token = localStorage.getItem("authorizedUser");
    let headers = {};
    contentType
      ? (headers = {
          "Content-Type": contentType,
          Authorization: "Bearer " + token,
        })
      : (headers = { Authorization: "Bearer " + token });
    return fetch(this.mainRoute + url, {
      method,
      headers,
      body: data,
    });
  }
}

export default new Request();
