import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import path from 'path'
import * as db from './dbHandler.js'
import { NotFoundError } from './util/errors.js'
const router = express.Router()
const dataPath = path.resolve('./data/entries.json');

const validationCheck = (req, res, next) => {
  const errors = []
  if (req.body.email == null) {
      errors.push("email")
  }
  if (req.body.name == null) {
      errors.push("name")
  }
  if (req.body.phoneNumber == null) {
    errors.push("phoneNumber")
  }
  if (req.body.content == null) {
    errors.push("content")
  }
  if (errors.length > 0) {
      return res.status(400).send({message: "errors found", errors})
  }
  next()
}


router.get('/', async (req, res, next) => {
  try {
    return res.send(await db.getAll(dataPath))
  } catch (err) {
    console.error("route error", err)
    return next(err)
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    return res.send(await db.getid(req.params.id, dataPath))
  } catch (err) {
    console.error("route error", err)
    return next(err)
  }
});

router.use(validationCheck)
router.post('/', async (req, res, next) => {
    req.body.id = uuidv4();
    try {
      await db.add(req.body, dataPath)

      return res.status(201).send(req.body)
  } catch (err) {
      console.error("are we here?", err)
      return next(err)
  }
});

router.put('/:id', async (req, res, next) => {
  try {
      await db.update(req.params.id, req.body, dataPath)
      console.log(req.params.id)
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

export default router;
