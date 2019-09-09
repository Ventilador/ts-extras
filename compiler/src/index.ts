import { createSolutionBuilder, ExitStatus } from 'typescript';
import { createFs } from '@ts-extras/mem-fs';
import { createHost } from './createSolutionHost';
import { dirname } from 'path';
import { getBuildOptions } from './utils';

export default function (tsConfigPath: string, watch: boolean) {
    const fs = createFs(dirname(tsConfigPath), watch);
    const programHost = createHost(tsConfigPath, fs);
    const rootFiles = [tsConfigPath];
    const builder = createSolutionBuilder(programHost, rootFiles, getBuildOptions(watch));
    const status = builder.buildAllProjects();
    if (watch) {
        builder.startWatching();
    } else if (status !== ExitStatus.Success) {
        process.exit(1);
    }
}
