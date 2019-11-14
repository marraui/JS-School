export default function getStoredIntervals() {
  const intervals = JSON.parse(sessionStorage.getItem('intervals')) || {};
  return Object
    .keys(intervals || {})
    .sort()
    .map((key) => intervals[key]);
}
