import { readdirSync, existsSync, mkdirSync, copyFileSync } from "fs";
import { join } from "path";

export function copyNonCompiledProject(typesFolder: string, ext: string) {
    const dir = process.cwd();
    const typesDir = join(dir, typesFolder);
    const distFolder = join(typesDir, 'dist');
    if (!existsSync(distFolder)) {
        mkdirSync(distFolder);
    }
    readdirSync(typesDir)
        .forEach((file) => {
            if (file.endsWith(ext)) {
                copyFileSync(join(typesDir, file), join(distFolder, file));
            }
        });
}