import mongoose, { Schema } from 'mongoose'

const pointSchema = new Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  });

  const polygonSchema = new Schema({
    type: {
      type: String,
      enum: ['Polygon'],
      required: true
    },
    coordinates: {
      type: [[[Number]]], // Array of arrays of arrays of numbers
      required: true
    }
  });

  const addressShema = new Schema({
      city: String,
      country: String,
      state: String,
      stateCode: String,
      countryISOCode: String,
      zipOrPostal: String,
      streetName: String,
      streetNumber: Number,
      floor: String,
      apart: String,
      building: String,
      neighborhood: String,
      location: pointSchema
  })

  addressShema.methods = {
      view(full) {
        const addView = {
            street: this.streetName,
            number: streetNumber,
            city: this.city,
            location: this.location.coordinates
        }

        return full ? {
            ...addView,
            floor: this.floor,
            apart: this.apart,
            building: this.building,
            neighborhood: this.neighborhood,
            zipOrPostal: this.zipOrPostal,
            state: this.state,
            stateCode: this.stateCode,
            country: this.country,
            countryCode: this.countryCode
        } : addView

      },
      preview(extended) {
        
        const addPreview = {
            street: this.streetName,
            number: streetNumber,
            city: this.city
        }

        return extended ? {
            ...addPreview,
            floor: this.floor,
            apart: this.apart,
            zipOrPostal: this.zipOrPostal
        } : addPreview
      }
  }


export { pointSchema, addressShema, polygonSchema }