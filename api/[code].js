import { GoogleSpreadsheet } from "google-spreadsheet";

const SHEET_ID = "1IC6SyvFS6VIo04LVYL5_88ztese824idJk6K0RTNC7k";
const SHEET_NAME = "URL Shortener";
const CREDENTIALS = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);

export default async function handler(req,res){
  const { code } = req.query;
  const doc = new GoogleSpreadsheet(SHEET_ID);
  await doc.useServiceAccountAuth(CREDENTIALS);
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle[SHEET_NAME];
  const rows = await sheet.getRows();
  const row = rows.find(r=>r.ShortCode === code);

  if(row){
    return res.redirect(row.OriginalURL);
  } else {
    return res.status(404).send("Short URL not found");
  }
}
