import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Business, { schema } from './model'

const router = new Router()
const { name, startDate, fiscalAddress, secondaryAddresses, phones, employeeCount, fiscalId, wallPic, profilPic, foundor, updated, updatedBy, lastActivity, enabled } = schema.tree

/**
 * @api {post} /businesses Create business
 * @apiName CreateBusiness
 * @apiGroup Business
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Business's name.
 * @apiParam startDate Business's startDate.
 * @apiParam fiscalAddress Business's fiscalAddress.
 * @apiParam secondaryAddresses Business's secondaryAddresses.
 * @apiParam phones Business's phones.
 * @apiParam employeeCount Business's employeeCount.
 * @apiParam fiscalId Business's fiscalId.
 * @apiParam wallPic Business's wallPic.
 * @apiParam profilPic Business's profilPic.
 * @apiParam foundor Business's foundor.
 * @apiParam updated Business's updated.
 * @apiParam updatedBy Business's updatedBy.
 * @apiParam lastActivity Business's lastActivity.
 * @apiParam enabled Business's enabled.
 * @apiSuccess {Object} business Business's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Business not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, startDate, fiscalAddress, secondaryAddresses, phones, employeeCount, fiscalId, wallPic, profilPic, foundor, updated, updatedBy, lastActivity, enabled }),
  create)

/**
 * @api {get} /businesses Retrieve businesses
 * @apiName RetrieveBusinesses
 * @apiGroup Business
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of businesses.
 * @apiSuccess {Object[]} rows List of businesses.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /businesses/:id Retrieve business
 * @apiName RetrieveBusiness
 * @apiGroup Business
 * @apiSuccess {Object} business Business's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Business not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /businesses/:id Update business
 * @apiName UpdateBusiness
 * @apiGroup Business
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Business's name.
 * @apiParam startDate Business's startDate.
 * @apiParam fiscalAddress Business's fiscalAddress.
 * @apiParam secondaryAddresses Business's secondaryAddresses.
 * @apiParam phones Business's phones.
 * @apiParam employeeCount Business's employeeCount.
 * @apiParam fiscalId Business's fiscalId.
 * @apiParam wallPic Business's wallPic.
 * @apiParam profilPic Business's profilPic.
 * @apiParam foundor Business's foundor.
 * @apiParam updated Business's updated.
 * @apiParam updatedBy Business's updatedBy.
 * @apiParam lastActivity Business's lastActivity.
 * @apiParam enabled Business's enabled.
 * @apiSuccess {Object} business Business's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Business not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, startDate, fiscalAddress, secondaryAddresses, phones, employeeCount, fiscalId, wallPic, profilPic, foundor, updated, updatedBy, lastActivity, enabled }),
  update)

/**
 * @api {delete} /businesses/:id Delete business
 * @apiName DeleteBusiness
 * @apiGroup Business
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Business not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
