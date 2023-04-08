export const formatDate = (unixTime: number): string => {
    const date = new Date(unixTime);

    // Get the year, month, and day.
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    // Get the hours, minutes, and seconds.
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    // Return the formatted date.
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
