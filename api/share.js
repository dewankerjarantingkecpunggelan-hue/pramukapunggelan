export default async function handler(req, res) {
  try {
    const { id } = req.query;

    const r = await fetch("https://script.google.com/macros/s/AKfycby8ooELYz10mWr_oPs4TVT8aiJjaFHOD2gV3ARaT4lzn2pADHKtBVnJg5jnEkp-owPM/exec?id=" + id);
    const data = await r.json();

    res.setHeader("Content-Type", "text/html");

    res.send(`
    <html><head>
    <meta property="og:title" content="${data.judul}">
    <meta property="og:description" content="${data.deskripsi}">
    <meta property="og:image" content="${data.thumbnail}">
    <meta property="og:type" content="article">
    </head>
    <body>
    <script>location.href="/artikel.html?id=${id}"</script>
    </body></html>
    `);

  } catch (e) {
    res.status(500).send("Share API Error: " + e.message);
  }
}
