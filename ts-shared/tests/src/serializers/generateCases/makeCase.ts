import { MoveMetadataWithTestCases, Cases, ISerializerWithTestCases } from ".";
import { getCases } from "./getCases";

export function makeCase(propMetadata: MoveMetadataWithTestCases[], mode: keyof Cases) {
    if (mode === 'some') {
        propMetadata = propMetadata.filter(removeOptionals);
    }
    const creators = propMetadata.map((data: MoveMetadataWithTestCases) => {
        return function (context: ISerializerWithTestCases[], prev: any) {
            if (before(context, data.arg)) {
                prev[data.name] = getCases(data.arg, mode)(context);
                after(context, data.arg);
            } else if (mode === 'all') {

            }
        }
    });
    return function (context: ISerializerWithTestCases[]) {
        return creators.reduce(callFn, { context, prev: {} }).prev;
    }
}


function after(context: ISerializerWithTestCases[], value: ISerializerWithTestCases) {
    if (context.pop() !== value) {
        throw new Error('Out of sync');
    }
}

function before(context: ISerializerWithTestCases[], value: ISerializerWithTestCases) {
    let counter = 0;

    for (const serializer of context) {
        if (serializer === value) {
            counter++;
        }
        if (counter === 2) {
            return false;
        }
    }
    context.push(value);
    return true;
}

function callFn(thru: any, cur: Function) {
    cur(thru.context, thru.prev);
    return thru;
}

function removeOptionals(propMetadata: MoveMetadataWithTestCases) {
    return !propMetadata.optional;
}
