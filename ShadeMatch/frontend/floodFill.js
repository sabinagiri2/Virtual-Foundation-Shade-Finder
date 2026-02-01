// Function to fill the drawn area based on the provided path
function floodFill(mask, path) {
    // Exit the function if no path is provided
    if (path.length === 0) return;

    // Create a temporary canvas for flood fill operations
    const offCanvas = document.createElement('canvas');
    offCanvas.width = canvas.width; // Set the width of the temporary canvas to match the main canvas
    offCanvas.height = canvas.height; // Set the height of the temporary canvas ""
    const offCtx = offCanvas.getContext('2d'); // Get the 2D drawing context of the temporary canvas

    // Set the fill style to white
    offCtx.fillStyle = 'white';

    // Start a new path for the shape to be drawn
    offCtx.beginPath();
    // Move the path to the starting point of the drawn shape
    offCtx.moveTo(path[0].x, path[0].y);

    // Iterate through each point in the path
    for (const point of path) {
        // Draw a line to the current point
        offCtx.lineTo(point.x, point.y);
    }

    // Close the path to form a complete shape
    offCtx.closePath();
    // Fill the shape with the fill style (white)
    offCtx.fill();

    // Get the image data from the temporary canvas
    const fillData = offCtx.getImageData(0, 0, canvas.width, canvas.height);

   

    // Iterate through each pixel in the image data
    for (let i = 0; i < fillData.data.length; i += 4) {
        // Check if the pixel is white (i.e., part of the drawn shape)
        if (fillData.data[i] === 255) {
            // Set the alpha channel of the corresponding pixel in the mask to fully opaque
            mask.data[i + 3] = 255;
            
        }
    }

   
}
