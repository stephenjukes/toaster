// OPERATION FUNCTIONS
var add = function(a, b) { return a + b; }
var minus = function(a, b) { return a - b; }
var multiply = function(a, b) { return a * b; }
var divide = function(a, b) { return Math.round(a * 1e10 / b) / 1e10; }

// ARRAY AND DISPLAY INITIALIZATION
var origin  = [0, '+'];
var calc = origin;
var sub_result = false;
var screen = document.querySelector(".output");
screen.textContent = '';

function result(a, op, b) {
  switch(op) {
    case '+':
      screen.textContent = add(a,b);
      return add(a,b);
      break;
    case '-':
      screen.textContent = minus(a,b);
      return minus(a,b);
      break;
    case 'x':
      screen.textContent = multiply(a,b);
      return multiply(a,b);
      break;
    case '/':
      screen.textContent = divide(a,b);
      return divide(a,b);
      break;
  }
}

// REFRESH OR CONCATONATE
function display(digit) {
  if (sub_result === true) {
    screen.textContent = digit;
    sub_result = false;
  } else {
    screen.textContent += digit;
    console.log(calc);
  }
}

// CALCULATE FIRST THREE ELEMENTS
function merge(operation) {
  calc.push(Number(screen.textContent));
  calc.push(operation);
  calc.splice(0, 3, result(calc[0], calc[1], calc[2]));
  sub_result = true;
  console.log(calc);
}

// BUILD NUMBER OR PUSH TO ARRAY
var buttons = document.querySelectorAll(".display");
for(var i = 0; i < buttons.length; i++) {
  buttons[i].onclick = function() {
    if (this.textContent.match(/\d/)) {
      display(this.textContent);
    } 
    else {
      merge(this.textContent);
      screen.textContent = calc[0];
    }
  }
}

document.querySelector(".clear").onclick = function() {
  calc = [0, '+']; console.log(calc); screen.textContent = ''; }


document.querySelector(".equals").onclick = function() {
  calc.push(Number(screen.textContent));
  screen.textContent = result(calc[0], calc[1], calc[2]);
  calc = [0, '+'];
  sub_result = true;
}
