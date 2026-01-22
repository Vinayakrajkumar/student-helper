import { fetch } from 'wix-fetch'; //

// This function sends data to your Render server
export async function sendToGoogleSheet(data) {
    // Replace with your actual Render URL
    const url = "https://student-helper-bjie.onrender.com/submit"; 

    const options = {
        method: 'POST', //
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) //
    };

    const response = await fetch(url, options); //
    
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error("Failed to reach Render server");
    }
}
