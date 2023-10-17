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
// Function to get all words and definitions from the database
async function getAllWordsAndDefinitions() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT word, definition FROM words');
    client.release();
    return result.rows;
  } catch (error) {
    console.error('Error retrieving words and definitions:', error);
    throw error;
  }
}

// Web server setup ////////////////////////////////////////
const app = express()
app.use(express.static('public'))

// Routes //////////////////////////////////////////////////
.get('/', function (req, res) {
  res.render('index')
})
.get('/about', function (req, res) {
  res.render('about')
})

// Ready for browsers to connect ///////////////////////////
const displayPort = function () {
  console.log('Listening on ' + PORT)
}

app.listen(PORT, displayPort)
