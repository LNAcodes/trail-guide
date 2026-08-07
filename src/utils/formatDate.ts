export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
