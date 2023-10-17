// Dependencies ////////////////////////////////////////////
import 'dotenv/config'
import express from 'express'
import pkg from 'pg'
const { Pool } = pkg

// Configuration ///////////////////////////////////////////
const PORT = process.env.PORT || 5163
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

// Query functions /////////////////////////////////////////


// Web server setup ////////////////////////////////////////
const app = express()
app.use(express.static('public'))

// Ready for browsers to connect ///////////////////////////
const displayPort = function () {
  console.log('Listening on ' + PORT)
}

app.listen(PORT, displayPort)
