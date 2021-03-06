let bcrypt = require('bcryptjs')
let mongoose = require('mongoose')


let userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 1
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 32
  },
  galocation: {
    type: String,
    required: true,
    maxlength: 3
  },
  gacourse: {
    type: String,
    required: true,
    maxlength: 5
  },
  points: {
    type: Number,
    default: 0,
  }
})

// Use bcrypt to hash password
// userSchema.pre('save', function (next) {
//   this.password = bcrypt.hashSync(this.password, 12)
//   next()
// })
userSchema.pre('save', function (next) {
  console.log('Pre save function. mod:', this.isModified(), "isNew:", this.isNew)
  console.log('length of password', this.password.length)
  if(this.isNew){
    console.log('It was new, HASH NOW')
    // New, as opposed to modified
    this.password = bcrypt.hashSync(this.password, 12)
  }
  console.log('Passed the if statement')
  next()
})

// Ensure that password doesn't get sent with the rest of the data
userSchema.set('toJSON', {
  transform: (doc, user) => {
    delete user.password
    delete user.__v
    return user
  }
})

// Create a helper function to compare the password hashes
userSchema.methods.isValidPassword = function (typedPassword) {
  return bcrypt.compareSync(typedPassword, this.password)
}

module.exports = mongoose.model('User', userSchema)
