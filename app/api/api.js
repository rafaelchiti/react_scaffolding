import superAgentRequest from 'superagent';
import _ from 'lodash';
import { CustomPromise } from 'app/utils/custom_promise';

// API helper
// Provide a few abstractions that would handle automatically some common
// API scenarios.
//
// Example call
// export function authenticate ({email, password}) {
//   return Api.post({
//     path: '/authenticate',
//     body: {email: email, password: password},
//     ignoreAuthFailure: true,
//     parse: function(res) {
//       if (res.body.errorMessage) {
//         this.fail({errorMessage: res.body.errorMessage});
//       }
//       if (res.body.token && res.body.user) {
//         this.done(res.body);
//       }
//     }
//   });
// }
//

const TIMEOUT = 15000;

function makeUrl (url) {
  if (_.isArray(url)) {
    url = '/' + url.join('/');
  }
  url = '/api' + url;
  return url;
}

function removeValue (arr, v) {
  _.remove(arr, (item) => item === v);
}

const _pendingRequests = [];

// Abor the requests for the Api Call with the specified name.
// Be careful since won't make any difference if the same api call gets
// called with diffrent query strings or body, this feature stops any
// pending call for the specified Api Call
function abortPendingRequestsForApiCall (apiCallName) {
  const pendingRequest = _.find(_pendingRequests, (pending) => {
    return pending._apiCallName === apiCallName;
  });

  if (pendingRequest) {
    pendingRequest._callback = () => {};
    pendingRequest.abort();
    removeValue(_pendingRequests, pendingRequest);
  }
}

function digestResponse (resolve, reject, error, request, response, options) {

  const result = {};

  // Autofail with standard api error on timeout.
  if (error && error.timeout >= 0) {
    result.apiError = 'TIMEOUT';
    reject(result);

  // Auto-fail with special auth error on 401.
  } else if (response.status === 401 && !options.ignoreAuthFailure) {
    result.apiError = 'AUTH_ERROR';
    reject(result);

  // Auto-fail with special api down error on 502 - 504.
  // IE can do weird things with 5xx errors like call them 12031s.
  } else if ((response.status >= 502 && response.status <= 504) || response.status > 12000) {
    result.apiError = '500_ERROR';
    reject(result);

  } else if (response.status === 429) {
    result.apiError = 'RATE_LIMIT_ERROR';
    reject(result);

  } else {

    response.body = response.body || {}; // patch response.body if nonexistant

    let gotExpectedResponse;
    const parser = options.parse || defaultParser;

    const done = function (data) {
      gotExpectedResponse = true;
      result.apiResponse = data || {};
      resolve(result);
    };

    const fail = function (err) {
      gotExpectedResponse = true;
      result.apiError = err;
      reject(result);
    };

    const pass = function () {
      // do nothing.  don't resolve or reject the promise.
      gotExpectedResponse = true;
    };

    parser.call({ done, fail, pass }, response);

    // Our parser did not get a response it understands
    if (!gotExpectedResponse) {
      result.apiError = 'UNKOWN ERROR';
      reject(result);
    }
  }
}

function defaultParser (res) {
  if (isSuccessStatus(res.status)) {
    return this.done(res.body);
  }
}

function isSuccessStatus (status) {
  return status >= 200 && status <= 299;
}

function executeRequestFlow (options) {
  return new CustomPromise(function (resolve, reject) {

    options.method = options.method || 'GET';

    const url = options.absolutePath || makeUrl(options.path);

    const request = superAgentRequest(options.method, url);

    const query = {};

    if (_(['GET', 'POST', 'PUT']).contains(options.method)) {
      request.accept('json');
      request.type('json');
    }

    if (_(['POST', 'PUT']).contains(options.method)) {
      options.body = options.body || {};
    }

    // If you need to set a cookie do as follow:
    // request.set('Cookie', sessionCookie);

    if (options.body) {
      request.send(options.body);
      Object.keys(options.body).forEach(function (key) {
        if (options.body[key] === undefined) {
          console.warn('Key was undefined in request body:', key);
        }
      });
    }


    if (options.query) {
      _.extend(query, options.query);
    }

    if (Object.keys(query).length) {
      request.query(query);
    }

    request.timeout(TIMEOUT);

    // Prevent concurrent calls for the same Api Call type.
    if (options.cancelPendingRequests) {

      if (request._apiCallName) console.log('WARNING: Prop clashing with request object');
      if (!options.apiCallName) console.log('WARNING: To cancel previous calls the Api Call needs a name defined.');

      request._apiCallName = options.apiCallName;

      abortPendingRequestsForApiCall(options.apiCallName);
    }

    // Request Callback logic
    request.end(function (error, response) {
      digestResponse(resolve, reject, error, request, response, options);
      removeValue(_pendingRequests, request);
    });

    _pendingRequests.push(request);
  });
}

// API Interface
const Api = {
  execute: executeRequestFlow,

  get: function (options) {
    options.method = 'GET';
    return executeRequestFlow(options);
  },

  put: function (options) {
    options.method = 'PUT';
    return executeRequestFlow(options);
  },

  post: function (options) {
    options.method = 'POST';
    return executeRequestFlow(options);
  },

  delete: function (options) {
    options.method = 'DELETE';
    return executeRequestFlow(options);
  },

  head: function (options) {
    options.method = 'HEAD';
    return executeRequestFlow(options);
  },

  isSuccessStatus: function (status) {
    return isSuccessStatus(status);
  }

};

module.exports = Api;
