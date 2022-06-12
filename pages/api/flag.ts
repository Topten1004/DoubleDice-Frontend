import { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis';
import moment from 'moment';

const authorize = async () => {

  const auth = new google.auth.GoogleAuth({
    keyFile: "googlesheetCredentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
  })
  let authClient = await auth.getClient();

  if (authClient == null) {
    throw Error('authentication failed');
  }
  return authClient;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    // Process a POST request
    const authClient = await authorize();
    const spreadsheetId = "1DqI7lXyz0YPnT1pRlGdwuCzLEuYFk3cJOHrZvw0bsBw";
    const googleSheets = google.sheets({ version: "v4", auth: authClient })
    
    const params = {
      spreadsheetId,  
      auth: authClient,
    }; 

    const today = moment();
  
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
   
    // @ts-ignore
    const appendRows = await googleSheets.spreadsheets.values.append({
      ...params,
      range: "Sheet1!A:B",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      resource: {
        values: [[req.body.virtualFloorId, req.body.virtualFloorTitle, ip, req.body.reasons, req.body.account, today.format()]]
      }
    });
  
    if (appendRows) {
      return res.status(200).send({status: "success", message: "Data have been added to the sheet"})
    }
  } else {
    // Handle any other HTTP method
    res.status(400).send({ status: "failed", message: "Wrong HTTP Method" })
  }
}

export default handler;

