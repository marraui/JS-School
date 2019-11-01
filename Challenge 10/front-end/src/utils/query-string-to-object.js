export default function queryStringToObject(query) {
  return Object.fromEntries(new URLSearchParams(query));
}
