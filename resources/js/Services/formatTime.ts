export default function formatTime(time: string): string {
    const [hours, minutes, seconds] = time.split(':');

    return `${hours}:${minutes}`;
}