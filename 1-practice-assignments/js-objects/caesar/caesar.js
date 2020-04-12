// create an array of all letter in alphabet | this seems bulky
const letters = Array.from( {length:26 }, (_, i) => String.fromCharCode('a'.charCodeAt(0) + i));
let target, final; // declare global variables to be used

getIndex = (element)=> { // find the index of current letter
    let a = element.toLowerCase(), // change to lower case
        b = letters.indexOf(a); // get index of current
    if (b >= 0) return b // if character isnt a glyph
    else return a // if is a glyph or whitespace
}
getNew = (ind, num)=> { // finds new character based on index and number given
    function newIndex(i,n) { // callback function for return
        let c = i + n, // calc base value
            d = letters.length; // call variable for array length
        do { // run function recursively
            c === d ? c = d - c : c > d ? c = c - d : c = d + c;
            // if statement version of trinary
            /*if (c === d) c = d - c; // if equal to 26
            if (c > d) c = c - d; // if great than 26
            if (c < 0) c = d + c; // if less than 0*/
        } while (c >= d) return c // return final value
    }
    return letters[newIndex(ind, num)] // return value from function
}
getFinal = ()=> { // capitalizes necessary items and returns a string
    let e = [0], // declare the first letter
        f = e.push(target.findIndex(element => /\s/g.test(element)) + 1); // test for whitespace and get element after
    e.forEach(function(current){ // loop through each element pushed to e
        target[current] = target[current].toUpperCase(); // capitalize the current element
    });
    return target.join('') // return value from function
}

const caesar = function(str, num) {
    target = new Array(); // creates a new array for each call
    Array.from(str).forEach(function(current){ // convert string to array and loop through it
        let ind = getIndex(current); // selects current element in array
        // determine either a new character or glyph is pushed to target array
        !isNaN(parseInt(ind)) ? target.push(getNew(ind, num)) : target.push(ind);
    });
    return getFinal() // return final value from function
}

module.exports = caesar
