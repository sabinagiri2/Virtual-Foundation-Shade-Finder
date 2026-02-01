// Initialization code
const upload = document.getElementById('upload'); // Get the file input element for uploading images
const canvas = document.getElementById('canvas'); // Get the canvas element where the image will be drawn
const ctx = canvas.getContext('2d'); // Get the 2D rendering context for the canvas
let image = new Image(); // Create a new Image object to hold the uploaded image
let mask; // Variable to hold the mask data for the drawn areas
let selectedPart = null; // Variable to track the selected part (cheek, eye, lips, hair)


// Fixed dimensions for canvas
const maxCanvasWidth = 600;
const maxCanvasHeight = 600;

// Event listener for file upload
upload.addEventListener('change', (e) => {
    const file = e.target.files[0]; // Get the uploaded file from the file input
    const reader = new FileReader(); // Create a FileReader to read the image file

    // When the file is read, load it into the image object
    reader.onload = (event) => {
        image.onload = () => {
             

            // Calculate the scaling ratio to fit the image within the fixed canvas size
         let scale = Math.min(maxCanvasWidth / image.width, maxCanvasHeight / image.height);
         // Set canvas dimensions based on the scaled image size
         canvas.width = image.width * scale;
         canvas.height = image.height * scale;

             
            ctx.drawImage(image, 0, 0,canvas.width, canvas.height); // Draw the image onto the canvas
            mask = ctx.createImageData(canvas.width, canvas.height); // Create a new image data object for the mask
        };
        image.src = event.target.result; // Set the image source to the file data URL
    };
    reader.readAsDataURL(file); // Read the file as a Data URL
});

// Event listener for the select area button
document.getElementById('area').addEventListener('click', () => {
    selectedPart = 'area'; // Set selectedPart to 'area' when the button is clicked
});

const buttons = document.querySelectorAll('.part-btn'); // Get all part selection buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active')); // Remove 'active' class from all buttons
        button.classList.add('active'); // Add 'active' class to the clicked button
        selectedPart = button.id.replace('select-', ''); // Update selectedPart based on the clicked button's ID
    });
});

// Event listener for the submit button
document.getElementById('submit').addEventListener('click', async() => {
  // Collect RGB data and pixel count from your drawing logic
  const { rgbList, pixelCount } = getSelectedPixels(); 

  console.log('Data to be sent:', { rgbList, pixelCount }); // Debugging line to check data

   
    const extractedImage = extractPart(mask, selectedPart); // Extract the selected part from the image
    if (extractedImage) { // Check if extraction was successful
        console.log("RGB data of selected part:",`${selectedPart}`); // Log a message indicating RGB data logging
        logRGBData(mask); // Log the RGB data of the selected part
        downloadImage(extractedImage, `${selectedPart}.png`); // Download the extracted image as a PNG file
    } else {
        console.error("Failed to extract the image part."); // Log an error if extraction fails
    }

    clearMarks(); // Clear the canvas and reset the mask

    buttons.forEach(button => button.classList.remove('active')); // Remove 'active' class from all buttons after submission
      
});




// Function to clear marks from the canvas
function clearMarks() {
    mask = ctx.createImageData(canvas.width, canvas.height); // Create a new image data object to clear the mask
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
    ctx.drawImage(image, 0, 0,canvas.width, canvas.height); // Redraw the original image onto the canvas
    selectedPart = null; // Reset the selected part
}


function getSelectedPixels() {
    
    const rgbList = [];
    const pixelCount = rgbList.length;

    return {
        rgbList: rgbList,
        pixelCount: pixelCount
    };
}
