const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));

let colors = [];

app.get('/color', (req, res) => {
    rollbar.info("Colors recieved")
    res.status(200).send(colors)
})

app.post('/color', (req, res) => {
   let {color} = req.body

   const index = colors.findIndex(colorElement => {
       return colorElement === color
   })

   try {
       if (index === -1 && color !== '') {
           rollbar.log("Someone added color")
           colors.push(color)
           res.status(200).send(colors)
       } else {
           rollbar.error("Color already exists")
           res.status(400).send('That color already exists.')
       }
   } catch (err) {
       console.log(err)
   }
})

app.delete('/color/:index', (req, res) => {
    const targetIndex = +req.params.index
    
    colors.splice(targetIndex, 1)
    res.status(200).send(colors)
})

app.use(rollbar.errorHandler())

const port = process.env.PORT || 4050;

app.listen(port, () => {
    console.log(`Up on port ${port}`);
});

