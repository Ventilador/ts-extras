import { PackageJson } from "./json";
import { dirname, resolve } from "path";
import { existsSync, mkdirSync, readdirSync, copyFileSync } from "fs";

export function moveBinFolder(baseDir: string, distDir: string, binOpts: NonNullable<PackageJson['bin']>) {
    const binPath = binOpts[Object.keys(binOpts)[0]!];
    const binFolder = dirname(binPath);

    if (!existsSync(resolve(distDir, binFolder))) {
        mkdirSync(resolve(distDir, binFolder));
    }

    readdirSync(resolve(baseDir, binFolder))
        .forEach(i => {
            copyFileSync(resolve(baseDir, binFolder, i), resolve(distDir, binFolder, i));
        });
}
