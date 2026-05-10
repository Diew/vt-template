import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const version = process.argv[2];
if (!version) {
    console.error('Usage: npm run bump <version>');
    process.exit(1);
}

const filesToUpdate = [
    'package.json',
    'agent.md',
    'README.md',
    'docs/GUIDE_developer.md',
    'docs/STANDARDS_ui-visual.md',
    'CHANGELOG.md'
];

filesToUpdate.forEach(file => {
    const filePath = join(rootDir, file);
    let content = readFileSync(filePath, 'utf-8');
    const today = new Date().toISOString().split('T')[0];
    const versionPattern = '\\d+\\.\\d+\\.\\d+';
    const placeholderPattern = '\\[x\\.y\\.z\\]';

    if (file === 'package.json') {
        const pkg = JSON.parse(content);
        pkg.version = version;
        content = JSON.stringify(pkg, null, 2) + '\n';
    } else if (file === 'agent.md') {
        // Update Title
        content = content.replace(
            new RegExp(`(# .* v)(?:${placeholderPattern}|${versionPattern})`),
            `$1${version}`
        );
        // Update List Detail
        content = content.replace(
            new RegExp(`(- \\*\\*Version\\*\\*: )(?:${placeholderPattern}|${versionPattern})`),
            `$1${version}`
        );
    } else if (file === 'README.md') {
        content = content.replace(
            new RegExp(`(?:${placeholderPattern}|${versionPattern})`, 'g'),
            version
        );
    } else if (file === 'docs/GUIDE_developer.md') {
        content = content.replace(
            new RegExp(`(\\*Updated for v)(?:${placeholderPattern}|${versionPattern})( - )\\d{4}-\\d{2}-\\d{2}(\\*)`),
            `$1${version}$2${today}$3`
        );
    } else if (file === 'docs/STANDARDS_ui-visual.md') {
        content = content.replace(
            new RegExp(`(?:${placeholderPattern}|${versionPattern})`, 'g'), 
            version
        );
        content = content.replace(
            new RegExp(`(?:${placeholderPattern}|\\[YYYY-MM-DD\\]|\\d{4}-\\d{2}-\\d{2})`, 'g'), 
            today
        );
    } else if (file === 'CHANGELOG.md') {
        if (content.includes(`## [${version}]`)) {
            console.log(`- Skipping CHANGELOG.md: Version [${version}] already exists.`);
            return;
        }

        const lines = content.split('\n');
        let insertIndex = 0;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].toLowerCase().trim().startsWith('# changelog')) {
                insertIndex = i + 1;
                if (lines[i + 1] === '') insertIndex++;
                break;
            }
        }
        
        lines.splice(insertIndex, 0, `## [${version}] - ${today}\n`);
        content = lines.join('\n');
    }

    writeFileSync(filePath, content);
    console.log(`✓ Updated ${file}`);
});

console.log(`\nVersion bumped to ${version}`);
