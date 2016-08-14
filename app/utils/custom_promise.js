import env from 'app/utils/env';

let CustomPromise = Promise;


// On dev use chrome native promises, opposite to Babel sandboxed version.
// Chrome native promise impl is the same as babel one spec-wise BUT
// gets proper stack traces on uncaught exceptions.
if (env.isDev) {
  CustomPromise = window.Promise;
}

export {
  CustomPromise
};

/**
* Wrap our implentation choise of promise library so we can easily modify or fix
* errors and also switch to a new one in case we need to. HOWEVER please be
* careful about changes here.
* Whenever we change promises details we need to make sure a few conditions
* are met:
*
*  - Exceptions NEVER go silent. This could happen for instance if we reject a
*    promise intentionally and there is a consumer of that promise that adds
*    a .catch or .then(null, errorHanlder) that DOES NOT re-throws the uncaught
*    exception, in which case we are never gonna see an error in the console for
*    things like typo.
*    Example:
*
*      apiCall().then(
*        () => Promise.resolve('success'),
*        () => Promise.reject('expected negative flow')
*      ).catch(() => 'expected negative flow handling')
*
*    This case looks all good BUT what happens if we have a TYPO or an uncaught
*    error inside the apiCall, in that case since we added to the outter promise
*    a .catch the promise library is gonna think that we KNOW about the error
*    and delegate to us the 'handling', but we are not doing anything with the
*    exception that is gonna come in the arguments. Neither we want to do something
*    would be massive boilerplate to do so.
*    A solution to this is NEVER use rejected promises to state 'expected flows'.
*
*  - Uncaught errors: An uncaught error is basically any runtime error (typo f.i),
*    they usually happen inside a resolveHandler or errorHandler, the problem is that
*    some libraries do not show an error on uncaught exceptions (mostly those that have
*    .done as part of their API). Therefore if you have something like
*
*      apiCall().then(() => 'do something', null);
*
*    and there is a typo inside the api call or even inside the 'success handler'
*    we could get an exception that depending on the library goes unseen or gets
*    rethrown as 'uncaught exception'.
*
*  - Stack traces - Uncaught exceptions.
*    Most of the libraries that re-throw an uncaught exception will NOT provide
*    a stacktrace that chrome would understand correctly therefore we don't get
*    a nice stack trace. We found out that to get nice stacktraces you need to
*    rethrow the ex in the next tick (setTimeout(() => throw error))) or use
*    .done in the libraries that provide this, which internally does the setTimeout
*    solution.
*    However! the chrome native impl actually DOES throws the exception properly
*    and you get proper stack traces, so this is always an option at least for
*    development.
*/
