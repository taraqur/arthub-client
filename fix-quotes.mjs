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
    
    // Fix the syntax error created by my previous script
    // Match `${process.env.NEXT_PUBLIC_API_URL}/api/anything"
    // and replace the ending double quote or single quote with a backtick
    // Be careful to only match until the first quote
    
    content = content.replace(/\$\{process\.env\.NEXT_PUBLIC_API_URL\}\/api([^"']*)["']/g, '${process.env.NEXT_PUBLIC_API_URL}/api$1`');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Fixed quotes in ' + filePath);
    }
  }
});
