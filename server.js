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
// Web Server Setup ///////////////////////////////////////
const app = express();

  app.use(express.static('public'))
     .use(express.json())
     .use(express.urlencoded({ extended: true }))

     .set('views', 'views')
     .set('view engine', 'ejs')

// Routes //////////////////////////////////////////////////
.get('/', function (req, res) {
  res.render('index')
})
.get('/about', function (req, res) {
  res.render('about')
})

.get('/glossary', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT word, definition FROM words');
    client.release();

    const glossary = result.rows;

    // Render the 'glossary.ejs' template and pass the glossary data to it
    res.render('glossary.ejs', { glossary });
  } catch (error) {
    console.error('Error retrieving glossary:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Ready for browsers to connect ///////////////////////////
const displayPort = function () {
  console.log('Listening on ' + PORT)
}

app.listen(PORT, displayPort)
