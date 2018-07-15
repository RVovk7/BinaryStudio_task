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
  dateModify: Number,
  recipeName: String,
  recipeDetail: String

});
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
  DB.create(req.body).then(() =>
    recipeDB
    .then(data =>
      data.map(e => e.data[e.data.length - 1])
    )
    .then(data => res.send(JSON.stringify(
      data,
    )))
    .catch(er => console.error(er))
  )
});

app.get('/api/getRecipe', (req, res) => {
  recipeDB
    .then(data =>
      data.map(e => e.data[e.data.length - 1])
    )
    .then(data => res.send(JSON.stringify(
      data,
    )))
    .catch(er => console.error(er))
});

app.post('/api/deleteRecipe', (req, res) => {
  console.log(req.body);
  DB.remove({
      time: req.body.data
    })
    .then(() =>
      recipeDB
      .then(data =>
        data.map(e => e.data[e.data.length - 1])
      )
      .then(data => res.send(JSON.stringify(
        data,
      )))
      .catch(er => console.error(er))
    )
});
//////////
/////////
server.listen(3000, () => {
  console.log("Express server listening on port " + 3000);
});