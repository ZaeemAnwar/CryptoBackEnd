const express = require('express')
const app = express()
var cors = require('cors');
const Axios = require('axios')
const bodyParser = require('body-parser');

// Perhaps introduce more specific error messages if env variables not found, i.e. user forgot to set up .env from .env.example
console.log("Reading values from .env file to initialize backend, make sure .env file is filled with correct variables for environment")
console.log("Server being deployed on port: ", process.env.PORT)

//Ensuring app uses cors
app.use(cors())

//Parse requests easier
app.use(bodyParser.json());


app.get("/api/crypto", (req, res)=>{
    console.log("Recieved request to get updated crypto data")
    Axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?sort=volume_24h', {
          headers: {
            'Accepts': 'application/json',
            'Accept-Encoding': 'deflate, gzip',
            'X-CMC_PRO_API_KEY': process.env.CRYPTO_API_KEY,
          },
        }).then(response => {
            console.log("GET was successful, attempting to return to client")
            res.send(response.data)
        })
        .catch(err => {
            console.log("GET Ran into issue")
            console.log("Issue details: ", err)
            });
})

// WIP: Used to get the logos for the crypto companies (as well as any other meta data)
app.get("/api/crypto/logos", (req, res)=>{
  console.log("Recieved request to get updated crypto data")
  console.log ("request shape is : " , JSON.stringify(req.query))
  const ids = req.query.id.split(',').map(id => parseInt(id, 10));

  Axios.get('https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?id='+ids, {
        headers: {
          'Accepts': 'application/json',
          'Accept-Encoding': 'deflate, gzip',
          'X-CMC_PRO_API_KEY': process.env.CRYPTO_API_KEY,
        },
      }).then(response => {
          console.log("GET LOGOS was successful, attempting to return to client " + JSON.stringify(response.data))
          res.send(response.data)
      })
      .catch(err => {
          console.log("GET LOGOS Ran into issue")
          console.log("Issue details: ", err)
          });
})


app.listen(process.env.PORT, ()=>{console.log("Server started on port " + process.env.PORT)})