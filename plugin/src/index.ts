
import { loaders } from '@ts-extras/types';
const self = new Function('return this')() as { __plugin__: Function | undefined };
export default function (loader: loaders.LoaderExport) {
    if (!self.__plugin__) {
        self.__plugin__ = require('./loader').default;
    }

    return self.__plugin__!(loader);
}


