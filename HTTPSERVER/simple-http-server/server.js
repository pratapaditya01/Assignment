const express = require('express');
const fs = require('fs');
const app = express();
const port = 8080;

app.get('/data', (req, res) => {
  const fileName = req.query.n;
  const lineNumber = req.query.m;

  if (!fileName) {
    return res.status(400).send('File name (n) is required.');
  }

  const filePath = `/tmp/data/${fileName}.txt`;

  if (lineNumber) {
    const lineContent = getLineContent(filePath, lineNumber);
    return res.send(lineContent);
  } else {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return res.send(fileContent);
  }
});

function getLineContent(filePath, lineNumber) {
  const data = fs.readFileSync(filePath, 'utf8').split('\n');
  return data[lineNumber - 1] || 'Line not found.';
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
