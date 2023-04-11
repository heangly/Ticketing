import mongoose from 'mongoose'

// An interface that describes the properties
// that are required to create a new User
interface UserAttrs {
  email: string
  password: string
}

// An interface that describes the properties
// that a User model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc
}

// AN interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  email: string
  password: string
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

// embedded custom function to schema
userSchema.statics.build = (attrs: UserAttrs) => new User(attrs)

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export { User }
