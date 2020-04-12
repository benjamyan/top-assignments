const palindromes = function(str) {
    let base, target, final; // declare variables intended for global use
    getTrimmed = ()=> {
        let strLower = str.toLowerCase(), // remove uppercase characters
            strTrim = strLower.replace(/[^a-zA-Z0-9]+/g, ''); // remove glyphs and spaces
        base = strTrim; // turn string into global variable to compare later
    };
    getFinal = ()=> {
        let arrFrom = Array.from(base), // turn string into an array
            arrReverse = arrFrom.reverse(), // reverse the array
            arrString = arrReverse.toString(); // change it back to a string
        target = arrString.replace(/,/g,''); // remove commas 
    };
    isPalindrome = ()=> target === base ? final = true : final = false; // compare final values
    getTrimmed(), getFinal(), isPalindrome(); // run functions
    return final; // return final value
}

module.exports = palindromes
