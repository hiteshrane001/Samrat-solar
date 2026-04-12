import fs from 'fs';
import path from 'path';

function copyDir(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

const srcDir = path.resolve('dist');
const destDir = path.resolve('server/public');

console.log(`Copying ${srcDir} to ${destDir}...`);
copyDir(srcDir, destDir);
console.log('✓ Assets moved successfully.');
