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
const regSchema = new mongoose.Schema({
  time: {
    type: Number,
    required: true,
  },
  recipeName: {
    type: String,
    required: true,
  },
  recipeDetail:{
    type: String,
    reqired: true,
  }
});

const DB = mongoose.model('userDB', regSchema);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});
app.use(bodyParser.json());
app.post('/api/addRecipe', (req, res) => {
   console.log(req.body)
  //DB.create(req.body);
  res.send(JSON.stringify({
    data : req.body
  }))
  
});


//////////
/////////
server.listen(3000, () => {
  console.log("Express server listening on port " + 3000);
});