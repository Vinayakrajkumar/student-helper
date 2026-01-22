const express = require('express');
const cors = require('cors');
const { google } = require('googleapis'); //

const app = express();
app.use(cors()); // Allows Wix to talk to Render
app.use(express.json());

// Google Sheets Authentication
const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json", // Ensure this file is in your GitHub folder
    scopes: "https://www.googleapis.com/auth/spreadsheets",
});

app.post('/submit', async (req, res) => {
    try {
        const { name, phone, studentClass } = req.body;
        const client = await auth.getClient();
        const googleSheets = google.sheets({ version: "v4", auth: client });

        // Change 'YOUR_SHEET_ID' to the ID from your browser's URL bar
        await googleSheets.spreadsheets.values.append({
            spreadsheetId: "YOUR_SHEET_ID_HERE", 
            range: "Sheet1!A:C", // Adjust 'Sheet1' if your tab is named differently
            valueInputOption: "USER_ENTERED", //
            resource: {
                values: [[name, phone, studentClass]], // Matches your form fields
            },
        });

        res.status(200).json({ message: "Success" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
