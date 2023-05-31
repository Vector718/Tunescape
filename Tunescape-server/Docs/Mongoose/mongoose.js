
const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/fruitsDB'
mongoose.connect(url).then(() => console.log('Connected!'));

//creating a schema which is basically the structure of the entries in that particular schema.
const fruitSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  review: String
});
//created a model which has collection names as "Fruits" (plural) and follows the fruitSchema.
const Fruit = mongoose.model("Fruit", fruitSchema)

//insertion in db collection of Fruit
const apple = new Fruit({
  name: "Apple",
  rating: 7,
  review: "Pretty solid as a fruit."
});

//pushing and saving it 
// apple.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  FavFruit: fruitSchema
})

const Person = new mongoose.model("person", personSchema)

const Soubhik = new Person({
  name: "Soubhik",
  age: 18,
})

Soubhik.save()

// Bulk insertion of objects/Data:
const Saswat = new Person({
  name: "Saswat PB",
  age: 19
})


const Maheswar = new Person({
  name: "Maheswar M",
  age: 19
})

// Person.insertMany([Saswat,Maheswar])
//no need to save.

//  Reading from Db:
//Note: Model.find() doesnt take callback anymore,use .then method
// Person.find().then((persons => {
//   if (persons) {
//     persons.forEach(person => {
//       console.log(person.name);
//   })
// }
// }).cath(err =>{
//   console.log(err);
// })


// Person.find()
//   .then(persons => {
//     if (persons.length > 0) {
//       persons.forEach(person => {
//         console.log(person.name);
//       });
//     } else {
//       console.log('No persons found.');
//     }
//   })
//   .catch(err => {
//     console.log(err);
//   });

// data validation:
// Many other types bhi h
// const fruitSchema = new mongoose.Schema({
//   name: String,
//   rating:{
//     type:Number,
//     min:1,
//     max:10,
//   },
//   review: String
// });

// Fruit.updateOne( {
//   _id: "647633f29c643f33340fb59f"},
//   {
//   name: 'Peach',
//   rating: 3,
//   review: 'Descent fruit'
//   }
// ).then(()=>{
//   console.log("Successfully updated fruitsDB");
// }).catch(err=>{console.log(err)})

// Fruit.updateOne(
//   { _id: "647633f29c643f33340fb59f" }, // Filter criteria
//   {
//     name: 'Peach',
//     rating: 3,
//     review: 'Descent fruit'
//   } // Fields to update
// )
//   .then(() => {
//     console.log("Successfully updated fruitsDB");
//   })
//   .catch(err => {
//     console.log(err);
//   });

// Fruit.deleteOne(
//   { name: "Peach" }
// ).then(() => {
//   console.log("Deleted Succesfuully!")
// }).catch(err => console.log(err))


// Person.deleteMany({ name: 'Soubhik' })
// .then(() => console.log("Done"))
// .catch((err) => { console.log(err) })


// Embedding objects:

const Nandini = new Person({
    name:"Nandini",
    age:19,
    fruit:{
      name:"Guava",
      rating:4,
      review:"Solid Fruit"
    }
})

Nandini.save()
Person.find().then(person=>console.log(person))