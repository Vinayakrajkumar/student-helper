const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');

const app = express();
app.use(cors());
app.use(express.json());

// Load your credentials.json file (ensure this file is in your Render root folder)
const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json", 
    scopes: "https://www.googleapis.com/auth/spreadsheets",
});

app.post('/submit', async (req, res) => {
    try {
        const { name, phone, studentClass } = req.body;
        const client = await auth.getClient();
        const googleSheets = google.sheets({ version: "v4", auth: client });

        await googleSheets.spreadsheets.values.append({
            spreadsheetId: "YOUR_SPREADSHEET_ID", // Get from your Sheet URL
            range: "Sheet1!A:C", 
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [[name, phone, studentClass]], 
            },
        });

        res.status(200).json({ message: "Data added successfully!" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
