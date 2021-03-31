const express = require("express");
const PORT = 8000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(8000, () => {
  console.log(`Listening on port ${PORT}`);
});
exports.app = app;
