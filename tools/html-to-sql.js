//Author: Andrew Thayer
//Date: 10/10/23
//Purpose: Parse HTML document for glossary of words and definitions
//and generate an SQL file from the parsed information.

// Dependencies ////////////////////////////////////////////
// Allows for file system operations + parsing of HTML DOM
import {readFileSync, writeFileSync }
  from 'node:fs'
import { parse } from 'node-html-parser'

// Configuration ///////////////////////////////////////////

//Hard coded path to the book's HTML code
const srcPath = '/Users/andrewthayer/Documents/CVTC/SQC/sqc-project-athayer2/data/book.html'

//Hard coded path to the sql file generated by this code
const dstPath = '/Users/andrewthayer/Documents/CVTC/SQC/sqc-project-athayer2/docs/generated-schema.sql'

//Read the file into src variable + pass 
const src = readFileSync(srcPath, 'utf8')
const domRoot = parse(src)

//Reference to the DOM object with a class of index (the glossary of the book)
const glossaryDiv = domRoot.querySelector('.index')

//Remove spans
let removeMe = glossaryDiv.querySelectorAll('td span')
removeMe.forEach(span => {
  span.remove()
});

//Words and definitions into array, loop through the array odds being words, evens being definitions
let wordsAndDefs = glossaryDiv.querySelectorAll('td')

let words = []
let defs = []

//Loop through wordsAndDefs array, printing words to the words array and definitions to the defs array
for(let i = 0; i < wordsAndDefs.length; i++){
  if(wordsAndDefs[i].text == "" || wordsAndDefs[i].text == " "){
    wordsAndDefs.splice(i, 1)
  }
  if(i % 2 == 0){
    words.push(wordsAndDefs[i].text.replace('.', ""))
  }
  if(i % 2 != 0){
    defs.push(wordsAndDefs[i].text)
  }
}

for(let j = 0; j < words.length; j++){
  console.log(words[j] + ": ")
  console.log(defs[j])
}

//Writing sql header
const sqlHeader = 
`DROP TABLE IF EXISTS words;

CREATE TABLE words (
  id SERIAL PRIMARY KEY,
  word TEXT NOT NULL,
  definition TEXT NOT NULL
);
`

// Create an array to store SQL INSERT statements
const insertStatements = []

// Loop through 'words' and 'defs' arrays to generate INSERT statements
for (let i = 0; i < words.length; i++) {
  // Escape single quotes in definitions to avoid SQL injection
  const escapedDefinition = defs[i].replace(/'/g, "''")

  // Generate an INSERT statement for each word and definition
  const insertStatement = `INSERT INTO words (word, definition) VALUES ('${words[i]}', '${escapedDefinition}');`

  // Push the INSERT statement to the array
  insertStatements.push(insertStatement)
}

// Combine all INSERT statements into a single string
const sqlInserts = insertStatements.join('\n')

// Sanity check
//console.log(sqlHeader)
//console.log(sqlInserts)

//Write all SQL code to dstFile path
writeFileSync(dstPath, sqlHeader, 'utf8')
writeFileSync(dstPath, sqlInserts, { encoding: 'utf8', flag: 'a' })