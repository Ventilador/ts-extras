import { FsItem } from "./fsItem";
import { readdirSync } from "fs";

export class Folder extends FsItem<string[]> {
    getContent() {
        return readdirSync(this._node.fullPath);
    }
    dispose() {
        this._node.emit('unlinkDir');
    }
}
