import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Business } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Business.create({ ...body, creator: user })
    .then((business) => business.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Business.count(query)
    .then(count => Business.find(query, select, cursor)
      .populate('creator')
      .then((businesses) => ({
        count,
        rows: businesses.map((business) => business.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Business.findById(params.id)
    .populate('creator')
    .then(notFound(res))
    .then((business) => business ? business.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Business.findById(params.id)
    .populate('creator')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'creator'))
    .then((business) => business ? Object.assign(business, body).save() : null)
    .then((business) => business ? business.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Business.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'creator'))
    .then((business) => business ? business.remove() : null)
    .then(success(res, 204))
    .catch(next)
