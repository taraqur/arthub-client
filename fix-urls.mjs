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
    
    // Replace string literals "http://localhost:5000/api..."
    content = content.replace(/"http:\/\/localhost:5000\/api([^"]*)"/g, '`${process.env.NEXT_PUBLIC_API_URL}/api$1`');
    content = content.replace(/'http:\/\/localhost:5000\/api([^']*)'/g, '`${process.env.NEXT_PUBLIC_API_URL}/api$1`');
    
    // Replace template literals `http://localhost:5000/api...` -> `${process.env.NEXT_PUBLIC_API_URL}/api...`
    // We just replace the http://localhost:5000/api part inside an existing template literal
    content = content.replace(/http:\/\/localhost:5000\/api/g, '${process.env.NEXT_PUBLIC_API_URL}/api');

    // Wait, the template literal replacement might result in nested ${} if not careful.
    // Let's refine:
    // If it was `http://localhost:5000/api/users/${id}`, it becomes `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`. This is correct!

    // Wait, let's reset to original and just do a simple string replacement for all occurrences inside quotes.
    content = original;
    
    // 1. Double quotes
    content = content.replace(/"http:\/\/localhost:5000\/api/g, '`${process.env.NEXT_PUBLIC_API_URL}/api');
    // For the closing quote, we need to find all instances where we replaced the start and replace the end quote with backtick.
    // Actually, Regex with capture group is safer:
    content = content.replace(/"http:\/\/localhost:5000([^"]*)"/g, '`${process.env.NEXT_PUBLIC_API_URL}$1`');
    
    // 2. Single quotes
    content = content.replace(/'http:\/\/localhost:5000([^']*)'/g, '`${process.env.NEXT_PUBLIC_API_URL}$1`');
    
    // 3. Template literals (already have backticks)
    content = content.replace(/http:\/\/localhost:5000/g, '${process.env.NEXT_PUBLIC_API_URL}');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated ' + filePath);
    }
  }
});
