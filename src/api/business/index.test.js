import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Business } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, business

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  business = await Business.create({ creator: user })
})

test('POST /businesses 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, name: 'test', startDate: 'test', fiscalAddress: 'test', secondaryAddresses: 'test', phones: 'test', employeeCount: 'test', fiscalId: 'test', wallPic: 'test', profilPic: 'test', foundor: 'test', updated: 'test', updatedBy: 'test', lastActivity: 'test', enabled: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.startDate).toEqual('test')
  expect(body.fiscalAddress).toEqual('test')
  expect(body.secondaryAddresses).toEqual('test')
  expect(body.phones).toEqual('test')
  expect(body.employeeCount).toEqual('test')
  expect(body.fiscalId).toEqual('test')
  expect(body.wallPic).toEqual('test')
  expect(body.profilPic).toEqual('test')
  expect(body.foundor).toEqual('test')
  expect(body.updated).toEqual('test')
  expect(body.updatedBy).toEqual('test')
  expect(body.lastActivity).toEqual('test')
  expect(body.enabled).toEqual('test')
  expect(typeof body.creator).toEqual('object')
})

test('POST /businesses 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /businesses 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /businesses/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${business.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(business.id)
})

test('GET /businesses/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /businesses/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${business.id}`)
    .send({ access_token: userSession, name: 'test', startDate: 'test', fiscalAddress: 'test', secondaryAddresses: 'test', phones: 'test', employeeCount: 'test', fiscalId: 'test', wallPic: 'test', profilPic: 'test', foundor: 'test', updated: 'test', updatedBy: 'test', lastActivity: 'test', enabled: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(business.id)
  expect(body.name).toEqual('test')
  expect(body.startDate).toEqual('test')
  expect(body.fiscalAddress).toEqual('test')
  expect(body.secondaryAddresses).toEqual('test')
  expect(body.phones).toEqual('test')
  expect(body.employeeCount).toEqual('test')
  expect(body.fiscalId).toEqual('test')
  expect(body.wallPic).toEqual('test')
  expect(body.profilPic).toEqual('test')
  expect(body.foundor).toEqual('test')
  expect(body.updated).toEqual('test')
  expect(body.updatedBy).toEqual('test')
  expect(body.lastActivity).toEqual('test')
  expect(body.enabled).toEqual('test')
  expect(typeof body.creator).toEqual('object')
})

test('PUT /businesses/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${business.id}`)
    .send({ access_token: anotherSession, name: 'test', startDate: 'test', fiscalAddress: 'test', secondaryAddresses: 'test', phones: 'test', employeeCount: 'test', fiscalId: 'test', wallPic: 'test', profilPic: 'test', foundor: 'test', updated: 'test', updatedBy: 'test', lastActivity: 'test', enabled: 'test' })
  expect(status).toBe(401)
})

test('PUT /businesses/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${business.id}`)
  expect(status).toBe(401)
})

test('PUT /businesses/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, name: 'test', startDate: 'test', fiscalAddress: 'test', secondaryAddresses: 'test', phones: 'test', employeeCount: 'test', fiscalId: 'test', wallPic: 'test', profilPic: 'test', foundor: 'test', updated: 'test', updatedBy: 'test', lastActivity: 'test', enabled: 'test' })
  expect(status).toBe(404)
})

test('DELETE /businesses/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${business.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /businesses/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${business.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /businesses/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${business.id}`)
  expect(status).toBe(401)
})

test('DELETE /businesses/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
