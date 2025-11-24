const fs = require('fs');

// Read the file
let content = fs.readFileSync('test-player-enhanced.html', 'utf-8');

// 1. Update the settings menu HTML structure to have tabs
const oldSettingsHTML = `<div class="jw-settings-menu jw-reset" style="display:none;">
                                <div class="jw-settings-topbar jw-reset">
                                    <div class="jw-settings-topbar-text jw-reset">Settings</div>
                                    <div class="jw-settings-topbar-buttons jw-reset">
                                        <div class="jw-icon jw-icon-inline jw-button-color jw-reset jw-settings-close" role="button" tabindex="0" aria-label="Close">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon" viewBox="0 0 240 240" focusable="false">
                                                <path d="M134.8,120l48.6-48.6c2-1.9,2.1-5.2,0.2-7.2c0,0-0.1-0.1-0.2-0.2l-7.4-7.4c-1.9-2-5.2-2.1-7.2-0.2c0,0-0.1,0.1-0.2,0.2L120,105.2L71.4,56.6c-1.9-2-5.2-2.1-7.2-0.2c0,0-0.1,0.1-0.2,0.2L56.6,64c-2,1.9-2.1,5.2-0.2,7.2c0,0,0.1,0.1,0.2,0.2l48.6,48.6l-48.6,48.6c-2,1.9-2.1,5.2-0.2,7.2c0,0,0.1,0.1,0.2,0.2l7.4,7.4c1.9,2,5.2,2.1,7.2,0.2c0,0,0.1-0.1,0.2-0.2l48.6-48.6l48.6,48.6c1.9,2,5.2,2.1,7.2,0.2c0,0,0.1-0.1,0.2-0.2l7.4-7.4c2-1.9,2.1-5.2,0.2-7.2c0,0-0.1-0.1-0.2-0.2L134.8,120z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div class="jw-settings-section-header jw-reset" style="padding:8px 16px;color:#888;font-size:11px;text-transform:uppercase;font-weight:600;">Quality</div>
                                <div class="jw-settings-submenu jw-settings-submenu-quality jw-reset"></div>
                                <div class="jw-settings-section-header jw-reset" style="padding:8px 16px;color:#888;font-size:11px;text-transform:uppercase;font-weight:600;border-top:1px solid rgba(255,255,255,0.1);">Playback Speed</div>
                                <div class="jw-settings-submenu jw-settings-submenu-speed jw-reset"></div>
                            </div>`;

const newSettingsHTML = `<div class="jw-settings-menu jw-reset" style="display:none;">
                                <div class="jw-settings-topbar jw-reset">
                                    <div class="jw-settings-tabs jw-reset">
                                        <div class="jw-settings-tab jw-settings-tab-quality active" data-tab="quality" role="button" tabindex="0">Quality</div>
                                        <div class="jw-settings-tab jw-settings-tab-speed" data-tab="speed" role="button" tabindex="0">Playback Speed</div>
                                    </div>
                                    <div class="jw-settings-topbar-buttons jw-reset">
                                        <div class="jw-icon jw-icon-inline jw-button-color jw-reset jw-settings-close" role="button" tabindex="0" aria-label="Close">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="jw-svg-icon" viewBox="0 0 240 240" focusable="false">
                                                <path d="M134.8,120l48.6-48.6c2-1.9,2.1-5.2,0.2-7.2c0,0-0.1-0.1-0.2-0.2l-7.4-7.4c-1.9-2-5.2-2.1-7.2-0.2c0,0-0.1,0.1-0.2,0.2L120,105.2L71.4,56.6c-1.9-2-5.2-2.1-7.2-0.2c0,0-0.1,0.1-0.2,0.2L56.6,64c-2,1.9-2.1,5.2-0.2,7.2c0,0,0.1,0.1,0.2,0.2l48.6,48.6l-48.6,48.6c-2,1.9-2.1,5.2-0.2,7.2c0,0,0.1,0.1,0.2,0.2l7.4,7.4c1.9,2,5.2,2.1,7.2,0.2c0,0,0.1-0.1,0.2-0.2l48.6-48.6l48.6,48.6c1.9,2,5.2,2.1,7.2,0.2c0,0,0.1-0.1,0.2-0.2l7.4-7.4c2-1.9,2.1-5.2,0.2-7.2c0,0-0.1-0.1-0.2-0.2L134.8,120z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div class="jw-settings-content jw-reset">
                                    <div class="jw-settings-panel jw-settings-panel-quality active" data-panel="quality">
                                        <div class="jw-settings-submenu jw-settings-submenu-quality jw-reset"></div>
                                    </div>
                                    <div class="jw-settings-panel jw-settings-panel-speed" data-panel="speed" style="display:none;">
                                        <div class="jw-settings-submenu jw-settings-submenu-speed jw-reset"></div>
                                    </div>
                                </div>
                            </div>`;

content = content.replace(oldSettingsHTML, newSettingsHTML);

console.log('✓ Updated settings menu HTML to use tabs');

// Write the modified content
fs.writeFileSync('test-player-enhanced.html', content, 'utf-8');

console.log('✓ Settings menu now has tabbed interface');
