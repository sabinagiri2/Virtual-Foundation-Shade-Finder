// Function to log the RGB data of the selected part using a mask
function logRGBData(mask) {
    // Get the image data from the canvas, which contains the RGB values of all pixels
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let rgbList = []; // List to store RGB data of selected pixels
    let pixelCount = 0; // Counter for the number of selected pixels

   
    // Iterate through each pixel in the mask
    for (let i = 0; i < mask.data.length; i += 4) {
        // Check if the alpha channel of the mask pixel is fully opaque
        if (mask.data[i + 3] === 255) {
            // Get the red channel value of the corresponding pixel from the canvas image data
            const r = imageData.data[i];
            // Get the green channel value of the corresponding pixel from the canvas image data
            const g = imageData.data[i + 1];
            // Get the blue channel value of the corresponding pixel from the canvas image data
            const b = imageData.data[i + 2];

            rgbList.push([r,g,b]); // Add RGB value to the list
            pixelCount++; // Increment pixel count
        }
    }

   


    // Log RGB data and number of selected pixels (optional)
    console.log("RGB data of selected pixels:", rgbList);
    console.log(`Number of selected pixels: ${pixelCount}`);


  
    fetch('http://127.0.0.1:5000/upload-rgb', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({   /*which converts the rgbList and pixelCount variables (JavaScript objects) into a JSON string to be sent to the server.*/
            rgbList: rgbList,
            pixelCount: pixelCount
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Server response:', data);
        // No automatic redirection here
    })
    .catch(error => {
        console.error('Error sending RGB data to server:', error);
    });
}

// Handle "See the Result" button click
document.getElementById('result').addEventListener('click', function() {
    window.location.href = "/result";
    
});


 

