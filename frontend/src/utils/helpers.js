// Converts tags from comma-separated string to array, trims spaces
export function parseTags(tagString) {
  return tagString
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
}

// Formats date to readable string
export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString();
}

// Capitalizes the first letter of a string
export function capitalize(str) {
  return str && str.length
    ? str.charAt(0).toUpperCase() + str.slice(1)
    : "";
}
