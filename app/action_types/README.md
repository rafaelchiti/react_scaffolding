# Action Types

Action types are simply constants.
The idea is to define in a single place all the 'String' constants we need for
all the actions in our Application.
The action types can have two different shapes depending if they represent a sync
action or an async action. (this shape is determined by our redux middleware, we just
follow the convention stablished by our custom middleware).

### Sync
```js
Types = {
  POST_READ: "POST_READ"  
}
```

### Async
```js
Types = {
  FETCH_POST: {
    request: "FETCH_POST_REQUEST",
    done: "FETCH_POST_DONE",
    fail: "FETCH_POST_FAIL"
  }
}
```

We have under utils just some simple functions that simplify the task of creating this action types.
