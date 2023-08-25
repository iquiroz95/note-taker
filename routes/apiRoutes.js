const router = require('express').Router();
const uniqid = require('uniqid');

const store = require('../db/store');

// requesting the existing notes

router.get('/notes', (req, res) => {
    store
        .getNotes()
        .then(notes => {
            res.json(notes)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// posting note function route 
router.post('/notes', (req, res) => {
    const { title, text } = req.body; // Destructure title and text from req.body

    if (!title || !text) {
        return res.status(400).json({ error: 'Title and text are required.' });
    }

    const newNote = {
        title,
        text,
        id: uniqid() // Generate a new unique ID
    };

    store
        .addNote(newNote)
        .then(note => {
            res.json(note);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});


// delete note function route

router.delete('/notes/:id', (req, res) => {
    store
        .removeNote(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch(err => res.status(500).json(err))
})

module.exports = router;