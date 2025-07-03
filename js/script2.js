document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.getElementById('gallery-grid');
    const loadingIndicator = document.getElementById('loading-indicator');
    const galleryStats = document.getElementById('gallery-stats');
    const imageCount = document.getElementById('image-count');

    // Dynamically generate the image filenames from gallery1 (1).jpg to gallery1 (148).jpg
    const granyImages = Array.from({ length: 148 }, (_, i) => `gallery1 (${i+1}).jpg`);
    loadGallery(granyImages);

    function loadGallery(granyImages) {
        let loadedImages = 0;
        const totalImages = granyImages.length;
        const loadingText = loadingIndicator.querySelector('p');
        loadingText.textContent = `Loading gallery images... (0/${totalImages})`;

        granyImages.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');

            const img = document.createElement('img');
            img.src = `images/grany/${image}`;
            img.alt = image;
            img.loading = 'lazy';

            img.onload = () => {
                loadedImages++;
                loadingText.textContent = `Loading gallery images... (${loadedImages}/${totalImages})`;
                if (loadedImages === totalImages) {
                    setTimeout(() => {
                        loadingIndicator.style.display = 'none';
                        galleryGrid.style.display = 'grid';
                        galleryStats.style.display = 'block';
                        imageCount.textContent = totalImages;
                    }, 500);
                }
            };
            img.onerror = () => {
                loadedImages++;
                loadingText.textContent = `Loading gallery images... (${loadedImages}/${totalImages})`;
                if (loadedImages === totalImages) {
                    setTimeout(() => {
                        loadingIndicator.style.display = 'none';
                        galleryGrid.style.display = 'grid';
                        galleryStats.style.display = 'block';
                        imageCount.textContent = totalImages;
                    }, 500);
                }
            };

            galleryItem.appendChild(img);
            const caption = document.createElement('div');
            caption.classList.add('gallery-caption');
            caption.textContent = image.replace('.jpg', '').replace('IMG-', 'Image ');
            galleryItem.appendChild(caption);
            galleryGrid.appendChild(galleryItem);
            galleryItem.addEventListener('click', () => {
                openEnlargedView(img.src, caption.textContent, index, granyImages);
            });
        });
    }

    function openEnlargedView(imageSrc, captionText, currentIndex, granyImages) {
        let enlargedView = document.querySelector('.enlarged-view');

        if (enlargedView) enlargedView.remove();

        // Create enlarged view container
        enlargedView = document.createElement('div');
        enlargedView.classList.add('enlarged-view');

        // Create main image in a flex container
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('enlarged-image-container');
        const mainImg = document.createElement('img');
        mainImg.src = imageSrc;
        mainImg.alt = captionText;
        imageContainer.appendChild(mainImg);
        enlargedView.appendChild(imageContainer);

        // Create close button
        const closeBtn = document.createElement('button');
        closeBtn.classList.add('enlarged-close-btn');
        closeBtn.innerHTML = '×';
        closeBtn.title = 'Close';
        enlargedView.appendChild(closeBtn);

        // Create gallery grid for remaining images
        const galleryGridContainer = document.createElement('div');
        galleryGridContainer.classList.add('enlarged-gallery-grid');

        // Add header to the gallery grid
        const gridHeader = document.createElement('div');
        gridHeader.classList.add('enlarged-gallery-header');
        gridHeader.innerHTML = `
            <h3>Gallery Images</h3>
            <p>Click any image to view it in full size</p>
        `;
        galleryGridContainer.appendChild(gridHeader);

        // Add all images except the current one, all the same size
        granyImages.forEach((image, index) => {
            if (index !== currentIndex) {
                const gridItem = document.createElement('div');
                gridItem.classList.add('enlarged-gallery-item');

                const gridImg = document.createElement('img');
                gridImg.src = `images/grany/${image}`;
                gridImg.alt = image.replace('.jpg', '').replace('IMG-', 'Image ');

                gridItem.appendChild(gridImg);

                // Click event to switch main image
                gridItem.addEventListener('click', (e) => {
                    e.stopPropagation();
                    mainImg.src = gridImg.src;
                    mainImg.alt = gridImg.alt;

                    // Update active state
                    document.querySelectorAll('.enlarged-gallery-item').forEach(item => {
                        item.classList.remove('active');
                    });
                    gridItem.classList.add('active');

                    // Update header with current image info
                    const currentImageName = gridImg.alt;
                    gridHeader.querySelector('h3').textContent = currentImageName;
                    gridHeader.querySelector('p').textContent = `Image ${index + 1} of ${granyImages.length}`;
                });

                galleryGridContainer.appendChild(gridItem);
            }
        });

        enlargedView.appendChild(galleryGridContainer);
        document.body.appendChild(enlargedView);

        // Close functionality
        const closeEnlargedView = () => {
            enlargedView.remove();
        };

        closeBtn.addEventListener('click', closeEnlargedView);
        enlargedView.addEventListener('click', (e) => {
            if (e.target === enlargedView) {
                closeEnlargedView();
            }
        });

        // Keyboard support
        document.addEventListener('keydown', function handleKeydown(e) {
            if (e.key === 'Escape') {
                closeEnlargedView();
                document.removeEventListener('keydown', handleKeydown);
            }
        });
    }
});