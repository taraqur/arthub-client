import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

walkDir('./src', (filePath) => {
  if (filePath.endsWith('.js') || filePath.endsWith('.jsx') || filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Replace double quoted strings
    content = content.replace(/"http:\/\/localhost:5000([^"]*)"/g, '`${process.env.NEXT_PUBLIC_API_URL}$1`');
    
    // Replace single quoted strings
    content = content.replace(/'http:\/\/localhost:5000([^']*)'/g, '`${process.env.NEXT_PUBLIC_API_URL}$1`');
    
    // Replace template strings (where http://localhost:5000 is inside existing backticks)
    // Wait, if it is already inside backticks, we only need to replace the URL part:
    // e.g. `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}`
    // For pure `http://localhost:5000/api...` we replace `http://localhost:5000` with `${process.env.NEXT_PUBLIC_API_URL}`
    content = content.replace(/`http:\/\/localhost:5000([^`]*)`/g, '`${process.env.NEXT_PUBLIC_API_URL}$1`');

    // Edge cases like process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
    // in api.js or auth-client.js
    // If it was modified into backticks incorrectly, the above single-quote replacement will handle it if it was in single quotes.
    // Let's manually fix api.js and auth-client.js and stripe.js after this to be safe!

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated ' + filePath);
    }
  }
});
