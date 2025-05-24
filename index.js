const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Public QR image URL (Google Cloud Storage)
const imageUrl = "https://storage.googleapis.com/lokal-app-38e9f.appspot.com/lokalqr%2F1747808848396-qrcodeLK0000451747808848319.png";

// Serve homepage
app.get('/', (req, res) => {
  res.send("Hello");
});

// Render QR Preview page with Open Graph tags
app.get('/qr-preview', (req, res) => {
  const ogImageUrl = `${req.protocol}://${req.get('host')}/qr-image.png`;
  res.render('qr', { ogImageUrl });
});

// Proxy image route for OG usage
app.get('/qr-image.png', async (req, res) => {
  try {
    const response = await axios.get(imageUrl, { responseType: 'stream' });
    res.setHeader('Content-Type', 'image/png');
    response.data.pipe(res);
  } catch (err) {
    console.error("Failed to fetch image:", err.message);
    res.sendStatus(500);
  }
});

// Serve static files (optional)
app.use(express.static(path.join(__dirname, 'public')));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
