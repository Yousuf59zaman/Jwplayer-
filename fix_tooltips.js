const fs = require('fs');

// Read the file
let content = fs.readFileSync('test-player-enhanced.html', 'utf-8');

// Remove the tooltip CSS that affects all buttons and replace with specific ones
const oldTooltipCSS = `        /* Button Hover Tooltips */
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
        }`;

const newTooltipCSS = `        /* Button Hover Tooltips - Only for Settings, PiP, and Fullscreen */
        .jw-icon-settings.jw-icon-tooltip::before,
        .jw-icon-pip.jw-icon-tooltip::before,
        .jw-icon-fullscreen.jw-icon-tooltip::before {
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

        .jw-icon-settings.jw-icon-tooltip::after,
        .jw-icon-pip.jw-icon-tooltip::after,
        .jw-icon-fullscreen.jw-icon-tooltip::after {
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

        .jw-icon-settings.jw-icon-tooltip:hover::before,
        .jw-icon-settings.jw-icon-tooltip:hover::after,
        .jw-icon-pip.jw-icon-tooltip:hover::before,
        .jw-icon-pip.jw-icon-tooltip:hover::after,
        .jw-icon-fullscreen.jw-icon-tooltip:hover::before,
        .jw-icon-fullscreen.jw-icon-tooltip:hover::after {
            opacity: 1 !important;
            visibility: visible !important;
        }`;

content = content.replace(oldTooltipCSS, newTooltipCSS);

// Write the modified content
fs.writeFileSync('test-player-enhanced.html', content, 'utf-8');

console.log('✓ Removed tooltips from volume and play/pause buttons');
console.log('✓ Tooltips now only show for Settings, PiP, and Fullscreen buttons');
