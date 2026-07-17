const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function run() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors']
  });

  const page = await browser.newPage();
  
  // Array to hold captured font requests
  const fontUrls = [];

  page.on('response', async (response) => {
    const url = response.url();
    if (url.includes('LTDEV001') || url.endsWith('.woff2') || url.endsWith('.woff') || url.endsWith('.ttf')) {
      console.log(`Intercepted asset: ${url} (status: ${response.status()})`);
      if (response.status() === 200) {
        fontUrls.push(url);
        try {
          const buffer = await response.buffer();
          const filename = path.basename(new URL(url).pathname);
          const savePath = path.join(__dirname, '..', 'public', 'assets', filename);
          fs.writeFileSync(savePath, buffer);
          console.log(`Saved font locally to ${savePath}`);
        } catch (e) {
          console.error(`Error saving ${url}:`, e.message);
        }
      }
    }
  });

  try {
    console.log('Navigating to live site...');
    await page.goto('https://www.purandaradasa.org/musics', {
      waitUntil: 'networkidle2',
      timeout: 60000
    });
    console.log('Navigation completed.');
  } catch (err) {
    console.error('Navigation error:', err.message);
  } finally {
    await browser.close();
    console.log('Browser closed. Done.');
  }
}

run();
