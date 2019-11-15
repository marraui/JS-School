export default function getStoredIntervals() {
  const intervals = JSON.parse(localStorage.getItem('intervals')) || {};
  return Object
    .keys(intervals || {})
    .sort()
    .map((key) => intervals[key]);
}
