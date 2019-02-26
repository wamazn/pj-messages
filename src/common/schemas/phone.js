import { Schema } from 'mongoose'

const phoneTypes = ['work', 'home', 'mobile', 'fax']

const phoneSchema = new Schema({
    description: String,
    code: Number,
    type: {
        type: String,
        enum: phoneTypes
    },
    number: {
        type: String,
        required: true
    },
    internal: String,
    availablefrom: String,
    availableUntil: String
})

export { phoneSchema }