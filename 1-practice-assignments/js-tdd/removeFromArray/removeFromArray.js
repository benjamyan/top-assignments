const removeFromArray = function(input, ...val) {
    var output = [];
    val.forEach((current)=>{
        let i = 0;
        for (i < input.length;i++; ) {
          if (input[i] !== val[i]) output.push(input[i])
        };
    });
    return output;
}

module.exports = removeFromArray