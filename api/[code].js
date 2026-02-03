export default async function handler(req,res){
  const { code } = req.query;

  const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbwUtQJ4wcMkp_OJl1e3eH8jbZ3BwO4ASqIUcvmpIB0nz62Zh812YwkTdpJ61pUux_c/exec";

  const response = await fetch(WEBAPP_URL);
  const json = await response.json();

  const found = json.find(r=>r.short === code);
  if(found){
    res.writeHead(302, { Location: found.url });
    res.end();
  } else {
    res.status(404).send("PATANGATUS PAPAT a.k.a 404 keknya Link Hilang/ Rusak");
  }
}
