const repeatString = function(string, num) {
    let a = new String;
    for (let i = 0; i < num; i++) {
        a += string;
    };
    return a;
}

module.exports = repeatString
