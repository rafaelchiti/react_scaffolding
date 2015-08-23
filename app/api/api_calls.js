import Api from "./api";

const ApiCalls = {

  authenticate ({email, password}) {
    return Api.post({
      path: "/authenticate",
      body: {email: email, password: password},
      ignoreAuthFailure: true
    });
  }

}


export default ApiCalls;