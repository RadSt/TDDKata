import assert from 'assert';

function Calculate(inputStr){
    if(inputStr == '')
        return 0;
    if(isContainNewLine(inputStr)){
        return CalculateStringWithNewLines(inputStr);
    }

    let numbers = SplitStringWithCommaToArray(inputStr);

    if(numbers.length > 3){
        return CalculateMoreThreeNumbers(numbers);
    }

    return CalculateThreeNumbers(numbers);
}

function isContainNewLine(inputStr) {
    if(inputStr.includes("\n")){
        return true;
    }
    return false;
}

function SplitStringWithCommaToArray(inputStr){
    return inputStr.split(",");
}

function SplitStringWithNewLineToArray(inputStr){
    return inputStr.split("\n");
}

function CalculateMoreThreeNumbers(numbers){

    return numbers.reduce(function(a, b){return Number(a) + Number(b);})
}

function CalculateThreeNumbers(numbers){
    let sum = 0;
    numbers.forEach( x => {
        sum += Number(x);
    });
    return sum;
}

function CalculateStringWithNewLines(inputStr){
   let arrayWithNewLines = SplitStringWithCommaToArray(inputStr);
    let tempArray = new Array();
    arrayWithNewLines.forEach( x => {
        if(isContainNewLine(x)){
            [].push.apply(tempArray, SplitStringWithNewLineToArray(x));
        }else{
            tempArray.push(x);
        }
    })
    return CalculateMoreThreeNumbers(tempArray)
}

suite('Calculator test', function () {
    suite('when input is empty', function () {
        test('return 0', function() {
            let inputStr = '';
            let result = Calculate(inputStr);
            assert.equal(result, 0);
        });
    });

    suite('when input is "1, 2, 3"', function () {
        test('return 6', function() {
            let inputStr = '1, 2, 3';
            let result = Calculate(inputStr);
            assert.equal(result, 6);
        });
    });

    suite('when input is more unknown amount of numbers', function () {
        test('return sum of numbers', function() {
            let inputStr = '1, 2, 3, 4, 5';
            let result = Calculate(inputStr);
            assert.equal(result, 15);
        });
    });

    suite('when input contains new lines between numbers "1\n2,3" ', function () {
        test('return 6', function() {
            let inputStr = "1\n2,3";
            let result = Calculate(inputStr);
            assert.equal(result, 6);
        });
    });

});