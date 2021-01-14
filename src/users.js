import express from 'express';
import { v4 as uuidv4 } from 'uuid';
const bcrypt = require('bcryptjs');
import * as db from './dbHandler.js'
import { NotFoundError } from './util/errors.js'
const router = express.Router()
const tablename = 'users';


const validationCheck = (req, res, next) => {
  const errors = []
  if (req.body.email == null) {
      errors.push("email")
  }

  if (req.body.name == null) {
      errors.push("name")
  }
  if ( req.body.password == null || req.body.password.length<8) {
    errors.push("minimum length of password should be > 8")
  }
  if (errors.length > 0) {
      return res.status(400).send({message: "validation error", errors})
  }
  next()
}

router.get('/', async (req, res, next) => {
  try {
    let userList = await db.getAll(tablename)
    userList = userList.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
  });
    return res.send(userList)
  } catch (err) {
    console.error("route error", err)
    return next(err)
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const userList = await db.getid(req.params.id, tablename);
    const { password, ...userWithoutPassword } = userList[0]
    return res.send(userWithoutPassword)
  } catch (err) {
    console.error("route error", err)
    return next(err)
  }
});

router.use(validationCheck)
router.post('/', async (req, res, next) => {
    req.body.id = uuidv4();
    try {
      req.body.password = await bcrypt.hash(req.body.password, 8);
      await db.add(req.body, tablename)
      const { password, ...userWithoutPassword } = req.body;
      return res.status(201).send(userWithoutPassword)
  } catch (err) {
      console.error("are we here?", err)
      return next(err)
  }
});

router.put('/:id', async (req, res, next) => {
  try {
      await db.update(req.params.id, req.body, tablename)
      return res.status(200).send(req.body)
  } catch (err) {
      console.error(err)
      if (err instanceof NotFoundError) {
          return res.status(404).send({error: "not found"})
      } else {
          next(err)
      }
  }
});

export default router
