// Convert time in ISO format to a more readable format
export function formatTime(isoString) {
    if (typeof isoString !== "string") return "";

    const timestamp = new Date(isoString);
    if (Number.isNaN(timestamp.getTime())) return "";

    const date = timestamp.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    const hours = timestamp.getHours();
    const minutes = timestamp.getMinutes().toString().padStart(2, "0");

    const period = hours >= 12 ? "PM" : "AM";
    const hour12 = hours % 12 || 12;

    const time = `${hour12}:${minutes} ${period}`;

    return `${time} [ ${date} ]`;
}
