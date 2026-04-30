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

    if (file === 'package.json') {
        const pkg = JSON.parse(content);
        pkg.version = version;
        content = JSON.stringify(pkg, null, 2) + '\n';
    } else if (file === 'agent.md') {
        content = content.replace(
            /- \*\*Version\*\*: \[x\.y\.z\]/,
            `- **Version**: ${version}`
        );
    } else if (file === 'README.md') {
        content = content.replace(
            /\[x\.y\.z\]/g,
            version
        );
    } else if (file === 'docs/GUIDE_developer.md') {
        const footerMatch = content.match(/Updated for v\[x\.y\.z\] - \d{4}-\d{2}-\d{2}(\*|$)/);
        if (footerMatch) {
            const date = new Date().toISOString().split('T')[0];
            content = content.replace(
                footerMatch[0],
                `Updated for v${version} - ${date}`
            );
        }
    } else if (file === 'docs/STANDARDS_ui-visual.md') {
        content = content.replace(/\[x\.y\.z\]/g, version);
        content = content.replace(/\[YYYY-MM-DD\]/g, new Date().toISOString().split('T')[0]);
    } else if (file === 'CHANGELOG.md') {
        const today = new Date().toISOString().split('T')[0];
        const newHeader = `## [${version}] - ${today}\n\n`;

        // Smart check: don't double-prepend if header already exists
        if (content.includes(`## [${version}]`)) {
            console.log(`- Skipping CHANGELOG.md: Version [${version}] already exists.`);
            return;
        }

        const lines = content.split('\n');
        // Find the index after the title (e.g., "# Changelog")
        let insertIndex = 0;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].toLowerCase().trim().startsWith('# changelog')) {
                insertIndex = i + 1;
                // Move past the optional blank line
                if (lines[i + 1] === '') insertIndex++;
                break;
            }
        }
        
        // Insert at the calculated position (or top if no title found)
        lines.splice(insertIndex, 0, newHeader);
        content = lines.join('\n');
    }

    writeFileSync(filePath, content);
    console.log(`✓ Updated ${file}`);
});

console.log(`\nVersion bumped to ${version}`);
