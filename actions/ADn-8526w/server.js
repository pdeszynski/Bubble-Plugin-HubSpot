async function(properties, context) {
    const axios = require('axios');

    console.log(properties.contactinfo);

    const inputArray = properties.contactinfo;
    let outputJson = {
        properties: {}
    };

    inputArray.forEach(item => {
        outputJson.properties[item.key] = item.value;
    });

    console.log(JSON.stringify(outputJson, null, 2));

    // Set your HubSpot API key
    const apiKey = 'YOUR_HUBSPOT_API_KEY';

    // HubSpot API endpoint for creating contacts
    const url = 'https://api.hubapi.com/crm/v3/objects/contacts';

    try {
        const response = await axios.post(url, outputJson, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('Contact created:', response.data);
    } catch (error) {
        console.error('Error creating contact:', error);
    }
}