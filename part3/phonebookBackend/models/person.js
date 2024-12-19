const mongoose=require('mongoose')

const personSchema=new mongoose.Schema({
    name:{
      type:String,
      minLength:5,
      required:true
    },
    number:{
      type:String,
      required:true,
      validate: {
        validator: function(v) {
          return /^\d{2,3}-\d{5,}$/.test(v)
        },
        message: props => `${props.value} is not a valid phone number! valid number may look like 00-000000`
      }
    },
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports=mongoose.model('Person',personSchema)