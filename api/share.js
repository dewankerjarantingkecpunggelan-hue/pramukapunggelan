export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).send("ID tidak ditemukan");
  }

  const API = "https://script.google.com/macros/s/AKfycbwUg_yXbafgZNK2oTH0MVGYHl9lGsRkMbtoh8hkqU19LsvfXV-nIZU8pwX3qmS2_3X1/exec";

  try {
    const response = await fetch(`${API}?action=detail&id=${id}`);
    const data = await response.json();

    if (!data.data) {
      return res.status(404).send("Artikel tidak ditemukan");
    }

    const a = data.data;

    res.setHeader("Content-Type", "text/html");

res.send(`
<!DOCTYPE html>
<html>
<head>
<title>${a.judul}</title>

<meta property="og:title" content="${a.judul}">
<meta property="og:description" content="${a.isi.substring(0,150)}">
<meta property="og:image" content="${a.thumbnail}">
<meta property="og:url" content="https://pramukapunggelan.or.id/artikel?id=${id}">
<meta property="og:type" content="article">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${a.judul}">
<meta name="twitter:description" content="${a.isi.substring(0,150)}">
<meta name="twitter:image" content="${a.thumbnail}">

<meta http-equiv="refresh" content="2;url=/artikel?id=${id}">
</head>
<body>
Redirecting...
</body>
</html>
`);

  } catch (err) {
    res.status(500).send("Terjadi kesalahan server");
  }
}
