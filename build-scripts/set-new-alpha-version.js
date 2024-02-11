import { getPackageJsonVersion, replaceVersionInPackageJson } from './lib/utils.js';

console.info('\n\n======================================================');
console.info('Set new alpha version');
console.info('======================================================\n');

function getVersionVariants(version) {
  const baseVersion = version.split('-')[0];
  const [major, minor, patch] = baseVersion.split('.');
  const nextBaseVersion = `${major}.${minor}.${parseInt(patch, 10) + 1}`;
  const alphaVersion = /.*-alpha(\d+)$/.exec(version)?.[1];
  const nextAlphaVersion = alphaVersion ? parseInt(alphaVersion, 10) + 1 : 0;
  return { baseVersion, nextBaseVersion, alphaVersion, nextAlphaVersion };
}

/**
 * Reads current version from `package.json`, increments the alpha version and writes it back.
 * If the current version is no alpha version (i.e. a final, beta or rc version), the current patch version is
 * incremented and alpha version is set to 0.
 */
function setNewAlphaVersion() {
  const version = getPackageJsonVersion();
  const { baseVersion, nextBaseVersion, alphaVersion, nextAlphaVersion } = getVersionVariants(version);
  const newVersionBase = alphaVersion ? baseVersion : nextBaseVersion;
  const newVersion = `${newVersionBase}-alpha${nextAlphaVersion}`;
  replaceVersionInPackageJson(newVersion);

  console.info(`Replaced version "${version}" with new version "${newVersion}"`);
}

setNewAlphaVersion();
