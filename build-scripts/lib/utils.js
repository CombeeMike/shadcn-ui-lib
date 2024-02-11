import { readFileSync, writeFileSync } from 'fs';

const _PACKAGE_JSON_PATH = 'package.json';

export function getPackageJsonVersion() {
  const packageJson = JSON.parse(readFileSync(_PACKAGE_JSON_PATH, 'utf8'));
  const version = packageJson.version;
  return version;
}

export function replaceVersionInPackageJson(newVersion) {
  const packageJsonStr = readFileSync(_PACKAGE_JSON_PATH, 'utf8');
  const newPackageJsonStr = packageJsonStr.replace(/("version"\s*:\s*)"[^"]*"/, `$1"${newVersion}"`);
  writeFileSync(_PACKAGE_JSON_PATH, newPackageJsonStr);
}
