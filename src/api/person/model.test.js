import { Person } from '.'
import { User } from '../user'

let user, person

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  person = await Person.create({ identity: user, firstName: 'test', lastName: 'test', DOB: 'test', mainAddress: 'test', secondaryAddress: 'test', phones: 'test', educations: 'test', works: 'test', skills: 'test', profilePic: 'test', wallPic: 'test', modified: 'test', bio: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = person.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(person.id)
    expect(typeof view.identity).toBe('object')
    expect(view.identity.id).toBe(user.id)
    expect(view.firstName).toBe(person.firstName)
    expect(view.lastName).toBe(person.lastName)
    expect(view.DOB).toBe(person.DOB)
    expect(view.mainAddress).toBe(person.mainAddress)
    expect(view.secondaryAddress).toBe(person.secondaryAddress)
    expect(view.phones).toBe(person.phones)
    expect(view.educations).toBe(person.educations)
    expect(view.works).toBe(person.works)
    expect(view.skills).toBe(person.skills)
    expect(view.profilePic).toBe(person.profilePic)
    expect(view.wallPic).toBe(person.wallPic)
    expect(view.modified).toBe(person.modified)
    expect(view.bio).toBe(person.bio)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = person.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(person.id)
    expect(typeof view.identity).toBe('object')
    expect(view.identity.id).toBe(user.id)
    expect(view.firstName).toBe(person.firstName)
    expect(view.lastName).toBe(person.lastName)
    expect(view.DOB).toBe(person.DOB)
    expect(view.mainAddress).toBe(person.mainAddress)
    expect(view.secondaryAddress).toBe(person.secondaryAddress)
    expect(view.phones).toBe(person.phones)
    expect(view.educations).toBe(person.educations)
    expect(view.works).toBe(person.works)
    expect(view.skills).toBe(person.skills)
    expect(view.profilePic).toBe(person.profilePic)
    expect(view.wallPic).toBe(person.wallPic)
    expect(view.modified).toBe(person.modified)
    expect(view.bio).toBe(person.bio)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
