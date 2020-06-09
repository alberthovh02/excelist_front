class Request {
  constructor(){
    this.mainRoute = "https://159.65.216.209:3000/"
    // this.mainRoute = '//localhost:5000/'
  }

  get = url => this.sendRequest("GET", url);

  post = (url, data) => this.sendRequest('POST', url, data, null);

  postJson = (url, data) => this.sendRequest('POST', url, JSON.stringify(data), 'application/json');

  postFormData = (url, data) => this.sendRequest("POST", url, data)

  postJson = (url, data) => this.sendRequest("POST", url, JSON.stringify(data), 'application/json');

  put = (url, data) => this.sendRequest("PUT", url, JSON.stringify(data), 'application/json')

  putFormData = (url, data) => this.sendRequest("PUT", url, data);

  delete = url => this.sendRequest("DELETE", url);

  sendRequest(method, url, data, contentType){
    const token = localStorage.getItem("authorizedUser");
    let headers = {};
    contentType
      ? (headers = { 'Content-Type': contentType, Authorization: 'Bearer ' + token})
      : (headers = { Authorization: "Bearer " + token});
      return fetch(this.mainRoute + url, {
        method,
        headers,
        body: data
      })
  }
}

export default new Request();
