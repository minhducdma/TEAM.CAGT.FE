export class DateUtil {
    static getNow(): string {
        return new Date().toISOString();
    }

    static getFullDate(newDate: string) {
        if (!newDate) {
            return;
        }

        const today = new Date(newDate);
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy = today.getFullYear();
        return `${yyyy}-${mm}-${dd}`;
    }

    static getFullDateTime(newDate: string) {
        if (!newDate) {
            return;
        }

        const today = new Date(newDate);
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const hh = String(today.getHours()).padStart(2, '0');
        const ss = String(today.getMinutes()).padStart(2, '0');
        const yyyy = today.getFullYear();
        return `${yyyy}-${mm}-${dd}T${hh}:${ss}`;
    }

    static convertMonthYearToDateTime(month: number, year: number) {
        const date = new Date();
        date.setMonth(month);
        date.setFullYear(year);
        return date;
    }
}
