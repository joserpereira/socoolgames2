class NumbersUtils {
    formatDecimals(number: string, decimals: number) {
        return parseFloat(number).toFixed(decimals);
    }

}

export default new NumbersUtils();