export function getFullHours() {
  const now = new Date();
  const hours = now.getHours().toString(10).padStart(2, "0");
  const minutes = now.getMinutes().toString(10).padStart(2, "0");
  const fullHours = `${hours}h${minutes}`;

  return fullHours;
}
