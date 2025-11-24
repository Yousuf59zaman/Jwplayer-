const fs = require('fs');

// Read the file
let content = fs.readFileSync('test-player-enhanced.html', 'utf-8');

// 1. Update fullscreen icon to simpler JW Player style
const oldFullscreenSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon jw-svg-icon-fullscreen-on" viewBox="0 0 240 240" focusable="false">
                                            <path d="M96.3,186.1c1.9,0,3.8,0.8,5.1,2.2l0,0c2.7,3,2.7,7.6,0,10.6c-1.4,1.4-3.2,2.2-5.1,2.2H65.6c-4,0-7.3-3.3-7.3-7.3v-30.7c0-4,3.3-7.3,7.3-7.3c4,0,7.3,3.3,7.3,7.3v21.7l32.6-32.6c1.5-1.3,3.4-2,5.4-2c4,0,7.3,3.3,7.3,7.3c0,2-0.8,3.9-2.2,5.3l-32.4,32.4H96.3z M189.7,38.2v30.7c0,4-3.3,7.3-7.3,7.3c-4,0-7.3-3.3-7.3-7.3V47.1l-32.6,32.6c-1.4,1.4-3.3,2.2-5.3,2.2c-4,0-7.3-3.3-7.3-7.3c0-2,0.8-3.9,2-5.4l32.6-32.6H143c-4,0-7.3-3.3-7.3-7.3c0-4,3.3-7.3,7.3-7.3h31.4c1.9,0,3.8,0.8,5.1,2.2c2.5,2.5,3.1,6.4,1.5,9.6C191,34.5,191,36.4,189.7,38.2L189.7,38.2z M189.7,201.8c0,4-3.3,7.3-7.3,7.3h-30.7c-4,0-7.3-3.3-7.3-7.3c0-4,3.3-7.3,7.3-7.3H173l-32.6-32.6c-2.8-2.9-2.8-7.4,0.1-10.2c1.4-1.4,3.3-2.1,5.2-2.1c2,0,3.9,0.8,5.3,2.2l32.6,32.6v-21.7c0-4,3.3-7.3,7.3-7.3c4,0,7.3,3.3,7.3,7.3V201.8z M96.3,38.2c0-4-3.3-7.3-7.3-7.3c-4,0-7.3,3.3-7.3,7.3v21.7L49.1,27.3c-2.9-2.8-7.4-2.8-10.2,0.1c-1.3,1.4-2.1,3.3-2.1,5.2c0,2,0.8,3.9,2.2,5.3l32.6,32.6H50.2c-4,0-7.3,3.3-7.3,7.3c0,4,3.3,7.3,7.3,7.3h30.7c4,0,7.3-3.3,7.3-7.3V38.2H96.3z"></path>
                                        </svg>`;

const newFullscreenSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon jw-svg-icon-fullscreen-on" viewBox="0 0 24 24" focusable="false">
                                            <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"></path>
                                        </svg>`;

content = content.replace(oldFullscreenSVG, newFullscreenSVG);

const oldFullscreenOffSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon jw-svg-icon-fullscreen-off" viewBox="0 0 240 240" focusable="false" style="display:none;">
                                            <path d="M189.7,192.3l-8.4-8.4c-1.4-1.4-3.8-1.4-5.3,0l-17.5,17.5l-14.4-14.4c-2-2-4-1.4-4.4,1.3l-8.4,50.1c-0.1,0.9,0.2,1.7,0.7,2.3c1.4,1.4,3,1.8,4.1,1.6l50.1-8.4c2.7-0.4,3.3-2.4,1.3-4.4L173,215.1l17.5-17.5C191.9,196.2,191.9,193.8,189.7,192.3z M47.7,47.7l8.4,8.4c1.4,1.4,3.8,1.4,5.3,0l17.5-17.5l14.4,14.4c2,2,4,1.4,4.4-1.3l8.4-50.1c0.1-0.9-0.2-1.7-0.7-2.3c-1.4-1.4-3-1.8-4.1-1.6L51.2,6.1c-2.7,0.4-3.3,2.4-1.3,4.4L64.3,24.9L46.8,42.4C45.4,43.8,45.4,46.2,47.7,47.7z"></path>
                                        </svg>`;

const newFullscreenOffSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon jw-svg-icon-fullscreen-off" viewBox="0 0 24 24" focusable="false" style="display:none;">
                                            <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"></path>
                                        </svg>`;

content = content.replace(oldFullscreenOffSVG, newFullscreenOffSVG);

console.log('✓ Updated fullscreen icons to JW Player style');

// 2. Add hover tooltip styles to CSS
const tooltipCSS = `
        /* Button Hover Tooltips */
        .jw-icon-tooltip {
            position: relative !important;
        }

        .jw-icon-tooltip::before {
            content: attr(aria-label) !important;
            position: absolute !important;
            bottom: 100% !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            background: rgba(0, 0, 0, 0.9) !important;
            color: #fff !important;
            padding: 6px 12px !important;
            border-radius: 4px !important;
            font-size: 13px !important;
            white-space: nowrap !important;
            opacity: 0 !important;
            visibility: hidden !important;
            transition: opacity 0.2s, visibility 0.2s !important;
            pointer-events: none !important;
            z-index: 1000 !important;
            margin-bottom: 8px !important;
        }

        .jw-icon-tooltip::after {
            content: '' !important;
            position: absolute !important;
            bottom: 100% !important;
            left: 50% !important;
            transform: translateX(-50%) translateY(8px) !important;
            border: 5px solid transparent !important;
            border-top-color: rgba(0, 0, 0, 0.9) !important;
            opacity: 0 !important;
            visibility: hidden !important;
            transition: opacity 0.2s, visibility 0.2s !important;
            pointer-events: none !important;
        }

        .jw-icon-tooltip:hover::before,
        .jw-icon-tooltip:hover::after {
            opacity: 1 !important;
            visibility: visible !important;
        }

        .jw-icon-playback::before {
            content: 'Play' !important;
        }

        .jw-state-playing .jw-icon-playback::before {
            content: 'Pause' !important;
        }
`;

// Find where to insert tooltip CSS (before closing style tag)
const cssInsertPoint = content.indexOf('        /* Vertical Volume Slider Styling */');
if (cssInsertPoint !== -1) {
    content = content.slice(0, cssInsertPoint) + tooltipCSS + '\n' + content.slice(cssInsertPoint);
    console.log('✓ Added hover tooltip styles');
}

// Write the modified content
fs.writeFileSync('test-player-enhanced.html', content, 'utf-8');

console.log('✓ All icon and tooltip updates complete');
