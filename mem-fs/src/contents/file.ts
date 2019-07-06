import { readFileSync } from "fs";
import { FsItem } from "./fsItem";
import { UnsavedFile } from "./unsavedFile";
import { Node } from "@ts-extras/tree-node";
import { fs } from "@ts-extras/types";

export class File extends FsItem<string> {
    getContent() {
        return readFileSync(this._node.fullPath, 'utf8');
    }
    demote(content: string) {
        this._node.setContent(createVirtualFile(this._node, content));
    }
    dispose() {
        this._node.emit('unlink');
    }
}

let createVirtualFile = (node: Node<FsItem<any>, fs.Events>, content: string): UnsavedFile => {
    let vf = require('./unsavedFile').UnsavedFile;
    createVirtualFile = (node: Node<FsItem<any>, fs.Events>, content: string) => {
        return new vf(node, content);
    }
    return createVirtualFile(node, content);
}
