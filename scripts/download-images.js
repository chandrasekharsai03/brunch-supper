const https = require('https');
const fs = require('fs');
const path = require('path');

const photos = [
  { id: 6267, slug: 'table-in-vintage-restaurant', name: 'restaurant-ambience' },
  { id: 9609847, slug: 'top-view-of-an-indian-dish-with-rice-and-meat', name: 'chicken-biryani' },
  { id: 9609869, slug: 'a-flatlay-of-a-rice-meal-in-a-stainless-steel-bowl', name: 'mutton-biryani' },
  { id: 12008037, slug: 'setting-on-tables-in-restaurant', name: 'family-dining' },
  { id: 16722390, slug: 'interior-of-a-restaurant', name: 'restaurant-interior' },
  { id: 20446413, slug: 'indian-naan-bread-with-additions', name: 'butter-naan' },
  { id: 28674530, slug: 'delicious-plate-of-indo-chinese-manchurian-balls', name: 'manchurian' },
  { id: 29631461, slug: 'spicy-paneer-stir-fry-in-white-bowl', name: 'paneer-butter-masala' },
  { id: 29685076, slug: 'spicy-indian-chicken-curry-in-brass-pan', name: 'veg-curry' },
  { id: 32938733, slug: 'indonesian-fried-rice-with-egg-and-crackers', name: 'fried-rice' },
  { id: 8477650, slug: 'fried-egg-on-top-of-a-rice', name: 'noodles' },
];

const outputDir = path.join(__dirname, '..', 'public', 'images');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

function extractImageUrl(html, id) {
  const patterns = [
    new RegExp('images\\\\.pexels\\\\.com/photos/' + id + '/([a-zA-Z0-9_-]+)\\.jpg', 'i'),
    new RegExp('og:image[^>]+content="([^"]+' + id + '[^"]+)"'),
    new RegExp('"image":"([^"]+' + id + '[^"]+)"'),
  ];
  for (const p of patterns) {
    const m = html.match(p);
    if (m) return m[1] ? 'https://images.pexels.com/photos/' + id + '/' + m[1] + '.jpg' : m[1].replace(/&amp;/g, '&');
  }
  return null;
}

let completed = 0;
photos.forEach(photo => {
  const pageUrl = 'https://www.pexels.com/photo/' + photo.slug + '-' + photo.id + '/';
  https.get(pageUrl, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  }, (res) => {
    let html = '';
    res.on('data', c => html += c);
    res.on('end', () => {
      let imgUrl = extractImageUrl(html, photo.id);

      if (!imgUrl) {
        // Fallback: try known filename from 6267 pattern
        const knownFiles = {
          6267: 'menu-restaurant-vintage-table',
          9609847: 'pexels-photo-9609847',
          9609869: 'pexels-photo-9609869',
          12008037: 'pexels-photo-12008037',
          16722390: 'pexels-photo-16722390',
          20446413: 'pexels-photo-20446413',
          28674530: 'pexels-photo-28674530',
          29631461: 'pexels-photo-29631461',
          29685076: 'pexels-photo-29685076',
          32938733: 'pexels-photo-32938733',
          8477650: 'pexels-photo-8477650',
        };
        const filename = knownFiles[photo.id] || 'pexels-photo-' + photo.id;
        imgUrl = 'https://images.pexels.com/photos/' + photo.id + '/' + filename + '.jpeg?auto=compress&cs=tinysrgb&w=1200';
      } else if (!imgUrl.includes('?')) {
        imgUrl += '?auto=compress&cs=tinysrgb&w=1200';
      }

      const ext = imgUrl.includes('.png') ? '.png' : '.jpg';
      const outputPath = path.join(outputDir, photo.name + ext);

      https.get(imgUrl, { headers: { 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://www.pexels.com/' } }, (imgRes) => {
        if (imgRes.statusCode !== 200) {
          console.log('FAILED (' + imgRes.statusCode + '): ' + photo.name + ' (' + photo.id + ') - URL: ' + imgUrl);
          completed++;
          if (completed === photos.length) process.exit(0);
          return;
        }
        const fileStream = fs.createWriteStream(outputPath);
        imgRes.pipe(fileStream);
        imgRes.on('end', () => {
          const size = fs.statSync(outputPath).size;
          console.log('OK: ' + photo.name + '.jpg (' + size + ' bytes)');
          completed++;
          if (completed === photos.length) process.exit(0);
        });
      }).on('error', e => {
        console.log('ERROR: ' + photo.name + ' - ' + e.message);
        completed++;
        if (completed === photos.length) process.exit(0);
      });
    });
  }).on('error', e => {
    console.log('PAGE ERROR: ' + photo.name + ' - ' + e.message);
    completed++;
    if (completed === photos.length) process.exit(0);
  });
});
