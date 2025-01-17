const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data.json');


const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  /*.then(() => {
    // Run your code here, after you have insured that the connection was made
  const recipe1 = data[0];
  
  const prz = Recipe.create(recipe1);
  return prz;
  }) */
  .then((createdRecipe) => {
   // console.log('createdRecipe', createdRecipe); 

    const prz = Recipe.insertMany(data)
    return prz;
  })
  .then ((createdRecipies) => {
   console.log('createdRecipies', createdRecipies);

    const prz = Recipe.find({title: "Rigatoni alla Genovese"});
    return prz;
  })
  .then((foundRecipe) => {
    console.log('foundRecipe', foundRecipe);

    const prz = Recipe.findByIdAndUpdate(
      foundRecipe[0]._id, {duration: 220}, { new: true}
    );
    return prz;
  })
  .then((updatedRecipe) => {
    console.log('updatedRecipe', updatedRecipe);

    const prz = Recipe.deleteOne({title: "Carrot Cake"});
    return prz;
  })
  .then((deletedRecipe) => {
    console.log('deletedRecipe', deletedRecipe);
    mongoose.connection.close();
  })
  .finally(() => {
    console.log('connection closed');
  })
  .catch(error => { 
    console.error('Error connecting to the database', error);
  });
