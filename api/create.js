import { GoogleSpreadsheet } from "google-spreadsheet";

const SHEET_ID = "1IC6SyvFS6VIo04LVYL5_88ztese824idJk6K0RTNC7k";
const SHEET_NAME = "URL Shortener";

// Gunakan credentials.json yang di-upload ke Vercel
const CREDENTIALS = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);

export default async function handler(req, res){
  if(req.method !== "POST") return res.status(405).send("Method not allowed");

  const { url, short } = req.body;
  if(!url || !short) return res.status(400).send("Invalid request");

  const doc = new GoogleSpreadsheet(SHEET_ID);
  await doc.useServiceAccountAuth(CREDENTIALS);
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle[SHEET_NAME];
  const rows = await sheet.getRows();

  if(rows.find(r => r.ShortCode === short)) return res.status(400).send("Shortcode already exists");

  await sheet.addRow({
    ShortCode: short,
    OriginalURL: url,
    CreatedAt: new Date().toISOString()
  });

  res.send("OK");
}
