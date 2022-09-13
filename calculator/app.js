var curDisplay = document.getElementById('display');
var result = document.getElementById('result');
var operator = document.querySelectorAll('.operator'); // operator buttons
var buttonDel = document.getElementById('del');
var buttonAC = document.getElementById('ac');
var buttonEqual = document.getElementById('equal');
var number = document.querySelectorAll('.num'); // 7 8 9 4 5 6 1 2 3 0 -> 0-9 position

for (let i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", function (e) {
        if (curDisplay.innerHTML == '0') {
            curDisplay.innerHTML = e.target.innerHTML;
        } else {
            curDisplay.innerHTML += e.target.innerHTML;
        }
    })
}

for (let i = 0; i < number.length; i++) {
    number[i].addEventListener("click", function (e) {
        if (curDisplay.innerHTML == '0') {
            curDisplay.innerHTML = e.target.innerHTML;
        } else {
            curDisplay.innerHTML += e.target.innerHTML;
        }
    });
}

buttonDel.addEventListener("click", function (e) {
    if (curDisplay.innerHTML != '0') {
        var temp = "";
        for (let i = 0; i < curDisplay.innerHTML.length - 1; i++) {
            temp += curDisplay.innerHTML[i];
        }
        if (temp.length != 0) {
            curDisplay.innerHTML = temp;
        } else {
            curDisplay.innerHTML = 0;
        }
    }
})
buttonAC.addEventListener("click", function (e) {
    if (curDisplay.innerHTML != '0') {
        curDisplay.innerHTML = "0";
        result.innerHTML = 'result';
    }
})
let str = curDisplay.innerHTML;
buttonEqual.addEventListener("click", function (e) {
    str = curDisplay.innerHTML;
    if (checkValidText()) {
        var values = str.split(/[*/+-]/);
        values = solve(values, '*');
        values = solve(values, '/');
        values = solve(values, '-');
        values = solve(values, '+');
        result.innerHTML = values;
    }
})

function checkValidText() {
    if (str[0] == '*' || str[0] == '/' || /[*/+-]/.test(str[str.length - 1])) {
        return false;
    }
    for (let i = 0; i < str.length - 1; i++) {
        if (/[*/+-]/.test(str[i]) && /[*/+-]/.test(str[i + 1])) {
            return false;
        }
    }
    return true;
}
function solve(values, type) {
    var flag = -1;
    switch (type) {
        case '*':
            for (let i = 0; i < str.length; i++) {
                if (/[*/+-]/.test(str[i])) {
                    flag++;
                }
                if (str[i] == '*') {
                    str = str.replace('*', '');
                    values[flag] *= values[flag + 1];
                    values.splice(flag + 1, 1);
                    i = 0;
                    flag = -1;
                }
            }
            break;
        case '/':
            for (let i = 0; i < str.length; i++) {
                if (/[*/+-]/.test(str[i])) {
                    flag++;
                }
                if (str[i] == '/') {
                    str = str.replace('/', '');
                    values[flag] /= values[flag + 1];
                    values.splice(flag + 1, 1);
                    i = 0;
                    flag = -1;
                }
            }
            break;
        case '-':
            for (let i = 0; i < str.length; i++) {
                if (/[*/+-]/.test(str[i])) {
                    flag++;
                }
                if (str[i] == '-') {
                    str = str.replace('-', '');
                    values[flag] -= values[flag + 1];
                    values.splice(flag + 1, 1);
                    i = 0;
                    flag = -1;
                }
            }
            break;
        case '+':
            const initialValue = 0;
            const sumWithInitial = values.reduce(
                (previousValue, currentValue) => Number(previousValue) + Number(currentValue),
                initialValue
            );
            return sumWithInitial;
    }
    return values;
}


