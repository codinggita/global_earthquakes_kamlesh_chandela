exports.cacheMiddleware = () => {
  return (req, res, next) => {
    next();
  };
};
