import mongoose, { Schema } from 'mongoose'
import { addressShema } from '../../common/schemas/location.js'
import { phoneSchema } from '../../common/schemas/phone.js'

const profileMediaSchema = new Schema({
  type: {
    type: String,
    enum: ['vid', 'pic']
  },
  url: {
    type: [String]
  }
})

const personSchema = new Schema({
  identity: {
    type: Schema.ObjectId,
    ref: 'Identity',
    required: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  DOB: {
    type: Date
  },
  mainAddress: {
    type: addressShema
  },
  secondaryAddress: {
    type: addressShema
  },
  phones: {
    type: [phoneSchema]
  },
  educations: {
    type: String
  },
  works: {
    type: String
  },
  skills: {
    type: [String]
  },
  profileMedia: {
    type: profileMediaSchema
  },
  wallMedia: {
    type: profileMediaSchema
  },
  bio: {
    type: String
  },
  enabled: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

personSchema.methods = {
  preview(extended) {
    const view = {
      name: this.firstName + ' ' + this.lastName,
      identity: this.identity.view(extended)
    }

    return extended ? {
      ...view,
      profileMedia: this.profileMedia,
      wallMedia: this.wallMedia
    }: view
  },
  view (full) {
    const view = {
      // simple view
      id: this.id,
      identity: this.identity.view(full),
      firstName: this.firstName,
      lastName: this.lastName,
      DOB: this.DOB,
      mainAddress: this.mainAddress,
      secondaryAddress: this.secondaryAddress,
      phones: this.phones,
      profileMedia: this.profileMedia,
      wallMedia: this.wallMedia
    }

    return full ? {
      ...view,
      bio: this.bio,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      educations: this.educations,
      works: this.works,
      skills: this.skills,
      modified: this.modified
      // add properties for a full view
    } : view
  },
  delete() {
    this.enabled = false
    return this.save()
  }
}
personSchema.plugin(mongooseKeywords, { paths: ['email', 'membername'] })
const model = mongoose.model('Person', personSchema)

export const schema = model.schema
export default model
