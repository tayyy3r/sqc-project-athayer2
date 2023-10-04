// Dependencies ////////////////////////////////////////////
import { strict as assert } from 'node:assert'
import { closeSync, openSync, readFileSync, writeFileSync }
  from 'node:fs'
import { parse } from 'node-html-parser'

// Configuration ///////////////////////////////////////////
const srcPath = '/Users/andrewthayer/Documents/CVTC/SQC/sqc-project-athayer2/data/book.html'
const dstPath = '/Users/andrewthayer/Documents/CVTC/SQC/sqc-project-athayer2/docs/generated-schema.sql'
const src = readFileSync(srcPath, 'utf8')
const domRoot = parse(src)

const glossaryDiv = domRoot.querySelector('.index')

//words into array, loop through the array odds being words, evens being definitions
const words = glossaryDiv.querySelectorAll('td')
//const words = glossaryDiv.querySelectorAll('td')[0].text

for(let i = 0; i < words.length; i+= 1){
  if(i % 2 == 0){
    console.log("Word: " + words[i].text.replace('.', ''))
  }
  if(i % 2 != 0){
    console.log("Definition: " + words[i].text)
  }
}



const sqlHeader = 
`DROP TABLE IF EXISTS chapters;

CREATE TABLE words (
  id SERIAL PRIMARY KEY,
  word TEXT NOT NULL,
  definition TEXT NOT NULL
);

INSERT INTO words (word, definition) VALUES
`
// console.log(srcPath)
// console.log(dstPath)

//returns the contents of the glossary
//console.log(glossaryDiv.innerHTML)

//returns 736 meaning there should be 368 words
//console.log(words)

// // Utility functions ///////////////////////////////////////
// const extractWord = function () {
//   const word = 
//   return word
// }

// const extractDef = function () {
//   const def = "" /*querySelectorAll() passing in tds?*/
//   return def
// }




// // Output the data as SQL.
// const fd = openSync(dstPath, 'w')
// writeFileSync(fd, sqlHeader)
