const fs = require('fs');
const path = require('path');
const https = require('https');

const images = [
  // Chapters
  { url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop', dest: 'public/images/chapter2.jpg' },
  { url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=800&auto=format&fit=crop', dest: 'public/images/chapter3.jpg' },
  
  // Gallery
  { url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=800&auto=format&fit=crop', dest: 'public/images/gallery1.jpg' },
  { url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop', dest: 'public/images/gallery2.jpg' },
  { url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop', dest: 'public/images/gallery3.jpg' },
  { url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=800&auto=format&fit=crop', dest: 'public/images/gallery4.jpg' },
  { url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop', dest: 'public/images/gallery5.jpg' },
  { url: 'https://images.unsplash.com/photo-1472214222555-d404758b43ae?q=80&w=800&auto=format&fit=crop', dest: 'public/images/gallery6.jpg' },
  
  // Collages
  { url: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=800&auto=format&fit=crop', dest: 'public/images/collages/photo1.jpg' },
  { url: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=800&auto=format&fit=crop', dest: 'public/images/collages/photo2.jpg' },
  { url: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=800&auto=format&fit=crop', dest: 'public/images/collages/photo3.jpg' },
  { url: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=800&auto=format&fit=crop', dest: 'public/images/collages/photo4.jpg' },
  { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop', dest: 'public/images/collages/photo5.jpg' },
  { url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop', dest: 'public/images/collages/photo6.jpg' },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    // Ensure directory exists
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        download(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log(`Downloaded: ${dest}`);
          resolve();
        });
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log('Downloading aesthetic B&W photos...');
  for (const img of images) {
    try {
      await download(img.url, path.join(__dirname, '..', img.dest));
    } catch (e) {
      console.error(`Error downloading ${img.dest}:`, e.message);
    }
  }
  console.log('All downloads finished.');
}

main();
