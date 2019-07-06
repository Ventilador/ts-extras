import { Node } from "@ts-extras/tree-node";
import { FsItem } from "./fsItem";
import { File } from "./file";
import { Stat } from "./stat";
import { fs } from "@ts-extras/types";

export class UnsavedFile extends FsItem<string> {
    public dispose(): void {
        throw new Error("Method not implemented.");
    }
    private _text: string;
    constructor(node: Node<FsItem<any>, fs.Events>, content: string) {
        super(node, createStats(node, content));
        this._text = content;
    }
    getContent() {
        return this._text;
    }
    demote(content: string) {
        this._text = content;
    }
    update(stat: Stat, content: string) {
        this._text = content;
        super.update(stat, content);
    }
    promote() {
        const file = new File(this._node);
        this._node.setContent(file);
        file.update(this._stats!, this._text);
    }
}
const isUnsavedSymbol = Symbol('UnsavedFile');
(UnsavedFile.prototype as any)[isUnsavedSymbol] = true;
export function isUnsavedFile(value: any): value is UnsavedFile {
    return value && value[isUnsavedSymbol];
}

function createStats(node: Node<FsItem<any>, fs.Events>, content: string): Stat {
    return Stat.virtualStat(node.fullPath, content.length);
}

function identity(val: string): string {
    return val;
}

