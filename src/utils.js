/**
 * Convert timecodes:string to seconds:number
 */
export function tc2ms(tc) {
    var sec = tc
        .split(':')
        // Convert individual parts to floats
        .map(parseFloat)
        // Aggregate minutes and hours to seconds
        .reverse()
        .map(function(n, i) {
            return Math.pow(60, i) * n;
        })
        .reduce(function(a, b) {
            return a + b;
        });

    return Math.round(sec * 1000);
}
