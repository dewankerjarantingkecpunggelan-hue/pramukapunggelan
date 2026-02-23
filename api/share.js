export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).send("ID tidak ditemukan");
  }

  try {
    const response = await fetch(`https://script.google.com/macros/s/AKfycby8ooELYz10mWr_oPs4TVT8aiJjaFHOD2gV3ARaT4lzn2pADHKtBVnJg5jnEkp-owPM/exec?id=${id}`);
    const data = await response.json();

    if (!data || !data.judul) {
      return res.status(404).send("Artikel tidak ditemukan");
    }

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta property="og:title" content="${data.judul}" />
      <meta property="og:description" content="${data.deskripsi}" />
      <meta property="og:image" content="${data.thumbnail}" />
      <meta property="og:url" content="https://pramukapunggelan.vercel.app/api/share?id=${id}" />
      <meta property="og:type" content="article" />
      <meta http-equiv="refresh" content="0; url=https://pramukapunggelan.vercel.app/artikel.html?id=${id}">
    </head>
    <body>
      Redirecting...
    </body>
    </html>
    `;

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(html);

  } catch (error) {
    res.status(500).send("Terjadi kesalahan server");
  }
}
