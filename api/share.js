export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).send("ID tidak ditemukan");
  }

  const API = "https://script.google.com/macros/s/AKfycby8ooELYz10mWr_oPs4TVT8aiJjaFHOD2gV3ARaT4lzn2pADHKtBVnJg5jnEkp-owPM/exec";

  try {
    const response = await fetch(`${API}?action=detail&id=${id}`);
    const data = await response.json();

    if (!data.data) {
      return res.status(404).send("Artikel tidak ditemukan");
    }

    const a = data.data;

    res.setHeader("Content-Type", "text/html");

    res.send(`
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>${a.judul}</title>

<meta property="og:title" content="${a.judul}">
<meta property="og:description" content="${a.isi.replace(/<[^>]+>/g, "").slice(0,160)}">
<meta property="og:image" content="${a.thumbnail}">
<meta property="og:url" content="https://pramukapunggelan.or.id/artikel.html?id=${id}">
<meta property="og:type" content="article">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${a.judul}">
<meta name="twitter:description" content="${a.isi.replace(/<[^>]+>/g, "").slice(0,160)}">
<meta name="twitter:image" content="${a.thumbnail}">
</head>
<body>
<script>
location.href="/artikel.html?id=${id}";
</script>
</body>
</html>
    `);

  } catch (err) {
    res.status(500).send("Terjadi kesalahan server");
  }
}
