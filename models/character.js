import mongoose from "mongoose"

const characterSchema = new mongoose.Schema({
  firstName: { type: String, required: true, maxlength: 20 },
  lastName: { type: String, required: true, maxlength: 20 },
  image: { type: String },
  battles: [String],
  biography: { type: String },
  hometown: { type: String, required: true },
  house: { type: String, required: true },
  owner: {type: mongoose.ObjectId, ref: 'User', required: true}
})

characterSchema.set('toJSON', {
  virtuals: true
})


// virtual field for displaying the character house information when we toggle into their individual page.

characterSchema
  .virtual('associatedHouse', {
    ref: 'House',
    localField: 'house',
    foreignField: 'houseName'
  })

export default mongoose.model('Character', characterSchema)