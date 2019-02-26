import mongoose, { Schema } from 'mongoose'

const businessSchema = new Schema({
  creator: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String
  },
  startDate: {
    type: String
  },
  fiscalAddress: {
    type: String
  },
  secondaryAddresses: {
    type: String
  },
  phones: {
    type: String
  },
  employeeCount: {
    type: String
  },
  fiscalId: {
    type: String
  },
  wallPic: {
    type: String
  },
  profilPic: {
    type: String
  },
  foundor: {
    type: String
  },
  updated: {
    type: String
  },
  updatedBy: {
    type: String
  },
  lastActivity: {
    type: String
  },
  enabled: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

businessSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      creator: this.creator.view(full),
      name: this.name,
      startDate: this.startDate,
      fiscalAddress: this.fiscalAddress,
      secondaryAddresses: this.secondaryAddresses,
      phones: this.phones,
      employeeCount: this.employeeCount,
      fiscalId: this.fiscalId,
      wallPic: this.wallPic,
      profilPic: this.profilPic,
      foundor: this.foundor,
      updated: this.updated,
      updatedBy: this.updatedBy,
      lastActivity: this.lastActivity,
      enabled: this.enabled,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Business', businessSchema)

export const schema = model.schema
export default model
