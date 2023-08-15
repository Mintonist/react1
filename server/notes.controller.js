const fs = require('fs/promises');
const path = require('path');
//const chalk = require('chalk');

const dpPath = path.join(__dirname, 'db.json');

async function addNote(title) {
  const notes = await getNotes();
  const note = { title, id: Date.now().toString() };
  notes.push(note);
  await fs.writeFile(dpPath, JSON.stringify(notes));
  console.log(/* chalk.green */ 'Note was added!');
}

async function editNote(id, title) {
  const notes = await getNotes();
  const note = notes.find((note) => {
    return note.id === id;
  });

  note.title = title;

  await fs.writeFile(dpPath, JSON.stringify(notes));
  console.log(/* chalk.green */ 'Note was edited!');
}

async function removeNote(id) {
  let notes = await getNotes();
  let has = false;
  notes = notes.filter((note) => {
    if (note.id === id) has = true;
    return note.id !== id;
  });
  await fs.writeFile(dpPath, JSON.stringify(notes));
  has
    ? console.log(/* chalk.green */ `Note ${id} was removed!`)
    : console.log(/* chalk.green */ `Note ${id} was not found!`);
}

async function getNotes() {
  const notes = await fs.readFile(dpPath, { encoding: 'utf-8' });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  console.log(/* chalk.blue */ 'List of notes:');
  notes.forEach((note) => {
    console.log(/* chalk.yellow */ note.id, /* chalk.orange */ note.title);
  });
}

module.exports = { addNote, removeNote, getNotes, editNote };
