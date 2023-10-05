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

//Remove spans
let removeMe = glossaryDiv.querySelectorAll('td span')
removeMe.forEach(span => {
  span.remove()
});

//words and definitions into array, loop through the array odds being words, evens being definitions
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


const sqlHeader = 
`DROP TABLE IF EXISTS chapters;

CREATE TABLE words (
  id SERIAL PRIMARY KEY,
  word TEXT NOT NULL,
  definition TEXT NOT NULL
);

INSERT INTO words (word, definition) VALUES
`

// // Output the data as SQL.
// const fd = openSync(dstPath, 'w')
// writeFileSync(fd, sqlHeader)
//closeSync(fd)