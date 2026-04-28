// ============================================================
// server.js — Practice 12: Environment Variables
// Builds on Practice 11 by reading config from process.env
// ============================================================

const express = require('express');
const app     = express();

app.use(express.json());


// ── Environment Variable ─────────────────────────────────────
// process.env.GREETING reads the GREETING variable set on the
// deployment platform (Render, AWS, etc.).
// The || operator provides a fallback value for local testing,
// so the app still works when no variable is set.

const greeting = process.env.GREETING || 'Hello from your deployed app!';


// ── GET /api/message ─────────────────────────────────────────
// Now returns the value of the GREETING environment variable
// instead of a hardcoded string.

app.get('/api/message', (req, res) => {
    res.json({ message: greeting });
});


// ── POST /api/notes (from Practice 10) ──────────────────────

app.post('/api/notes', (req, res) => {
    const { name, note } = req.body;

    if (!name || !note) {
        return res.status(400).json({ error: 'Both name and note are required.' });
    }

    res.status(201).json({
        message: 'Note received!',
        data: { name, note }
    });
});


// ── Start the server ─────────────────────────────────────────
// process.env.PORT is also an environment variable — most cloud
// platforms set this automatically. We fall back to 3000 locally.

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
    console.log('GREETING is set to: ' + greeting);
});
