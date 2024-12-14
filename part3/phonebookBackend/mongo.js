const mongoose=require('mongoose')

const password=process.argv[2]

const name=process.argv[3]

const number=process.argv[4]


const url=`mongodb+srv://blitzb4707912:${password}@cluster0.qwotl.mongodb.net/PhoneBook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema=new mongoose.Schema({
    name:String,
    number:String,
})

const Person=mongoose.model('Person',personSchema)

if(process.argv.length===3){
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}
else{
    const person=new Person({
        name:name,
        number:number,
    })
    person.save().then(result => {
        console.log('person saved to phonebook')
        console.log(result)
        mongoose.connection.close()
    })
}

