import Api from "./api";

const ApiCalls = {

  authenticate ({email, password}) {
    return Api.post({
      path: "/authenticate",
      body: {email: email, password: password},
      ignoreAuthFailure: true,
      parse: function(res) {
        if (res.body.errorMessage) {
          this.fail({errorMessage: res.body.errorMessage});
        }
        if (res.body.token && res.body.user) {
          this.done(res.body);
        }
      }
    });
  }

}


export default ApiCalls;