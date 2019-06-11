import { ISerializerWithTestCases, Cases, TestCases, TestCase } from ".";
import { makeRandomText, makeRandomNumberBetween, makeRandomNumber } from "../randomUtils";
import { IMoveMetadata, ISerializer, Thru as thru, F64 as f64, Bool as bool, FullJson as fullJson, Enum, isArraySerializerWrapper, unwrapArraySerializer } from "@ts-utils/serialization";
import { isOptionalSerializerWrapper, unwrapOptionalSerializer } from "@ts-utils/serialization/dist/decorators/moveImpl";

function hasCases(value: any): value is { cases: Cases } {
    return value && value.cases;
}
export function getCases(value: { cases?: TestCases } | String | Number | Boolean | Object, mode: keyof Cases): TestCase {
    if (hasCases(value)) {
        return value.cases[mode];
    }
    switch (value) {
        case String:
            return Thru.cases[mode];
        case Number:
        case Enum:
            return F64.cases[mode];
        case Boolean:
            return Bool.cases[mode];
        case Object:
            return FullJson.cases[mode];
        default:
            const val = value as ISerializerWithTestCases | ISerializerWithTestCases[];
            if (Array.isArray(val)) {
                return ((val as any).cases = makeArray(val[0], mode))[mode];
            }
    }
    if (isArraySerializerWrapper(value)) {
        return ((value as any).cases = makeArray(unwrapArraySerializer(value), mode))[mode];
    }
    if (isOptionalSerializerWrapper(value)) {
        return getCases(unwrapOptionalSerializer(value), 'some');
    }
    console.error('Could not find cases\r\n', value);
    throw new Error('Could not find cases');
}
function makeArray(val: ISerializer, mode: keyof Cases) {
    return {
        some: () => [],
        all: (context) => [getCases(val, mode)(context), getCases(val, mode)(context)],
    } as Cases;
}

const Thru: ISerializerWithTestCases = thru as any;
Thru.cases = {
    all: makeRandomText.bind(null, 300, 40),
    some: () => ''
};
const F64: ISerializerWithTestCases = f64 as any;
F64.cases = {
    all: makeRandomNumberBetween.bind(null, -9999, 9999),
    some: () => 0
};
const Bool: ISerializerWithTestCases = bool as any;
Bool.cases = {
    all: () => !(makeRandomNumber(7) % 2),
    some: () => false
};
const FullJson: ISerializerWithTestCases = fullJson as any;
FullJson.cases = {
    all: () => {
        const props = makeRandomNumberBetween(3, 6);
        const prev: Record<string, string> = {};
        for (let i = 0; i < props; i++) {
            prev[makeRandomText(6, 1)] = makeRandomText(15, 4);
        }
        return prev;
    },
    some: () => null
};
function noop() { }