export default function formatDate(date: Date): string {
    const fullDate = date.toLocaleString();

    return `${fullDate}`;
}