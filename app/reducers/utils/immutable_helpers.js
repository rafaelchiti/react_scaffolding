import immutableLib from 'seamless-immutable';
import {
  isPlainObject,
  isArray,
  isUndefined,
  isObject
} from 'lodash';

/**
* Collection of helpers to perform operations on objects/arrays.
* The current implementation works under the assumption of seamless-immutable
* collections wrapping all our objects/arrays.
* The beauty of this is that we can easily migrate this impl to use other library
* or just use plain objects if we want and all the reducers should work as usual.
*/

/*
* Returns a new object also containing the new key, value pair.
* If an equivalent key already exists in this Map, it will be replaced.
* You can use as a shortcut nexted paths (delimited by dots).
*/
export function set(sourceObject, keyPath, value) {
  if (isPlainObject(keyPath)) {
    return sourceObject.merge(keyPath);
  }

  const keys = isArray(keyPath) ? keyPath : keyPath.split('.');

  //TODO: This will only short circuit at the very first execution,
  // when doing recursion, we don't need this anymore and is time spent.
  // seamless-immutable is handling this in SOME of the cases, but not others
  // (remove this line and run test to see it fails). How we can improve this?
  if (getIn(sourceObject, keys) === value) return sourceObject;


  const merged = {};
  if (keys.length === 1) {
    if (isPlainObject(sourceObject)) {
      merged[keys[0]] = value;
      return sourceObject.merge(merged);
    } else if (isArray(sourceObject)) {
      const newObject = sourceObject.asMutable();
      newObject[keys[0]] = value;
      return immutableLib(newObject);
    } else if (isUndefined(sourceObject)) {
      const newObject = {};
      newObject[keys[0]] = value;
      return immutableLib(newObject);
    }
  } else {
    if (isPlainObject(sourceObject)) {
      merged[keys[0]] = set(sourceObject[keys[0]], keys.slice(1), value);
      return sourceObject.merge(merged);
    } else if (isArray(sourceObject)) {
      const newObject = sourceObject.asMutable();
      newObject[keys[0]] = set(sourceObject[keys[0]], keys.slice(1), value);
      return immutableLib(newObject);
    } else if (isUndefined(sourceObject)) {
      merged[keys[0]] = set(undefined, keys.slice(1), value);
      return immutableLib(merged);
    }
  }
}



/*
* Returns a new object resulting from merging the source object the new one.
* The keyPath allows you to specify at which level to perform the merge, or if you
* send the object to merge instead of a keyPath then it will be used to be merged
* on the root level of the source object. This will perform a deep merge but won't
* affect those siblings or keys that already existed in the source object, will
* only override existing keys with the values from the new object.
*
*/
export function merge(sourceObject, keyPath, object) {
  const deep = { deep: true };
  if (isObject(keyPath)) {
    return sourceObject.merge(keyPath, deep);
  } else {
    return sourceObject.merge(buildNestedObject({}, keyPath, object), deep);
  }
}

/*
* Returns a new object containing all the keys / values from the source object
* but the one specified in the `key` parameter.
*/
export function without(sourceObject, key) {
  return sourceObject.without(key);
}

/*
* Wrap the object as a seamless immutable object.
*/
export function immutable(object) {
  return immutableLib(object);
}




/***
* Utilitary functions
*/

/*
* Private: Take a key patch such as "student.teacher.name" and a value to build
* the nested structure with that value assigned. Also expects an initial object
* to use for building the structure.
* f.i:
*   buildNestedObject({}, "student.teacher.name", "john") => {student: {teacher: {name: "john"}}}
*/
function buildNestedObject(obj = {}, keyPath, value) {
  const keys = isArray(keyPath) ? keyPath : keyPath.split('.');

  if (keys.length === 1) {
    obj[keys[0]] = value;
  } else {
    const key = keys.shift();
    obj[key] = buildNestedObject(typeof obj[key] === 'undefined' ? {} : obj[key], keys, value);
  }

  return obj;
}



/*
* Private: Return the value at the given key path.
* keyPath can be either an array of keys or a string delimited by dots.
* Useful for getting values in a nested object.
* f.i: getIn(object, "key1.key2.name")
*/
function getIn(object, keyPath) {
  const keys = isArray(keyPath) ? keyPath : keyPath.split('.');

  if (isUndefined(object)) { return undefined; }

  if (keys.length === 1) {
    return object[keys[0]];
  } else {
    return getIn(object[keys[0]], keys.slice(1));
  }
}
