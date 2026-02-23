export default async function handler(req, res) {
  const { id } = req.query;

  const gasURL =
    "https://script.google.com/macros/s/AKfycbx-e8JzVEnob7b7QXvoOWnuo5oXi2s4m-Qk5xZQQp0OidxFkCbuRXCjDAWHdNom5LhD/exec?id=" + id;

  const response = await fetch(gasURL);
  const html = await response.text();

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
}
