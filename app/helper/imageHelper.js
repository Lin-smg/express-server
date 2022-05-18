const fs = require("fs");
const path = require("path");

exports.saveImage = (temp, fileName) => {
    const tempPath = path.join(__dirname, temp);
    const targetPath = path.join(__dirname, fileName);

    fs.renameSync(tempPath, targetPath)
}