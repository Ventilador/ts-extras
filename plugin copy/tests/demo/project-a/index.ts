import { SomeType } from "./interfaces";
import { DEEP_PROP } from "./contants";

export class Demo {
    getProperty(): SomeType {
        return {
            exists: true,
            kind: 0,
            name: '',
            deepProp: DEEP_PROP
        }
    }
}