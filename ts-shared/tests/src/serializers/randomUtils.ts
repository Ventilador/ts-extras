
export function makeRandomNumber(max: number) {
    return (Math.floor(Math.random() * 32416190071) % max);
}

export function makeRandomNumberBetween(start: number, end: number) {
    return makeRandomNumber(end - start) + start;
}

export function makeRandomChar() {
    return String.fromCharCode(makeRandomNumber(86) + 40);
}

export function makeRandomText(maxSize: number, shift: number = 0) {
    const size = makeRandomNumber(maxSize - shift) + shift;
    const arr: string[] = new Array(size);
    for (let i = 0; i < size; i++) {
        arr[i] = makeRandomChar();
    }
    return arr.join('');
}

