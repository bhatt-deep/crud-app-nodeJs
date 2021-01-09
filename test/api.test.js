import request from 'supertest'
import assert from 'assert'
import should, { not } from 'should'
import * as shouldHttp from 'should-http'
import app from '../index.js'

describe('GET /', () => {
    it('responds with object with hello world', async () => {
        const response = await request(app)
            .get('/')
            .expect(200, {message: "Hello, world!"})
    })
});


describe('POST /users', () => {
    const payload = {

        "name": "Some Name",
        "password": "password",
        "email": "address@email.com"        
    }
    it('responds with 400 with error message of multiple missing properties', async () => {
        const modifiedPayload = payload
        delete modifiedPayload.password
        delete modifiedPayload.name
        const response = await request(app)
            .post('/users')
            .send(modifiedPayload)
        
        response.should.have.status(400)
        response.body.errors.length.should.equal(2)
        
    })

    it('creates new entry in classlist when valid', async () => {
        const newEntry = {
            "name": "Some Name",
            "password": "password",
            "email": "address@email.com"
        }

        const response = await request(app)
            .post('/users')
            .send(newEntry)
        // possibly a weak test, assumes array is not sorted, and first-in,first-out
        const {password, ...withoutPasswordEntry} = newEntry
        response.body.should.containEql(withoutPasswordEntry)
    })
});

describe('GET /users', function() {
    it('responds with json', function() {
      return request(app)
        .get('/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
    });
  });
