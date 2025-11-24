const fs = require('fs');

// Read the file
let content = fs.readFileSync('test-player-enhanced.html', 'utf-8');

// 1. Add volume slider CSS (before first </style>)
const volumeSliderCSS = `
        /* Vertical Volume Slider Styling */
        .jw-icon-volume {
            position: relative !important;
        }

        .jw-volume-slider-container {
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
        }

        .jw-volume-slider {
            width: 32px !important;
            height: 100px !important;
            position: relative !important;
            cursor: pointer !important;
        }

        .jw-volume-rail {
            position: absolute !important;
            width: 4px !important;
            height: 100% !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            background: rgba(255, 255, 255, 0.3) !important;
            border-radius: 2px !important;
        }

        .jw-volume-progress {
            position: absolute !important;
            width: 4px !important;
            bottom: 0 !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            background: #00a8ff !important;
            border-radius: 2px !important;
            transition: height 0.1s !important;
        }

        .jw-volume-knob {
            position: absolute !important;
            width: 12px !important;
            height: 12px !important;
            background: #fff !important;
            border-radius: 50% !important;
            left: 50% !important;
            transform: translate(-50%, 50%) !important;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3) !important;
            transition: bottom 0.1s !important;
        }
`;

// Find first </style> and add CSS before it
const firstStyleClose = content.indexOf('    </style>');
if (firstStyleClose !== -1) {
    content = content.slice(0, firstStyleClose) + volumeSliderCSS + '\n' + content.slice(firstStyleClose);
    console.log('✓ Added volume slider CSS');
}

// 2. Add volume slider HTML after volume-100 SVG
const volumeSliderHTML = `
                                        <!-- Vertical Volume Slider -->
                                        <div class="jw-volume-slider-container jw-reset">
                                            <div class="jw-volume-slider jw-reset">
                                                <div class="jw-volume-rail jw-reset"></div>
                                                <div class="jw-volume-progress jw-reset" style="height:100%"></div>
                                                <div class="jw-volume-knob jw-reset" style="bottom:100%"></div>
                                            </div>
                                        </div>`;

// Find volume-100 SVG and add slider after it
const volumeSVGPattern = /<svg[^>]*class="jw-svg-icon jw-svg-icon-volume-100"[^>]*>[\s\S]*?<\/svg>/;
const match = content.match(volumeSVGPattern);
if (match) {
    const insertPos = content.indexOf(match[0]) + match[0].length;
    content = content.slice(0, insertPos) + volumeSliderHTML + content.slice(insertPos);
    console.log('✓ Added volume slider HTML');
}

// Write the modified content
fs.writeFileSync('test-player-enhanced.html', content, 'utf-8');

console.log('✓ File updated successfully');
