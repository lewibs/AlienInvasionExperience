export function average(...vals) {
    return vals.reduce((a,b)=>a+b, 0) / vals.length;
}