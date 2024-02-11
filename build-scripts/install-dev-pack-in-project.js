import { spawn } from 'child_process';
import { join } from 'path';

console.info('\n\n======================================================');
console.info('Install dev pack in project');
console.info('======================================================\n');

const _PROJECT_PATHS = {
  'reminder-pwa': './../reminder-pwa',
};

const projectPath = _PROJECT_PATHS['reminder-pwa'];

const thisFilePath = import.meta.url;
const devPackPath = join(thisFilePath, '..', '..', 'versions', 'halumi-ui.dev.tgz').replace('file:', '');
spawn(`npm`, ['i', devPackPath], { cwd: projectPath, stdio: 'inherit' });
