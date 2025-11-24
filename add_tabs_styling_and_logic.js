const fs = require('fs');

// Read the file
let content = fs.readFileSync('test-player-enhanced.html', 'utf-8');

// 1. Add CSS for tabs
const tabsCSS = `
        /* Settings Menu Tabs */
        .jw-settings-topbar {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            padding: 0 !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
        }

        .jw-settings-tabs {
            display: flex !important;
            flex: 1 !important;
        }

        .jw-settings-tab {
            flex: 1 !important;
            padding: 12px 16px !important;
            color: rgba(255, 255, 255, 0.6) !important;
            font-size: 13px !important;
            font-weight: 600 !important;
            cursor: pointer !important;
            transition: all 0.2s !important;
            border-bottom: 2px solid transparent !important;
            text-align: center !important;
        }

        .jw-settings-tab:hover {
            color: rgba(255, 255, 255, 0.9) !important;
            background: rgba(255, 255, 255, 0.05) !important;
        }

        .jw-settings-tab.active {
            color: #fff !important;
            border-bottom-color: #00a8ff !important;
        }

        .jw-settings-topbar-buttons {
            padding: 8px !important;
        }

        .jw-settings-content {
            max-height: 300px !important;
            overflow-y: auto !important;
        }

        .jw-settings-panel {
            display: none !important;
        }

        .jw-settings-panel.active {
            display: block !important;
        }
`;

// Find the tooltip CSS and add tabs CSS after it
const insertPoint = content.indexOf('        /* Vertical Volume Slider Styling */');
if (insertPoint !== -1) {
    content = content.slice(0, insertPoint) + tabsCSS + '\n' + content.slice(insertPoint);
    console.log('✓ Added tabs CSS styling');
}

// 2. Add JavaScript for tab switching
const tabSwitchingJS = `
            // ===============================================
            // Settings Menu Tab Switching
            // ===============================================
            const settingsTabs = playerContainer.querySelectorAll('.jw-settings-tab');
            const settingsPanels = playerContainer.querySelectorAll('.jw-settings-panel');

            settingsTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const tabName = tab.getAttribute('data-tab');
                    
                    // Remove active class from all tabs
                    settingsTabs.forEach(t => t.classList.remove('active'));
                    
                    // Add active class to clicked tab
                    tab.classList.add('active');
                    
                    // Hide all panels
                    settingsPanels.forEach(panel => {
                        panel.classList.remove('active');
                        panel.style.display = 'none';
                    });
                    
                    // Show selected panel
                    const selectedPanel = playerContainer.querySelector(\`.jw-settings-panel-\${tabName}\`);
                    if (selectedPanel) {
                        selectedPanel.classList.add('active');
                        selectedPanel.style.display = 'block';
                    }
                });
            });
`;

// Find where to insert the tab switching code (after updateBreakpoint)
const jsInsertPoint = content.indexOf('            // Initialize states');
if (jsInsertPoint !== -1) {
    content = content.slice(0, jsInsertPoint) + tabSwitchingJS + '\n' + content.slice(jsInsertPoint);
    console.log('✓ Added tab switching JavaScript');
}

// Write the modified content
fs.writeFileSync('test-player-enhanced.html', content, 'utf-8');

console.log('✓ Settings menu tabs are now fully functional');
