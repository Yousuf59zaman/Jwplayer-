const fs = require('fs');

// Read the file
let content = fs.readFileSync('test-player-enhanced.html', 'utf-8');

// JavaScript code to add
const functionalityJS = `
            // ===============================================
            // Video click to play/pause
            // ===============================================
            video.addEventListener('click', () => {
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
            });

            // ===============================================
            // Keyboard Controls
            // ===============================================
            document.addEventListener('keydown', (e) => {
                // Ignore if user is typing in an input field
                if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                    return;
                }

                switch(e.key) {
                    case ' ':
                    case 'Spacebar': // For older browsers
                        e.preventDefault();
                        if (video.paused) {
                            video.play();
                        } else {
                            video.pause();
                        }
                        break;

                    case 'ArrowLeft':
                        e.preventDefault();
                        // Seek backward 5 seconds
                        video.currentTime = Math.max(0, video.currentTime - 5);
                        break;

                    case 'ArrowRight':
                        e.preventDefault();
                        // Seek forward 5 seconds
                        video.currentTime = Math.min(video.duration || 0, video.currentTime + 5);
                        break;

                    case 'ArrowUp':
                        e.preventDefault();
                        // Increase volume by 10%
                        video.volume = Math.min(1, video.volume + 0.1);
                        video.muted = false;
                        updateVolumeState();
                        updateVolumeSlider();
                        break;

                    case 'ArrowDown':
                        e.preventDefault();
                        // Decrease volume by 10%
                        video.volume = Math.max(0, video.volume - 0.1);
                        updateVolumeState();
                        updateVolumeSlider();
                        break;
                }
            });

            // ===============================================
            // Volume Slider Functionality
            // ===============================================
            const volumeSliderContainer = playerContainer.querySelector('.jw-volume-slider-container');
            const volumeSlider = playerContainer.querySelector('.jw-volume-slider');
            const volumeProgress = playerContainer.querySelector('.jw-volume-progress');
            const volumeKnob = playerContainer.querySelector('.jw-volume-knob');

            // Update volume slider visual state
            function updateVolumeSlider() {
                const volume = video.muted ? 0 : video.volume;
                const heightPercent = volume * 100;
                volumeProgress.style.height = heightPercent + '%';
                volumeKnob.style.bottom = heightPercent + '%';
            }

            // Set volume from slider position
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
            }

            // Volume slider drag handling
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
            });

            // Update volume slider when volume changes
            video.addEventListener('volumechange', updateVolumeSlider);

            // Initialize volume slider
            updateVolumeSlider();
`;

// Find the line with playerContainer.addEventListener('mouseleave' and insert code before the closing brace
const searchPattern = `            playerContainer.addEventListener('mouseleave', () => {
                if (!video.paused) {
                    playerContainer.classList.add('jw-flag-user-inactive');
                }
            });
        }`;

const replacement = `            playerContainer.addEventListener('mouseleave', () => {
                if (!video.paused) {
                    playerContainer.classList.add('jw-flag-user-inactive');
                }
            });
${functionalityJS}
        }`;

content = content.replace(searchPattern, replacement);

// Write the modified content
fs.writeFileSync('test-player-enhanced.html', content, 'utf-8');

console.log('✓ Added keyboard controls and volume slider functionality');
