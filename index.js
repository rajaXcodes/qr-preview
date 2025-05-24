const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Public QR image URL (Google Cloud Storage)

// Serve homepage
app.get('/', (req, res) => {
    res.send("Hello");
});

// Render QR Preview page with Open Graph tags
app.get('/qr-preview', (req, res) => {
  const url = "https://storage.googleapis.com/lokal-app-38e9f.appspot.com/lokalqr%2F1747808848396-qrcodeLK0000451747808848319.png";
  res.render('qr', {url});
});



// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
