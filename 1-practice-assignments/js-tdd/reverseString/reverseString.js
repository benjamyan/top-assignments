const reverseString = function(string) {
    let a = string.split('');
    let b = Object.values(a).reverse();
    let c = b.toString().replace(/[,]/g,'');
    return c;
};

module.exports = reverseString
