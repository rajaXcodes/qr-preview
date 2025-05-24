const express = require('express');
const path = require('path');

const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route to render the QR preview
app.get('/',(req,res)=>{
    res.send("hello");
})
// const dynamicContent = {
//     title : "Join qr",
//     url : "https://storage.googleapis.com/lokal-app-38e9f.appspot.com/lokalqr%2F1747808848396-qrcodeLK0000451747808848319.png"
// }
const url = "https://storage.googleapis.com/lokal-app-38e9f.appspot.com/lokalqr%2F1747808848396-qrcodeLK0000451747808848319.png";
app.get('/qr-preview', (req, res) => {
    
    res.render('qr',{url});
});

// Serve static files (if needed)
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
