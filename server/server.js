const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');



// Static files
app.use(express.static(path.join('static')));
app.use(express.static(path.join('dist')));

app.use(cors());

app.get('/', (req,res) => {
  res.sendFile(path.resolve('./public/index.html'))
})

app.listen(3000)