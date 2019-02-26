import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Person } from '.'

export const create = ({ identity, bodymen: { body } }, res, next) =>
  Person.create({ ...body, identity: identity })
    .then((person) => person.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Person.count(query)
    .then(count => Person.find(query, select, cursor)
      .populate('identity')
      .then((people) => ({
        count,
        rows: people.map((person) => person.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Person.findById(params.id)
    .populate('identity')
    .then(notFound(res))
    .then((person) => person && person.enabled ? person.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ identity, bodymen: { body }, params }, res, next) =>
  Person.findById(params.id)
    .populate('identity')
    .then(notFound(res))
    .then(authorOrAdmin(res, identity, 'identity'))
    .then((person) => person && person.enabled ? Object.assign(person, body).save() : null)
    .then((person) => person ? person.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ identity, params }, res, next) =>
  Person.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, identity, 'identity'))
    .then((person) => person && person.enabled ? person.delete() : null)
    .then(success(res, 204))
    .catch(next)
