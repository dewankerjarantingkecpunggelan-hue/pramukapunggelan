export default async function handler(req, res) {
  const { code } = req.query;

  const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbwUtQJ4wcMkp_OJl1e3eH8jbZ3BwO4ASqIUcvmpIB0nz62Zh812YwkTdpJ61pUux_c/exec";

  try {
    const response = await fetch(WEBAPP_URL);
    const json = await response.json();

    const found = json.find(r => r.short === code);

    if (found) {
      // Redirect ke URL asli
      res.writeHead(302, { Location: found.url });
      res.end();
    } else {
      // Redirect ke halaman 404 custom
      res.writeHead(302, { Location: "/404.html" });
      res.end();
    }

  } catch (err) {
    // Kalau API error → tetap ke 404
    res.writeHead(302, { Location: "/404.html" });
    res.end();
  }
}
