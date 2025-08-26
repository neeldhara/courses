import fs from 'fs';
import path from 'path';

const distDir = path.resolve(process.cwd(), 'dist');
const courseRedirectsFile = path.join(distDir, '_course_redirects');
const finalRedirectsFile = path.join(process.cwd(), 'public', '_redirects');

async function generateRedirects() {
    let courseRedirects = '';
    if (fs.existsSync(courseRedirectsFile)) {
        courseRedirects = fs.readFileSync(courseRedirectsFile, 'utf-8');
    }

    // Prepend course redirects to the main _redirects file
    let existingRedirects = '';
    if (fs.existsSync(finalRedirectsFile)) {
        existingRedirects = fs.readFileSync(finalRedirectsFile, 'utf-8');
    }

    const finalRedirects = `${courseRedirects}\n${existingRedirects}`;
    
    fs.writeFileSync(finalRedirectsFile, finalRedirects);
    console.log('Successfully generated _redirects file.');
}

generateRedirects();