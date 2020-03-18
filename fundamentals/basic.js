function ChangeCase(str, choice) {
    if (choice === "U") return str.toUpperCase();
    if (choice === "L") return str.toLowerCase();
    return str;
}

let u = ChangeCase('Mahesh', 'U');
console.log(u);

let l = ChangeCase('Mahesh', 'L');
console.log(l);