const fs = require('fs');

// Read the file
let content = fs.readFileSync('test-player-enhanced.html', 'utf-8');

// Find and replace the setVolumeFromSlider function
const oldFunction = `            // Set volume from slider position
            function setVolumeFromSlider(event) {
                const rect = volumeSlider.getBoundingClientRect();
                const y = event.clientY - rect.top;
                const height = rect.height;
                // Invert Y because slider goes from bottom to top
                const volume = Math.max(0, Math.min(1, 1 - (y / height)));
                
                video.volume = volume;
                video.muted = volume === 0;
                updateVolumeState();
                updateVolumeSlider();
            }`;

const newFunction = `            // Set volume from slider position
            function setVolumeFromSlider(event) {
                const rect = volumeSlider.getBoundingClientRect();
                const y = event.clientY - rect.top;
                const height = rect.height;
                // Invert Y because slider goes from bottom to top
                // Click at top (y=0) should be 100%, click at bottom (y=height) should be 0%
                const volume = Math.max(0, Math.min(1, 1 - (y / height)));
                
                if (!isNaN(volume) && isFinite(volume)) {
                    video.volume = volume;
                    if (volume > 0) {
                        video.muted = false;
                    }
                    updateVolumeState();
                    updateVolumeSlider();
                }
            }`;

content = content.replace(oldFunction, newFunction);

// Also update the drag handlers to ensure they work correctly
const oldDragSetup = `            // Volume slider drag handling
            let isVolumeDragging = false;

            volumeSlider.addEventListener('mousedown', (e) => {
                isVolumeDragging = true;
                setVolumeFromSlider(e);
                e.stopPropagation();
            });

            document.addEventListener('mousemove', (e) => {
                if (isVolumeDragging) {
                    setVolumeFromSlider(e);
                }
            });

            document.addEventListener('mouseup', () => {
                if (isVolumeDragging) {
                    isVolumeDragging = false;
                }
            });`;

const newDragSetup = `            // Volume slider drag handling
            let isVolumeDragging = false;

            volumeSlider.addEventListener('mousedown', (e) => {
                isVolumeDragging = true;
                setVolumeFromSlider(e);
                e.preventDefault();
                e.stopPropagation();
            });

            volumeSlider.addEventListener('click', (e) => {
                setVolumeFromSlider(e);
                e.preventDefault();
                e.stopPropagation();
            });

            document.addEventListener('mousemove', (e) => {
                if (isVolumeDragging) {
                    setVolumeFromSlider(e);
                    e.preventDefault();
                }
            });

            document.addEventListener('mouseup', () => {
                if (isVolumeDragging) {
                    isVolumeDragging = false;
                }
            });`;

content = content.replace(oldDragSetup, newDragSetup);

// Write the modified content
fs.writeFileSync('test-player-enhanced.html', content, 'utf-8');

console.log('✓ Fixed volume slider click positioning');
console.log('✓ Volume now sets correctly when clicking at any position');
