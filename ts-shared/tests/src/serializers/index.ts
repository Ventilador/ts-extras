import { getSerializerFiles } from "./getSerializers";
import { requireSerializers } from "./requireSerializer";
import { readDecoratorsMetadata } from "./readDecoratorsMetadata";
import { generateCases } from "./generateCases";
import { prepareTests } from "./prepareTests";
import Jasmine = require('jasmine');

export function loadSerializersTests(instance: Jasmine) {
    return getSerializerFiles()
        .then(requireSerializers)
        .then(readDecoratorsMetadata)
        .then(generateCases)
        .then(files => prepareTests(files, instance))
}