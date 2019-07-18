import { spawnSync } from "child_process";

const cache = {} as Record<string, string>;
export function getPublishVersion(name: string) {
    if (name in cache) {
        return cache[name];
    }
    try {
        const result = spawnSync('npm', ['view', name, 'version'], { shell: true });
        if (result.stderr.length) {
            return cache[name] = '';
        }
        return cache[name] = result.output.join('').trim();
    } catch{
        return cache[name] = '';
    }
}
