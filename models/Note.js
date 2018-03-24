const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let NoteSchema = new Schema({
    title: {
        type: String,
        body: String
    }
})

let Note = mongoose.model('Note', NoteSchema);

module.exports = Note;