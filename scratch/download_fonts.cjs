const fs = require('fs');
const path = require('path');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const fonts = [
    { name: 'LTDEV001.ttf', url: 'https://www.purandaradasa.org/assets/fonts/LTDEV001.ttf' },
    { name: 'LTDEV001.woff2', url: 'https://www.purandaradasa.org/assets/fonts/LTDEV001.woff2' },
    { name: 'LTDEV001.woff', url: 'https://www.purandaradasa.org/assets/fonts/LTDEV001.woff' },
    { name: 'Times-Symbol.ttf', url: 'https://www.purandaradasa.org/assets/fonts/Times-Symbol.ttf' },
    { name: 'Times-Symbol.woff2', url: 'https://www.purandaradasa.org/assets/fonts/Times-Symbol.woff2' },
    { name: 'Times-Symbol.woff', url: 'https://www.purandaradasa.org/assets/fonts/Times-Symbol.woff' },
    { name: 'tunga.ttf', url: 'https://www.purandaradasa.org/assets/fonts/tunga.ttf' }
];

const targetDir = path.join('d:', 'NISHMITHA TELIVITAL', 'Antigravity', 'Purandaradasa', 'public', 'fonts');

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

async function downloadFont(font) {
    try {
        console.log(`Downloading ${font.name} from ${font.url}...`);
        const response = await fetch(font.url);
        if (!response.ok) {
            console.error(`Failed to download ${font.name}: ${response.statusText}`);
            return;
        }
        const buffer = await response.arrayBuffer();
        const destPath = path.join(targetDir, font.name);
        fs.writeFileSync(destPath, Buffer.from(buffer));
        console.log(`Successfully saved ${font.name} to ${destPath}`);
    } catch (err) {
        console.error(`Error downloading ${font.name}:`, err.message);
    }
}

async function run() {
    for (const font of fonts) {
        await downloadFont(font);
    }
    console.log('All font downloads completed!');
}

run();
