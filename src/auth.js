import express from 'express';
import * as db from './dbHandler.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
const router = express.Router()
/* const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv'); */
dotenv.config();
const tablename = 'users';

router.post('/', async (req, res, next) => {
    try {
        const { email, password:pass } = req.body;

        const user = await db.getOne(email,tablename);

        if (!user) {
            return res.status(401).send({message:'incorrect credentials provided'});
        }
        
        const isMatch = await bcrypt.compare(pass, user[0].password);

        if (!isMatch) {
            return res.status(401).send({message: 'incorrect credentials provided'});
        }

        // user matched!
        const secretKey = process.env.JWT_SECRET || "";
        const token = jwt.sign({ user_id: user[0].id.toString() }, secretKey, {
            expiresIn: '1800s'
        });

        res.send( {token} );
  } catch (err) {
      console.error("are we here?", err)
      return next(err)
  }
});

export default router