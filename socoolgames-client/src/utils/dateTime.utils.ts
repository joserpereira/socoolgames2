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

    getDateText(date: any) {
      const value = typeof date == "string" ? new Date(date) : date;
      if (isNaN(value?.getTime())) return "";
      
      return this.formatRelativeDate(value);
      //return this.getWeekDays()[value.getDay()] + " " + value.getDate() + "/" + (value.getMonth() + 1);
    }

    formatRelativeDate(date: any) {
        const now = new Date();

        const diffMs = now.getTime() - date.getTime();
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        // < 1 hora → "x minutes ago"
        if (diffMinutes < 60) {
            return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
        }

        // < 12 horas → "x hours ago"
        if (diffHours < 12) {
            return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
        }

        // < 24 horas → "HH:mm"
        if (diffHours < 24) {
            if (date.getDate() === now.getDate()) {
                return "Today " + date.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
                });
            } else {
                return "Yesterday " + date.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
                });
            }
        }

        // < 7 dias → "weekday HH:mm"
        if (diffDays < 7) {
            return date.toLocaleString([], {
            weekday: 'short',
            hour: '2-digit',
            minute: '2-digit'
            });
        }

        // >= 7 dias → "YYYY-MM-DD HH:mm"
        return date.toLocaleString([], {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

export default new DateTimeUtils();