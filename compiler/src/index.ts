import { createSolutionBuilder } from 'typescript';
import { createFs } from '@ts-extras/mem-fs';
import { dirname } from 'path';
import { createHost } from './createSolutionHost';
import { getBuildOptions } from './utils';

export default function (tsConfigPath: string, watch: boolean) {
    const fs = createFs(dirname(tsConfigPath), watch);
    const programHost = createHost(tsConfigPath, fs);
    const rootFiles = [tsConfigPath];
    const builder = createSolutionBuilder(programHost, rootFiles, getBuildOptions(watch));
    builder.buildAllProjects();
    if (watch) {
        builder.startWatching();
    }
}
