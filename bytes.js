const crypto = require("crypto");
const accessKey = crypto.randomBytes(64).toString("hex");
console.log(accessKey);
