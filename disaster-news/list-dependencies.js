// RUN WITH ´node list-dependencies.txt´ to create/update dependencies.txt
// Install dependencies using your package manager:
// ´npm install dependencies.txt´ or ´yarn install dependencies.txt´

import fs from 'fs';

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

const dependencies = packageJson.dependencies || {};
const devDependencies = packageJson.devDependencies || {};

const allDependencies = { ...dependencies, ...devDependencies };
const dependencyList = Object.keys(allDependencies);

fs.writeFileSync('dependencies.txt', dependencyList.join('\n'));
