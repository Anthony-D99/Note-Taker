const express = require('express');
const path = require('path');
let notesDb=require(`./db/db.json`);
const fs=require(`fs`);
const { v4: uuidv4 } = require('uuid');


const PORT = 3001;

const app = express();

//middleaware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//default "home page"
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
// notes html
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET request for notes
app.get('/api/notes', (req, res) => {
  // Inform the client
  //res.json(`${req.method} request received to get notes`);
  notesDb = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"))
  // readFromFile(notesDb).then((data) => res.json(JSON.parse(data)));
 res.status(200).json(notesDb);
  // Log our request to the terminal
  console.info(`${req.method} request received to get notes`);
 
});


// POST request for notes
app.post('/api/notes', (req, res) => {
  // Inform the client that their POST request was received
  res.json(`${req.method} request received to add a note`);

  // Log our request to the terminal
  console.info(`${req.method} request received to add a note`);
  
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;
  // If all the required properties are present
    if (title && text) {
  // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    
    // Obtain existing notes
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);

        // Add a new note
        parsedNotes.push(newNote);

        // Write updated note back to the file
        fs.writeFile('./db/db.json', JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated notes!')
        );
      }
    });

  // const response = {
  //     status: 'success',
  //     body: newNote,
  //   };

  //   console.log(response);
    res.status(200)
  } else {
    res.status(500).json('Error in posting note');
  }



});

// DELETE request for upvotes
app.delete('/api/notes/:id', (req, res) => {
  // Inform the client
  res.json(`${req.method} request received to delete note`);

  // Log our request to the terminal
  console.info(`${req.method} request received to delete note`);
  

  
});


app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);