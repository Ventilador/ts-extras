import { loadMethods } from "./loadMethods";

export function loadLangServiceTests() {
    return loadMethods()
        .then(requireMethods);
}

function requireMethods(path: string[]) {
    path.forEach(require);
}
