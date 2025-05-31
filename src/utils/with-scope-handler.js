"use strict";

// Manual implementation of 'awilix-express' -> 'makeFunctionInvoker'
module.exports = (resolver) => (methodName) => {
  return function (req, res, next) {
    const resolved = resolver(req.container.cradle);
    return resolved[methodName](req, res, next);
  };
};
