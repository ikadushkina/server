const printError = (errorData, res, err) => {
  console.error("middleware error: ", err);

  if (errorData && errorData.status && errorData.message) {
    return res.status(errorData.status).json({ message: errorData.message });
  } else {
    res.status(500).json({ message: "undefined error" });
  }
  res.end();
};

const errorMiddlewareAsync = (cb, errorData) => (req, res) =>
  new Promise((resolve, reject) => {
    try {
      const f = cb(req, res);

      if (f instanceof Promise) {
        f.then(resolve).catch((err) => {
          printError(errorData, res, err);
          console.log("REJECT", err);
          reject();
        });
      } else {
        console.log("resolve");
        resolve();
      }
    } catch (err) {
      printError(errorData, res, err);
      console.log("REJECT", err);
      reject();
    }
  });

module.exports = { errorMiddlewareAsync };
