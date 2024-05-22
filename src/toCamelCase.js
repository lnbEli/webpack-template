export default function toCamelCase(str) {
  let answer = str.toLowerCase();
  return answer
    .split(" ")
    .reduce((s, c) => s + (c.charAt(0).toUpperCase() + c.slice(1)));
}
