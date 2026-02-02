// api/[code].js
export default async function handler(req, res) {
  const { code } = req.query;

  const webAppUrl = "https://script.google.com/macros/s/AKfycbwUtQJ4wcMkp_OJl1e3eH8jbZ3BwO4ASqIUcvmpIB0nz62Zh812YwkTdpJ61pUux_c/exec?s=" + code;
  
  const response = await fetch(webAppUrl);
  const text = await response.text();

  // kalau Apps Script redirect pakai <script> window.location
  if(text.includes("window.location")){
    const urlMatch = text.match(/window.location="(.+)"/);
    if(urlMatch) return res.redirect(urlMatch[1]);
  }

  res.status(200).send(text);
}
