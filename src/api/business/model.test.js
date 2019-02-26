import { Business } from '.'
import { User } from '../user'

let user, business

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  business = await Business.create({ creator: user, name: 'test', startDate: 'test', fiscalAddress: 'test', secondaryAddresses: 'test', phones: 'test', employeeCount: 'test', fiscalId: 'test', wallPic: 'test', profilPic: 'test', foundor: 'test', updated: 'test', updatedBy: 'test', lastActivity: 'test', enabled: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = business.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(business.id)
    expect(typeof view.creator).toBe('object')
    expect(view.creator.id).toBe(user.id)
    expect(view.name).toBe(business.name)
    expect(view.startDate).toBe(business.startDate)
    expect(view.fiscalAddress).toBe(business.fiscalAddress)
    expect(view.secondaryAddresses).toBe(business.secondaryAddresses)
    expect(view.phones).toBe(business.phones)
    expect(view.employeeCount).toBe(business.employeeCount)
    expect(view.fiscalId).toBe(business.fiscalId)
    expect(view.wallPic).toBe(business.wallPic)
    expect(view.profilPic).toBe(business.profilPic)
    expect(view.foundor).toBe(business.foundor)
    expect(view.updated).toBe(business.updated)
    expect(view.updatedBy).toBe(business.updatedBy)
    expect(view.lastActivity).toBe(business.lastActivity)
    expect(view.enabled).toBe(business.enabled)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = business.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(business.id)
    expect(typeof view.creator).toBe('object')
    expect(view.creator.id).toBe(user.id)
    expect(view.name).toBe(business.name)
    expect(view.startDate).toBe(business.startDate)
    expect(view.fiscalAddress).toBe(business.fiscalAddress)
    expect(view.secondaryAddresses).toBe(business.secondaryAddresses)
    expect(view.phones).toBe(business.phones)
    expect(view.employeeCount).toBe(business.employeeCount)
    expect(view.fiscalId).toBe(business.fiscalId)
    expect(view.wallPic).toBe(business.wallPic)
    expect(view.profilPic).toBe(business.profilPic)
    expect(view.foundor).toBe(business.foundor)
    expect(view.updated).toBe(business.updated)
    expect(view.updatedBy).toBe(business.updatedBy)
    expect(view.lastActivity).toBe(business.lastActivity)
    expect(view.enabled).toBe(business.enabled)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
