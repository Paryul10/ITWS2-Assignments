function myArrayFilter(arr, callback) {
    var temp = [];
    var ind = 0;
    for (i = 0; i < arr.length; i++) {
        if (callback(arr[i], i, arr)) {
            temp[ind] = arr[i];
            ind++;
        }
    }
    return temp;
}

function myArrayReduce(arr, callback, acc) {
    var flag = 0;
    if (acc == undefined) {
        acc = arr[0];
        flag = 1;
    }
    if (flag == 0) {
        for (i = 0; i < arr.length; i++) {
            acc = callback(acc, arr[i], i, arr);
        }
    } else {
        for (i = 1; i < arr.length; i++) {
            acc = callback(acc, arr[i], i, arr);
        }
    }
    return acc;
}

function myTreeReduce(inFunc, endFunc) {
    function treereduce(tree) {
        var sum = 0;
        if (tree.type == 'in') {
            if (tree.left != undefined && tree.right != undefined) {
                sum += inFunc(tree.value, treereduce(tree.left), treereduce(tree.right));
            } else if (tree.left != undefined && tree.rigth == undefined) {
                sum += inFunc(tree.value, treereduce(tree.left), 0);
            } else if (tree.left == undefined && tree.rigth != undefined) {
                sum += inFunc(tree.value, 0, treereduce(tree.right));
            }
        } else {
            sum += endFunc(tree.value);
        }
        return sum;
    }
    return treereduce;
}

function myTreeSize(tree) {
    function inFunc(tree, left, right) {
        if (left==undefined && right!=undefined)
            return (1+right);
        else if (left!=undefined && right == undefined)
            return (1+left);
        else if (left!=undefined && right!=undefined)
            return (1 + left + right);
    }

    function endFunc(tree) {
        return 1;
    }

    var x = myTreeReduce(inFunc, endFunc);
    return x(tree);
}

function myTreeTraversal(type) {
    var arr = [];

    function pre(tree) {
        if (tree) {
            arr.push(tree.value);
            pre(tree.left);
            pre(tree.right);
        }
        return arr;
    }

    function inorder(tree) {
        if (tree) {
            inorder(tree.left);
            arr.push(tree.value);
            inorder(tree.right);
        }
        return arr;
    }

    function post(tree) {
        if (tree) {
            post(tree.left);
            post(tree.right);
            arr.push(tree.value);
        }
        return arr;
    }

    if (type == 'in') {
        return inorder;
    } else if (type == 'pre') {
        return pre;
    } else if (type == 'post') {
        return post;
    }
}

function hangman(phrase) {
    const gameOver = "Game over!!!";
    const won = "You\'ve got it!!! Final phrase:";
    const wrong = "Incorrect guess!!!";
    const lost = "You\'ve lost!!! Correct phrase:";

    var temp = [];
    var mistakes = 3;
    var count = 0;
    for (i = 0; i < phrase.length; i++) {
        temp[i] = '_';
    }
    var m = 0;

    function game(letter) {
        if (m == 1) {
            return (gameOver);
        }

        while (mistakes > 0) {
            var flag = 0;
            for (i = 0; i < phrase.length; i++) {
                if (letter == phrase[i]) {
                    if (temp[i] == '_') {
                        temp[i] = phrase[i];
                        count++;
                    }
                    flag = 1;
                }
            }
            if (count == phrase.length) {
                m = 1;
                return (won + " " + phrase);
            } else if (flag == 1 && count != phrase.length) {
                var str = temp[0];
                for (var k = 1; k < phrase.length; k++)
                    str = (str + " " + temp[k]);
                return str;
            } else if (flag == 0) {
                mistakes--;
                if (mistakes == 0) {
                    m = 1;
                    return (lost + " " + phrase);
                }
                return wrong;
            }
        }
        return (gameOver);
    }
    return game;
}

function Person(name, age) {
    this.name = name;
    this.age = age;
    Person.prototype.about = function() {
        return "My name is " + this.name + " and I\'m " + this.age + " yrs old.";
    };
}

function Student(name, age, roll) {
    Person.call(this, name, age);
    this.roll = roll;
    Student.prototype.id = function() {
        return "Student Id: " + roll;
    };
    Student.prototype.__proto__ = Person.prototype;
}

const numberList = {
    numbers: [],
    set add(val) {
        this.numbers.push(val);
    },
    get sum() {
        var i;
        var sum = 0;
        for (i = 0; i < this.numbers.length; i++) {
            sum += this.numbers[i];
        }
        return sum;
    },
    get average() {
        var i;
        var sum = 0;
        var n = this.numbers.length;
        for (i = 0; i < n; i++) {
            sum += this.numbers[i];
        }
        var avg = sum / n;
        return avg;
    },
};

function carRace(cars, finish) {
    Promise.race(cars).then(car => finish(car.name + ' won in ' + car.time + ' seconds!!!'));
}

module.exports = {
    myArrayFilter,
    myArrayReduce,
    myTreeReduce,
    myTreeSize,
    myTreeTraversal,
    hangman,
    Person,
    Student,
    numberList,
    carRace
};