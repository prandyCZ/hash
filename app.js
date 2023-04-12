const express = require('express');const crypto = require('crypto');const app = express();const port = 1234app.post(    "/uploadFile",    (req, res) => {      calculateHashAndSize(req, res);    });app.listen(port);function calculateHashAndSize(req, res) {  let fileSize = 0;  let sha1;  let requestHasData = false;  const hash = crypto.createHash('sha1');  req.on('data', (chunk) => {    requestHasData = true;    fileSize += chunk.length;    hash.update(chunk);  });  req.on('end', () => {    //check if request had any data    if (!requestHasData) {      res.statusCode = 400;      res.json({ error: "No data to hash" });      return;    }    sha1 = hash.digest('hex');    //TODO Save into DB here    // write results into response    res.json({sha1, fileSize});  });}