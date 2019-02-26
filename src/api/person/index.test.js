import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Person } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, person

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  person = await Person.create({ identity: user })
})

test('POST /people 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, firstName: 'test', lastName: 'test', DOB: 'test', mainAddress: 'test', secondaryAddress: 'test', phones: 'test', educations: 'test', works: 'test', skills: 'test', profilePic: 'test', wallPic: 'test', modified: 'test', bio: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.firstName).toEqual('test')
  expect(body.lastName).toEqual('test')
  expect(body.DOB).toEqual('test')
  expect(body.mainAddress).toEqual('test')
  expect(body.secondaryAddress).toEqual('test')
  expect(body.phones).toEqual('test')
  expect(body.educations).toEqual('test')
  expect(body.works).toEqual('test')
  expect(body.skills).toEqual('test')
  expect(body.profilePic).toEqual('test')
  expect(body.wallPic).toEqual('test')
  expect(body.modified).toEqual('test')
  expect(body.bio).toEqual('test')
  expect(typeof body.identity).toEqual('object')
})

test('POST /people 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /people 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].identity).toEqual('object')
})

test('GET /people 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /people/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${person.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(person.id)
})

test('GET /people/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /people/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${person.id}`)
    .send({ access_token: userSession, firstName: 'test', lastName: 'test', DOB: 'test', mainAddress: 'test', secondaryAddress: 'test', phones: 'test', educations: 'test', works: 'test', skills: 'test', profilePic: 'test', wallPic: 'test', modified: 'test', bio: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(person.id)
  expect(body.firstName).toEqual('test')
  expect(body.lastName).toEqual('test')
  expect(body.DOB).toEqual('test')
  expect(body.mainAddress).toEqual('test')
  expect(body.secondaryAddress).toEqual('test')
  expect(body.phones).toEqual('test')
  expect(body.educations).toEqual('test')
  expect(body.works).toEqual('test')
  expect(body.skills).toEqual('test')
  expect(body.profilePic).toEqual('test')
  expect(body.wallPic).toEqual('test')
  expect(body.modified).toEqual('test')
  expect(body.bio).toEqual('test')
  expect(typeof body.identity).toEqual('object')
})

test('PUT /people/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${person.id}`)
    .send({ access_token: anotherSession, firstName: 'test', lastName: 'test', DOB: 'test', mainAddress: 'test', secondaryAddress: 'test', phones: 'test', educations: 'test', works: 'test', skills: 'test', profilePic: 'test', wallPic: 'test', modified: 'test', bio: 'test' })
  expect(status).toBe(401)
})

test('PUT /people/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${person.id}`)
  expect(status).toBe(401)
})

test('PUT /people/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, firstName: 'test', lastName: 'test', DOB: 'test', mainAddress: 'test', secondaryAddress: 'test', phones: 'test', educations: 'test', works: 'test', skills: 'test', profilePic: 'test', wallPic: 'test', modified: 'test', bio: 'test' })
  expect(status).toBe(404)
})

test('DELETE /people/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${person.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /people/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${person.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /people/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${person.id}`)
  expect(status).toBe(401)
})

test('DELETE /people/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
