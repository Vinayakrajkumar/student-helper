const express = require('express'); //
const cors = require('cors'); //
const { google } = require('googleapis'); //

const app = express();
app.use(cors()); // Allows Wix to talk to Render
app.use(express.json()); // Helps the server read the form data

// 1. Setup Google Auth
const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json", // Make sure this file is in your GitHub/Render folder
    scopes: "https://www.googleapis.com/auth/spreadsheets",
});

// 2. The Route that Wix Automation calls
app.post('/submit', async (req, res) => {
    try {
        console.log("Data received from Wix Automation:", req.body); // Shows in Render Logs

        // Wix Automations often send data inside a 'data' or 'payload' object
        const name = req.body.name || "No Name";
        const phone = req.body.phone || "No Phone";
        const studentClass = req.body.class || "No Class";

        const client = await auth.getClient();
        const googleSheets = google.sheets({ version: "v4", auth: client });

        // 3. Append the data to Google Sheets
        await googleSheets.spreadsheets.values.append({
            spreadsheetId: "371Ee199389C4A93849Ee35B8A15B7Ca1", // Your Sheet ID
            range: "Sheet1!A:C", // Change 'Sheet1' if your tab has a different name
            valueInputOption: "USER_ENTERED", //
            resource: {
                values: [[name, phone, studentClass]], // Data to add
            },
        });

        res.status(200).send({ message: "Success! Row added to Google Sheets." });
    } catch (error) {
        console.error("Error updating sheet:", error);
        res.status(500).send(error);
    }
});

// Use port 10000 for Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
