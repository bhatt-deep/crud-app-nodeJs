import express from 'express';
import { v4 as uuidv4 } from 'uuid';
const router = express.Router()
const dataPath = './data/entries.json';
const fs = require('fs');

const readFile = (
    callback,
    returnJson = false,
    filePath = dataPath,
    encoding = 'utf8'
  ) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) {
        throw err;
      }

      callback(returnJson ? JSON.parse(data) : data);
    });
};

const writeFile = (
    fileData,
    callback,
    filePath = dataPath,
    encoding = 'utf8'
  ) => {
    fs.writeFile(filePath, fileData, encoding, err => {
      if (err) {
        throw err;
      }

      callback();
    });
};

router.get('/', (req, res) => {
    readFile(data => {
        res.send(data);
      }, true);
});

router.post('/', (req, res) => {
    req.body.id = uuidv4();
    const {  name, email, phoneNumber, content } = req.body
    if ( !name || !email || !phoneNumber || !content) {
        return res.status(400).json( { 
            Message : "Validation Error",
            Invalid : req.body
   
        } )
    }
    readFile(data => {
        const newUserId = Object.keys(data).length + 1;

        // add the new user
        data[newUserId] = req.body;

    
        writeFile(JSON.stringify(data, null, 2), () => {
          return res.status(200).send(req.body);
        });
      }, true);
    //return res.status(201).send(req.body)

});

export default router
