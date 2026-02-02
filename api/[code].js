// api/[code].js
import fetch from "node-fetch"; // kalau pakai Node <18

export default async function handler(req, res) {
  const { code } = req.query;

  // URL Apps Script lama
  const webAppUrl = `https://script.google.com/macros/s/AKfycbwUtQJ4wcMkp_OJl1e3eH8jbZ3BwO4ASqIUcvmpIB0nz62Zh812YwkTdpJ61pUux_c/exec?s=${code}`;
  
  const response = await fetch(webAppUrl);
  const text = await response.text();

  // Kalau Apps Script pakai redirect via <script>
  const match = text.match(/window.location="(.+)"/);
  if(match) return res.redirect(match[1]);

  // Kalau tidak ada, kirim teks JSON
  res.status(200).send(text);
}
