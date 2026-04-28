// ============================================================
// server.js — Practice 10: Simulating a POST Request
// Builds on Practice 9 by adding a POST route for /api/notes
// ============================================================

// Import the Express framework
const express = require('express');

// Create an instance of an Express application
const app = express();


// ── Middleware ───────────────────────────────────────────────
// express.json() parses incoming request bodies that are
// formatted as JSON. Without this, req.body would be undefined.
app.use(express.json());


// ── GET /api/message (from Practice 9) ──────────────────────
// Returns a simple confirmation that the server is running.
app.get('/api/message', (req, res) => {
    res.json({ message: 'Hello from your first Express API!' });
});


// ── POST /api/notes (Practice 10) ───────────────────────────
// Accepts a JSON body with a "name" and "note" field.
// Validates that both fields are present before responding.
//
// Success response (201 Created):
//   { message: "Note received!", data: { name, note } }
//
// Error response (400 Bad Request) if either field is missing:
//   { error: "Both name and note are required." }
app.post('/api/notes', (req, res) => {

    // Destructure name and note out of the request body
    const { name, note } = req.body;

    // Validation: both fields must be present and not empty
    if (!name || !note) {
        return res.status(400).json({ error: 'Both name and note are required.' });
    }

    // If validation passes, send back a 201 (Created) response
    // with a confirmation message and the data that was received
    res.status(201).json({
        message: 'Note received!',
        data: { name, note }
    });

});


// ── Start the server ─────────────────────────────────────────
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
    console.log('GET  → http://localhost:3000/api/message');
    console.log('POST → http://localhost:3000/api/notes');
});