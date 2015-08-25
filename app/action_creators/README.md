# Action Creators

Action creators are just functions that create the 'Payload' for a given action/operation.
The action creator will get the type from our list of action types and return a literal
with extra parameters if they are required as well as an Api Call in case of an async action.

Our action creators follow the convention from Redux, for more information on it check the docs
on redux site ([link](http://rackt.github.io/redux/docs/basics/Actions.html))

Is important to notice that Action Creators when called they DO NOTHING but create an object
that represents our action, we need to perform a 'dispatch' of this object to actually create
an impact in our App.
