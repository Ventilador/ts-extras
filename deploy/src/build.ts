import { resolve } from 'path';
import { readJsonFile } from './readJsonFile';
import { Workspace } from './workspace';
import { PackageJson } from './json';
import { writeFileSync } from 'fs';
import { spawnSync } from 'child_process';
const rootDir = resolve(__dirname, '../..');
const packageJson = require(getJsonPath(rootDir));
const parent = new Workspace(null, '@ts-extras', rootDir, packageJson, null as any);
if ((packageJson.workspaces as string[])
    .filter(i => !packageJson['disabled-workspaces'].includes(i))
    .map(processWorkspace)
    .filter((i): i is Workspace => !!(i && i.changed()))
    .map((workspace: Workspace) => {
        const distFolder = workspace.distFolder();
        if (distFolder) {
            writeFileSync(getJsonPath(distFolder), JSON.stringify(workspace.distPackageJson(), undefined, '  '));
        }
        return workspace.update();
    }).map(workspace => {
        spawnSync('npm', ['publish', '--access=public'], {
            cwd: workspace.distFolder(),
            shell: true,
            stdio: 'inherit'
        })
    }).length) {

    Workspace.Save();
}
function processWorkspace(name: string): Workspace | undefined {
    const workspaceFolder = resolve(rootDir, name);
    const workspacePackageJson = require(getJsonPath(workspaceFolder));
    if (workspacePackageJson.name.startsWith('@ts-extras/')) {
        return getWorkspace(name, workspaceFolder, workspacePackageJson, parent);
    }
}

function getWorkspace(name: string, folderName: string, packageJson: PackageJson, parent: Workspace) {
    return new Workspace(parent, name, folderName, packageJson, readJsonFile(resolve(folderName, 'tsconfig.json')));
}

function getJsonPath(folder: string) {
    return resolve(folder, 'package.json');
}
