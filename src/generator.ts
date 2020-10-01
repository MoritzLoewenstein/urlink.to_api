export class IdGenerator {
  private len: number;
  constructor(len: number) {
    this.len = len;
  }

  getId(): string {
    const id = numberToId(this.len);
    this.len += 1;
    return id;
  }
}

const highest = 14776335;
const limits = [238328, 3844, 62, 1];
// prettier-ignore
const chars = [
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
];

function numberToId(n: number): string {
  if (n < 0 || n > highest) throw Error(`Invalid number: ${n}`);
  return limits.reduce((acc, limit) => {
    const amount = Math.trunc(n / limit);
    n -= amount * limit;
    return acc + chars[amount];
  }, "");
}
