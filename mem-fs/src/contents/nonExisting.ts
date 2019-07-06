import { FsItem } from "./fsItem";
export class NonExisting extends FsItem<never> {
    getContent(): never {
        throw new Error(`"${this._node.fullPath}" does not exist`);
    }
    dispose() { }
}
