class DateTimeUtils {

    getWeekDays() {
        return ["Sun.","Mon.","Tue.","Wed.","Thu.","Fri.","Sat.   "];
    }
    format_two_digits(n: number) {
        return n < 10 ? '0' + n : n;
    }

    formatUTCDateToUser(value: string) {
        try {
            const date = new Date(value);
            return date.toLocaleDateString() + " " + date.toLocaleTimeString().substring(0, 5);
        } catch (err: any) {
            console.error(err);
            return "";
        }

    }

    formatUTCDateOptionalToUser(value: string, onlyDate: boolean) {
      if (onlyDate) return this.formatUTCDateToUser(value).substring(0, 10);
      return this.formatUTCDateToUser(value).substring(0, 16);
    }

    formatDate(value: string) {
        const date = new Date(value);
        return this.format_two_digits(date.getHours()) + ":" + this.format_two_digits(date.getMinutes())
    }

    addMonths(date: Date, months: number) {
        const dt = new Date(date)
        dt.setMonth(dt.getMonth() + months);
        return dt;
    }

    addYears(date: Date, years: number) {
        const dt = new Date(date)
        dt.setFullYear(dt.getFullYear() + years);
        return dt;
    }

    getTimeHHmm(date: any) {
      const value = typeof date == "string" ? new Date(date) : date;
      return value?.toLocaleTimeString()?.substring(0, 5);
    }

    getIntervalFromEvent(startDate: any, endDate: any) {
      if (startDate && endDate) {
        return this.getTimeHHmm(startDate) + " - " + this.getTimeHHmm(endDate);
      }
      return "";
    }

    getTimeInterval(startDate: any, endDate: any) {
      return this.getTimeHHmm(startDate) + " - " + this.getTimeHHmm(endDate);
    }
}

export default new DateTimeUtils();