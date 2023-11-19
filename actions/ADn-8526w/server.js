async function(properties, context) {
    const axios = require('axios');

    const inputArray = properties.contactinfo;
    let outputJson = {
        properties: {}
    };

    inputArray.forEach(item => {
        outputJson.properties[item.key] = item.value;
    });

    console.log(JSON.stringify(outputJson, null, 2));

    // Set your HubSpot API key
    const apiKey = context.keys['API Key'];

    // HubSpot API endpoint for creating contacts
    const url = 'https://api.hubapi.com/crm/v3/objects/contacts';

    try {
        const response = await axios.post(url, outputJson, {
            headers: {
                Authorization: `${apiKey}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('Contact created:', response.data);

        // Ensure to extract the ID correctly based on the actual response structure
        const contactId = response.data.id; // Adjust this as per the actual structure

        return {
            hsid: contactId, // Assuming 'id' is the correct field from the response
            error: false,
            errormessage: null
        };
        
    } catch (error) {
        console.error('Error creating contact:', error);
        return {
            hsid: null,
            error: true,
            errormessage: error.message
        };
    }
}