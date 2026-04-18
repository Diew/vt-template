#!/usr/bin/env node
/**
 * Bootstrap script for vt-template
 * 
 * Replaces all template placeholders with project-specific values.
 * Run: node scripts/bootstrap.js "<Project Name>" "<Version>"
 * 
 * Example: node scripts/bootstrap.js "My Task Manager" 1.0.0
 */

import { readFileSync, writeFileSync, existsSync, rmSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// --- Helpers ---

function kebabCase(str) {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function readJsonFile(filename) {
    const content = readFileSync(join(rootDir, filename), 'utf-8');
    return { content, parsed: JSON.parse(content) };
}

function writeJsonFile(filename, data) {
    writeFileSync(join(rootDir, filename), JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

function readTextFile(filename) {
    return readFileSync(join(rootDir, filename), 'utf-8');
}

function writeTextFile(filename, content) {
    writeFileSync(join(rootDir, filename), content, 'utf-8');
}

// --- Main ---

function main() {
    const args = process.argv.slice(2);

    // Handle --dry-run flag
    const dryRun = args.includes('--dry-run');
    const filteredArgs = args.filter(a => a !== '--dry-run');

    if (filteredArgs.length < 2) {
        console.error('Usage: node scripts/bootstrap.js "<Project Name>" "<Version>" [--dry-run]');
        console.error('Example: node scripts/bootstrap.js "My Task Manager" 1.0.0');
        process.exit(1);
    }

    const projectName = filteredArgs[0];
    const version = filteredArgs[1];
    const projectNameKebab = kebabCase(projectName);

    // Safety check: ensure this is a template
    const pkg = readJsonFile('package.json');
    if (pkg.parsed.name !== 'vt-template') {
        console.error('❌ Error: package.json.name is not "vt-template". This does not appear to be a template.');
        console.error('   Current name:', pkg.parsed.name);
        process.exit(1);
    }

    // Dry-run: show what would change
    if (dryRun) {
        console.log('📋 Dry run — no changes will be made.\n');
        console.log(`Project Name:    "${projectName}"`);
        console.log(`Kebab Case:      "${projectNameKebab}"`);
        console.log(`Version:         "${version}"`);
        console.log('\nFiles that will be modified:');
        console.log('  - package.json (name, version)');
        console.log('  - agent.md (placeholders, milestones)');
        console.log('  - README.md (placeholders)');
        console.log('  - docs/GUIDE_developer.md (footer version)');
        console.log('  - CHANGELOG.md (version header)');
        console.log('\nDirectories/files that will be removed:');
        console.log('  - .template/');
        console.log('  - scripts/bootstrap.js');
        console.log('\nRun without --dry-run to apply changes.');
        return;
    }

    // Confirm before making changes
    console.log(`🚀 Bootstrapping project: "${projectName}" (v${version})`);
    console.log(`   Kebab case: "${projectNameKebab}"`);
    console.log('');
    console.log('This will:');
    console.log('  - Replace all placeholders in package.json, agent.md, README.md, docs/');
    console.log('  - Remove .template/ directory');
    console.log('  - Remove scripts/bootstrap.js');
    console.log('');
    console.log('Make sure you have committed your changes first!');
    console.log('Press Ctrl+C to cancel, or wait 5 seconds to continue...');

    // Auto-confirm after timeout (non-interactive, safe for AI use)
    setTimeout(() => {
        bootstrap(projectName, version, projectNameKebab);
    }, 5000);
}

function bootstrap(projectName, version, projectNameKebab) {
    console.log('\n📝 Applying changes...\n');

    // 1. Update package.json
    console.log('  [1/6] package.json');
    const pkg = readJsonFile('package.json');
    pkg.parsed.name = projectNameKebab;
    pkg.parsed.version = version;
    writeJsonFile('package.json', pkg.parsed);

    // 2. Update agent.md
    console.log('  [2/6] agent.md');
    let agentMd = readTextFile('agent.md');
    agentMd = agentMd.replace(/\[Project Name\]/g, projectName);
    agentMd = agentMd.replace(/\[x\.y\.z\]/g, version);
    agentMd = agentMd.replace(/"vt-template"/g, `"${projectNameKebab}"`);
    agentMd = agentMd.replace(/Project Name\]: `vt-template`/g, `Project Name]: \`${projectNameKebab}\``);
    // Reset milestones
    agentMd = agentMd.replace(/- \[x\] Project scaffolding/g, '- [ ] Project scaffolding');
    agentMd = agentMd.replace(/- \[x\] Test runner configured/g, '- [ ] Test runner configured');
    agentMd = agentMd.replace(/- \[x\] CSS \/ design system baseline/g, '- [ ] CSS / design system baseline');
    agentMd = agentMd.replace(/- \[x\] Production build verified/g, '- [ ] Production build verified');
    writeTextFile('agent.md', agentMd);

    // 3. Update README.md
    console.log('  [3/6] README.md');
    let readme = readTextFile('README.md');
    readme = readme.replace(/\[Project Name\]/g, projectName);
    readme = readme.replace(/\[x\.y\.z\]/g, version);
    writeTextFile('README.md', readme);

    // 4. Update docs/GUIDE_developer.md
    console.log('  [4/6] docs/GUIDE_developer.md');
    let devGuide = readTextFile('docs/GUIDE_developer.md');
    devGuide = devGuide.replace(/\[x\.y\.z\]/g, version);
    devGuide = devGuide.replace(/\[YYYY-MM-DD\]/g, new Date().toISOString().split('T')[0]);
    writeTextFile('docs/GUIDE_developer.md', devGuide);

    // 5. Update CHANGELOG.md — add new version header
    console.log('  [5/6] CHANGELOG.md');
    let changelog = readTextFile('CHANGELOG.md');
    const today = new Date().toISOString().split('T')[0];
    const newHeader = `## [${version}] - ${today}\n\n### Added\n- Project bootstrapped from vt-template\n\n`;
    // Insert after the first header line
    const firstLineEnd = changelog.indexOf('\n') + 1;
    changelog = changelog.substring(0, firstLineEnd) + newHeader + changelog.substring(firstLineEnd);
    writeTextFile('CHANGELOG.md', changelog);

    // 6. Cleanup — remove template-specific files
    console.log('  [6/6] Cleanup');
    const templateDir = join(rootDir, '.template');
    if (existsSync(templateDir)) {
        rmSync(templateDir, { recursive: true, force: true });
        console.log('    - Removed .template/');
    }

    const bootstrapScript = join(rootDir, 'scripts', 'bootstrap.js');
    if (existsSync(bootstrapScript)) {
        rmSync(bootstrapScript, { force: true });
        console.log('    - Removed scripts/bootstrap.js');
    }

    console.log('\n✅ Bootstrap complete!\n');
    console.log('Next steps:');
    console.log(`  npm install`);
    console.log(`  npm run dev`);
}

main();
