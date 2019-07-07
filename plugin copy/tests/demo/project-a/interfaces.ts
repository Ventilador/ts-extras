export interface SomeType extends OtherType {
    exists: boolean;
    deepProp: Deep;
}
export interface Deep {
    areValid: readonly boolean[];
}
export interface OtherType {
    name: string;
    kind: number;
}