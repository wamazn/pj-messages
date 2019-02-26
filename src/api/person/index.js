import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Person, { schema } from './model'

const router = new Router()
const { firstName, lastName, 
  DOB, mainAddress, secondaryAddress, 
  phones, educations, works,
  skills, profileMedia, 
  wallMedia, bio } = schema.tree

/**
 * @api {post} /people Create person
 * @apiName CreatePerson
 * @apiGroup Person
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam firstName Person's firstName.
 * @apiParam lastName Person's lastName.
 * @apiParam DOB Person's DOB.
 * @apiParam mainAddress Person's mainAddress.
 * @apiParam secondaryAddress Person's secondaryAddress.
 * @apiParam phones Person's phones.
 * @apiParam educations Person's educations.
 * @apiParam works Person's works.
 * @apiParam skills Person's skills.
 * @apiParam profileMedia Person's profileMedia.
 * @apiParam wallMedia Person's wallMedia.
 * @apiParam modified Person's modified.
 * @apiParam bio Person's bio.
 * @apiSuccess {Object} person Person's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Person not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ firstName, lastName, DOB,
     mainAddress, secondaryAddress, 
     phones, educations, works, 
     skills, profileMedia, 
     wallMedia, bio }),
  create)

/**
 * @api {get} /people Retrieve people
 * @apiName RetrievePeople
 * @apiGroup Person
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of people.
 * @apiSuccess {Object[]} rows List of people.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query({
    enabled: true
  }),
  index)

/**
 * @api {get} /people/:id Retrieve person
 * @apiName RetrievePerson
 * @apiGroup Person
 * @apiSuccess {Object} person Person's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Person not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /people/:id Update person
 * @apiName UpdatePerson
 * @apiGroup Person
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam firstName Person's firstName.
 * @apiParam lastName Person's lastName.
 * @apiParam DOB Person's DOB.
 * @apiParam mainAddress Person's mainAddress.
 * @apiParam secondaryAddress Person's secondaryAddress.
 * @apiParam phones Person's phones.
 * @apiParam educations Person's educations.
 * @apiParam works Person's works.
 * @apiParam skills Person's skills.
 * @apiParam profileMedia Person's profileMedia.
 * @apiParam wallMedia Person's wallMedia.
 * @apiParam modified Person's modified.
 * @apiParam bio Person's bio.
 * @apiSuccess {Object} person Person's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Person not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ firstName, lastName, DOB, 
    mainAddress, secondaryAddress, 
    phones, educations, works, 
    skills, profileMedia, 
    wallMedia, bio }),
  update)

/**
 * @api {delete} /people/:id Delete person
 * @apiName DeletePerson
 * @apiGroup Person
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Person not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
