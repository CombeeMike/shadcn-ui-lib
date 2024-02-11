import { getPackageJsonVersion } from './lib/utils.js';
import { existsSync, renameSync, unlinkSync } from 'fs';
import { join } from 'path';

console.info('\n\n======================================================');
console.info('Rename current pack to dev');
console.info('======================================================\n');

const _PACKS_PATH = 'versions';

const currentVersion = getPackageJsonVersion();
const currentPackFileName = `halumi-ui-${currentVersion}.tgz`;
const currentPackPath = join(_PACKS_PATH, currentPackFileName);
const devPackPath = join(_PACKS_PATH, 'halumi-ui.dev.tgz');

if (!existsSync(currentPackPath)) {
  console.info(`Current pack "${currentPackPath}" does not exist. Skipping renaming.`);
} else {
  try {
    unlinkSync(devPackPath);
  } catch (ignore) {}
  renameSync(currentPackPath, devPackPath);

  console.info(`Renamed "${currentPackPath}" to "${devPackPath}"`);
}
