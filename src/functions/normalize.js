export function normalize(min, max) {
    var delta = max - min;
    return function normalizeThis(val) {
        return (val - min) / delta;
    };
}