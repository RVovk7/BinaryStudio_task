const express = require('express'),
  http = require('http'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost:3001/recipeDB')
  .then(() => console.log('DB running on port 3001'))
  .catch((e) => {
    console.error(`DB fail: ${e}`)
  });
const app = express(),
  server = http.createServer(app);
/////mongoose schema
const recipeSchema = new mongoose.Schema({
  time: Number,
  timeModify: Number,
  recipeName: String,
  recipeDetail: String

});
let dataToClient = [];
const DB = mongoose.model('recipeDB', recipeSchema);
const recipeDB = DB.aggregate([{
  $group: {
    _id: '$time',
    data: {
      $push: {
        time: '$time',
        dateModify: '$dateModify',
        recipeName: '$recipeName',
        recipeDetail: '$recipeDetail',
      },
    },
  },

}]);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});
app.use(bodyParser.json());
app.post('/api/addRecipe', (req, res) => {
  DB.create(req.body);
  res.send(JSON.stringify({
    data: req.body
  }))
});
app.get('/api/getRecipe', (req, res) => {
  /*   res.send(JSON.stringify({
      data,
    })) */
  recipeDB
    .then(data =>
      data.map(e=> e.data[e.data.length-1])
    )
    .then(data => res.send(JSON.stringify({
      data,
    })))
    .catch(er => console.error(er))



});


//////////
/////////
server.listen(3000, () => {
  console.log("Express server listening on port " + 3000);
});