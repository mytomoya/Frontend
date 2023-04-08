export const formatDate = (jstTime: string): string => {
    const jstDate = new Date(jstTime);
    jstDate.setTime(jstDate.getTime() + 1000 * 60 * 60 * 9);

    const year = jstDate.getFullYear().toString().padStart(4, "0");
    const month = (jstDate.getMonth() + 1).toString().padStart(2, "0");
    const day = jstDate.getDate().toString().padStart(2, "0");
    const hours = jstDate.getHours().toString().padStart(2, "0");
    const minutes = jstDate.getMinutes().toString().padStart(2, "0");
    const seconds = jstDate.getSeconds().toString().padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
