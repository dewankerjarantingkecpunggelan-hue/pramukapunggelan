export default async function handler(req, res) {
  const { id } = req.query;

  const gasURL =
    "https://script.google.com/macros/s/AKfycby8ooELYz10mWr_oPs4TVT8aiJjaFHOD2gV3ARaT4lzn2pADHKtBVnJg5jnEkp-owPM/exec/exec?id=" + id;

  const response = await fetch(gasURL);
  const html = await response.text();

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
}
