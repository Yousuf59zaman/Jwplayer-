const fs = require('fs');

// Read the file
let content = fs.readFileSync('test-player-enhanced.html', 'utf-8');

// 1. Update the CSS to improve hover behavior
const oldCSS = `        .jw-volume-slider-container {
            position: absolute !important;
            bottom: 100% !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            background: rgba(0, 0, 0, 0.9) !important;
            border-radius: 4px !important;
            padding: 8px !important;
            margin-bottom: 8px !important;
            opacity: 0 !important;
            visibility: hidden !important;
            transition: opacity 0.2s, visibility 0.2s !important;
            pointer-events: none !important;
            z-index: 100 !important;
        }

        .jw-icon-volume:hover .jw-volume-slider-container,
        .jw-volume-slider-container:hover {
            opacity: 1 !important;
            visibility: visible !important;
            pointer-events: all !important;
        }`;

const newCSS = `        .jw-volume-slider-container {
            position: absolute !important;
            bottom: 100% !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            background: rgba(0, 0, 0, 0.9) !important;
            border-radius: 4px !important;
            padding: 8px !important;
            margin-bottom: 5px !important;
            opacity: 0 !important;
            visibility: hidden !important;
            transition: opacity 0.15s, visibility 0.15s !important;
            pointer-events: none !important;
            z-index: 100 !important;
        }

        .jw-volume-slider-container.show {
            opacity: 1 !important;
            visibility: visible !important;
            pointer-events: all !important;
        }`;

content = content.replace(oldCSS, newCSS);

// 2. Update the JavaScript to handle hover with delay
const oldJS = `            // Update volume slider when volume changes
            video.addEventListener('volumechange', updateVolumeSlider);

            // Initialize volume slider
            updateVolumeSlider();`;

const newJS = `            // Update volume slider when volume changes
            video.addEventListener('volumechange', updateVolumeSlider);

            // Initialize volume slider
            updateVolumeSlider();

            // ===============================================
            // Volume Slider Show/Hide with Smooth Transition
            // ===============================================
            let volumeSliderTimeout;

            function showVolumeSlider() {
                clearTimeout(volumeSliderTimeout);
                volumeSliderContainer.classList.add('show');
            }

            function hideVolumeSlider() {
                volumeSliderTimeout = setTimeout(() => {
                    volumeSliderContainer.classList.remove('show');
                }, 200);
            }

            // Show slider when hovering over volume button
            volumeButton.addEventListener('mouseenter', showVolumeSlider);
            volumeButton.addEventListener('mouseleave', hideVolumeSlider);

            // Keep slider visible when hovering over it
            volumeSliderContainer.addEventListener('mouseenter', showVolumeSlider);
            volumeSliderContainer.addEventListener('mouseleave', hideVolumeSlider);`;

content = content.replace(oldJS, newJS);

// Write the modified content
fs.writeFileSync('test-player-enhanced.html', content, 'utf-8');

console.log('✓ Fixed volume slider hover behavior');
