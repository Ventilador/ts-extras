import { normalize, sep, join } from "path";
import { EventEmitter } from "events";
export function createPointer<T, EventNames>(path?: string): Walker<T, EventNames> {
    let cur: Node<T, EventNames> = root.walk(path || process.cwd());
    return function walk(path: string): Node<T, EventNames> {
        return cur = cur.walk(path);
    }

}
export type WatchCallback<T, EventNames> = (eventName: any, node: Node<T, EventNames>) => any;
export type Disposable = {
    dispose: () => void;
}
function getFullPath(parent: Node<any, any>, name: string) {
    if (name) {
        if (parent.fullPath) {
            return join(parent.fullPath, name);
        }
        return name;
    }
    return parent.fullPath;
}
export type Walker<T, EventNames> = (path: string) => Node<T, EventNames>;
export class Node<T, EventNames> {
    public readonly fullPath: string;
    protected _content: T | null = null;
    protected _children: Record<string, Node<T, EventNames> | undefined> | null = null;
    protected _parent: Node<T, EventNames>;
    protected _name: string;
    constructor(parent: Node<T, EventNames>, name: string) {
        this._parent = parent;
        this._name = name;
        this.fullPath = getFullPath(this._parent, name);
    }
    emit(event: EventNames) {
        root.emitChange(this, event);
    }
    walk(path: string) {
        path = normalize(path);
        return this._walkUpTree(path)._walkDownTree(path);
    }
    watch(cb: WatchCallback<T, EventNames>) {
        let path: string | null = this.fullPath.toLowerCase()
        let rootPtr: RootNode<any> | null = root.on(path, cb);
        return function () {
            if (rootPtr) {
                rootPtr.off(path!, cb);
                path = cb = rootPtr = null as any;
            }
        }
    }
    dispose() {
        if (this._children) {
            Object.keys(this._children).forEach(this._disposeChildUnsafe, this);
        }

        this._content = null;
        root.listeners(this.fullPath).forEach(this._stopListening, this);
        this._parent!._removeChild(this);
    }
    setContent(val: T | null) {
        const toEmit = this._content ? 'change' : 'add'
        this._content = val;
        root.emitChange(this, toEmit);
    }
    getContent(): T | null {
        return this._content;
    }
    private _removeChild(node: Node<T, EventNames>) {
        if (this._hasChild(node._name)) {
            delete this._children![node._name];
        }
    }
    private _getChild(name: string) {
        return this._children![name.toLowerCase()];
    }
    private _hasChild(name: string) {
        return !!this._children && !!this._children[name.toLowerCase()];
    }
    private _createChild(name: string): Node<T, EventNames> {
        if (!this._children) {
            this._children = new Empty();
        }
        if (this._children[name.toLowerCase()]) {
            throw new Error(`Child already exists "${name}"`);
        }

        return this._children[name.toLowerCase()] = new Node(this, name);
    }
    private _stopListening(cb: any) {
        root.off(this.fullPath.toLowerCase(), cb);
    }
    private _disposeChildUnsafe(child: string) {
        this._children![child]!.dispose();
    }
    private _walkUpTree(path: string) {
        let cur: Node<T, EventNames> = this;
        while (!isInside(cur, path)) {
            cur = cur._parent;
        }
        return cur;
    }
    private _walkDownTree(path: string) {
        path = getNextPath(this, path);
        if (path) {
            let cur: Node<T, EventNames> = this;
            for (const sec of path.split(sep)) {
                if (cur._hasChild(sec)) {
                    cur = cur._getChild(sec)!;
                } else {
                    cur = cur._createChild(sec);
                }
            }

            return cur;
        }

        return this;
    }
}

function isInside<T, EventNames>(node: Node<T, EventNames>, path: string) {
    const startsWith = path.startsWith(node.fullPath);
    if (!startsWith) {
        return false;
    }
    return !node.fullPath || path === node.fullPath || path[node.fullPath.length] === sep;
}

function getNextPath<T, EventNames>(node: Node<T, EventNames>, path: string) {
    path = path.slice(node.fullPath.length);
    if (path[0] === sep) {
        return path.slice(1);
    }
    return path;
}



export class RootNode<EventNames> extends EventEmitter {
    node: Node<any, any>;
    fullPath = '';
    private constructor() {
        super();
        this.node = new Node(this as any, '');
    }
    listeners(event: string) {
        return super.listeners(event.toLowerCase());
    }
    emitChange(node: Node<any, any>, event: EventNames) {
        return super.emit(node.fullPath.toLowerCase(), event, node);
    }
    on(event: string, listener: WatchCallback<any, EventNames>): this {
        return super.on(event.toLowerCase(), listener);
    }
    off(event: string, listener: WatchCallback<any, EventNames>): this {
        return super.off(event.toLowerCase(), listener);
    }
    walk(path: string) {
        return this.node.walk(path);
    }
}
export interface RootNode<EventNames> extends EventEmitter { }
class Empty {
    [key: string]: Node<any, any> | undefined;
}
Empty.prototype = null as any;
const root: RootNode<any> = new (RootNode as any)();
