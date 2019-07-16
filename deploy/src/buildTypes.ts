import { readdirSync, existsSync, mkdirSync, copyFileSync } from "fs";
import { join } from "path";

export function compileTypes(typesFolder: string) {
    const dir = process.cwd();
    const typesDir = join(dir, typesFolder);
    const distFolder = join(typesDir, 'dist');
    if (!existsSync(distFolder)) {
        mkdirSync(distFolder);
    }
    readdirSync(typesDir)
        .forEach((file) => {
            if (file.endsWith('.d.ts')) {
                copyFileSync(join(typesDir, file), join(distFolder, file));
            }
        });
}