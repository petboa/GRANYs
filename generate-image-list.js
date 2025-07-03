const fs = require('fs');
const path = require('path');

// Function to generate image list
function generateImageList() {
    const granyFolderPath = path.join(__dirname, 'images', 'grany');
    
    try {
        // Read all files in the grany folder
        const files = fs.readdirSync(granyFolderPath);
        
        // Filter for image files only
        const imageFiles = files.filter(file => 
            /\.(jpg|jpeg|png|gif)$/i.test(file)
        );
        
        // Sort files for consistent ordering
        imageFiles.sort();
        
        // Generate the JavaScript array
        const imageArray = imageFiles.map(file => `'${file}'`).join(',\n        ');
        
        // Create the JavaScript code
        const jsCode = `// Auto-generated image list from grany folder
// Generated on: ${new Date().toISOString()}
// Total images: ${imageFiles.length}

const granyImages = [
        ${imageArray}
];`;
        
        // Write to a file
        fs.writeFileSync('image-list.js', jsCode);
        
        console.log(`✅ Successfully generated image list with ${imageFiles.length} images`);
        console.log('📁 Output file: image-list.js');
        console.log('📝 You can copy the array from image-list.js to js/script2.js');
        
        return imageFiles;
        
    } catch (error) {
        console.error('❌ Error reading grany folder:', error.message);
        return [];
    }
}

// Run the function
if (require.main === module) {
    generateImageList();
}

module.exports = generateImageList; 