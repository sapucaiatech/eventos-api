module.exports = function(msg, code) {

  let err = new Error(msg || "Unknown Error");
  err.status = code || 500;
  return err;

}
