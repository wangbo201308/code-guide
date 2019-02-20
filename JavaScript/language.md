
# 语言规范
<a name="tabel-contents"></a>
## 目录
  - [1]. [类型](#types)
  - [2]. [引用](#references)
  - [3]. [对象](#objects)
  - [4]. [数组](#arrays)
  - [5]. [解构赋值](#destructuring)
  - [6]. [字符串](#strings)
  - [7 ]. [函数](#functions)
  - [8]. [箭头函数](#arrow-functions)
  - [9]. [类 & 构造函数](#classes--constructors)
  - [10]. [模块](#modules)
  - [11]. [Iterators and Generators](#iterators-and-generators)
  - [12]. [对象属性](#properties)
  - [13]. [变量](#variables)
  - [14]. [Hoisting](#hoisting)
  - [15]. [Comparison Operators & Equality](#comparison-operators--equality)
  - [16]. [Blocks](#blocks)
  - [17]. [空格](#whitespace)
  - [18]. [逗号](#commas)
  - [19]. [分号](#semicons)

<a name="types"></a>
## 类型

  - [1.1](#types--primitives) **基本类型**:

    - `string`
    - `number`
    - `boolean`
    - `null`
    - `undefined`
    - `symbol`

    ```javascript
    const foo = 1;
    let bar = foo;
    
    bar = 9;
    
    console.log(foo, bar); // => 1, 9
    ```

    - Symbol不能很好地被polyfill， 所以当目标浏览器或者环境本身不支持时不应该使用。

  <a name="types--complex"></a><a name="1.2"></a>
  - [1.2](#types--complex)  **引用类型**:

    - `object`
    - `array`
    - `function`

    ```javascript
    const foo = [1, 2];
    const bar = foo;

    bar[0] = 9;

    console.log(foo[0], bar[0]); // => 9, 9
    ```

**[⬆ back to top](#table-contents)**
<a name="references"></a>
## 引用

  <a name="references--prefer-const"></a><a name="2.1"></a>
  - [2.1](#references--prefer-const) 对所有引用使用 `const`， 避免使用 `var`。 eslint: [`prefer-const`](https://eslint.org/docs/rules/prefer-const.html), [`no-const-assign`](https://eslint.org/docs/rules/no-const-assign.html)
    - 因为这样可以确保引用不会被重新赋值，从而可以避免很多bug并且提高代码的可读性。
    ```javascript
    // bad
    var a = 1;
    var b = 2;

    // good
    const a = 1;
    const b = 2;
    ```

  <a name="references--disallow-var"></a><a name="2.2"></a>
  - [2.2](#references--disallow-var) 如果引用是可变的，则使用 `let` 而不是 `var`。eslint: [`no-var`](https://eslint.org/docs/rules/no-var.html)

    ```javascript
    // bad
    var count = 1;
    if (true) {
      count += 1;
    }

    // good, use the let.
    let count = 1;
    if (true) {
      count += 1;
    }
    ```

  <a name="references--block-scope"></a><a name="2.3"></a>
  - [2.3](#references--block-scope) 注意 `let` 和 `const` 都是块级作用域，而 `var` 是函数级作用域。

    ```javascript
    // const and let only exist in the blocks they are defined in.
    {
      let a = 1;
      const b = 1;
    }
    console.log(a); // ReferenceError
    console.log(b); // ReferenceError
    ```

**[⬆ back to top](#table-contents)**
<a name="objects"></a>
## 对象

  <a name="objects--no-new"></a><a name="3.1"></a>
  - [3.1](#objects--no-new) 使用对象字面量创建对象。 eslint: [`no-new-object`](https://eslint.org/docs/rules/no-new-object.html)

    ```javascript
    // bad
    const item = new Object();

    // good
    const item = {};
    ```

  - [3.2](#es6-object-shorthand) 请使用对象方法的简写形式。eslint: [`object-shorthand`](https://eslint.org/docs/rules/object-shorthand.html)

    ```javascript
    // bad
    const atom = {
      value: 1,

      addValue: function (value) {
        return atom.value + value;
      },
    };

    // good
    const atom = {
      value: 1,

      addValue(value) {
        return atom.value + value;
      },
    };
    ```

  <a name="es6-object-concise"></a><a name="3.3"></a>
  - [3.3](#es6-object-concise) 请使用对象属性的简写形式。 eslint: [`object-shorthand`](https://eslint.org/docs/rules/object-shorthand.html)

    ```javascript
    const lukeSkywalker = 'Luke Skywalker';
    
    // bad
    const obj = {
      lukeSkywalker: lukeSkywalker,
    };
    
    // good
    const obj = {
      lukeSkywalker,
    };
    ```

  <a name="objects--grouped-shorthand"></a><a name="3.4"></a>
  - [3.4](#objects--grouped-shorthand) 请将简写的对象属性都置于对象声明的起始位置。 

    > 因为这样更容易分别哪些属性是简写的。

    ```javascript
    const anakinSkywalker = 'Anakin Skywalker';
    const lukeSkywalker = 'Luke Skywalker';
    
    // bad
    const obj = {
      episodeOne: 1,
      twoJediWalkIntoACantina: 2,
      lukeSkywalker,
      episodeThree: 3,
      mayTheFourth: 4,
      anakinSkywalker,
    };
    
    // good
    const obj = {
      lukeSkywalker,
      anakinSkywalker,
      episodeOne: 1,
      twoJediWalkIntoACantina: 2,
      episodeThree: 3,
      mayTheFourth: 4,
    };
    ```

  <a name="objects--quoted-props"></a><a name="3.5"></a>
  - [3.5](#objects--quoted-props) 仅对非法标识符的对象属性使用引号。eslint: [`quote-props`](https://eslint.org/docs/rules/quote-props.html)

    > 因为总体上我们认为这样更易于阅读，可以改善语法高亮，而且也更容易被很多JS引擎优化。

    ```javascript
    // bad
    const bad = {
      'foo': 3,
      'bar': 4,
      'data-blah': 5,
    };
    
    // good
    const good = {
      foo: 3,
      bar: 4,
      'data-blah': 5,
    };
    ```

  <a name="objects--prototype-builtins"><a name="3.6"></a>
  - [3.6](#objects--prototype-builtins) 不要直接调用 `Object.prototype` 的方法，例如：`hasOwnProperty`、`propertyIsEnumerable` 和 `isPrototypeOf`。eslint: [`no-prototype-builtins`](https://eslint.org/docs/rules/no-prototype-builtins)
    > 因为这些方法可能会被对象的属性覆盖，例如 `{ hasOwnProperty: false }` , 或者对象可能是一个空对象 (`Object.create(null)`)。

    ```javascript
    // bad
    console.log(object.hasOwnProperty(key));

    // good
    console.log(Object.prototype.hasOwnProperty.call(object, key));

    // best
    const has = Object.prototype.hasOwnProperty; // cache the lookup once, in module scope.
    /* or */
    import has from 'has'; // https://www.npmjs.com/package/has
    // ...
    console.log(has.call(object, key));
    ```

  <a name="objects--rest-spread"><a name="3.7"></a>
  - [3.7](#objects--rest-spread) 对象进行浅拷贝时请使用对象的扩展运算符而不是 [`Object.assign`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)。使用对象的rest解构运算符获得一个某些属性被省略的新对象。

    ```javascript
    // very bad
    const original = { a: 1, b: 2 };
    const copy = Object.assign(original, { c: 3 }); // this mutates `original` ಠ_ಠ
    delete copy.a; // so does this
    
    // bad
    const original = { a: 1, b: 2 };
    const copy = Object.assign({}, original, { c: 3 }); // copy => { a: 1, b: 2, c: 3 }
    
    // good
    const original = { a: 1, b: 2 };
    const copy = { ...original, c: 3 }; // copy => { a: 1, b: 2, c: 3 }
    
    const { a, ...noA } = copy; // noA => { b: 2, c: 3 }
    ```

**[⬆ back to top](#table-contents)**
<a name="arrays"></a>
## 数组

  <a name="arrays--literals"></a><a name="4.1"></a>
  - [4.1](#arrays--literals) 使用字面量语法创建数组。 eslint: [`no-array-constructor`](https://eslint.org/docs/rules/no-array-constructor.html)

    ```javascript
    // bad
    const items = new Array();
    
    // good
    const items = [];
    ```

  <a name="arrays--push"></a><a name="4.2"></a>
  - [4.2](#arrays--push) 使用 [Array#push](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/push) 向数组中添加元素而不是直接复制。

    ```javascript
    const someStack = [];

    // bad
    someStack[someStack.length] = 'abracadabra';

    // good
    someStack.push('abracadabra');
    ```

  <a name="es6-array-spreads"></a><a name="4.3"></a>
  - [4.3](#es6-array-spreads) 使用扩展运算符 `...` 复制数组。

    ```javascript
    // bad
    const len = items.length;
    const itemsCopy = [];
    let i;
    
    for (i = 0; i < len; i += 1) {
      itemsCopy[i] = items[i];
    }
    
    // good
    const itemsCopy = [...items];
    ```
    ```javascript
    
    ```

  <a name="arrays--from-array-like"></a>

  <a name="arrays--callback-return"></a><a name="4.4"></a>
  - [4.4](#arrays--callback-return) 使用数组的 `map` 等方法时，请使用`return`声明。如果是单一声明语句，可省略`return`。eslint: [`array-callback-return`](https://eslint.org/docs/rules/array-callback-return)

    ```javascript
    // good
    [1, 2, 3].map((x) => {
      const y = x + 1;
      return x * y;
    });

    // good
    [1, 2, 3].map(x => x + 1);

    // bad - no returned value means `acc` becomes undefined after the first iteration
    [[0, 1], [2, 3], [4, 5]].reduce((acc, item, index) => {
      const flatten = acc.concat(item);
      acc[index] = flatten;
    });

    // good
    [[0, 1], [2, 3], [4, 5]].reduce((acc, item, index) => {
      const flatten = acc.concat(item);
      acc[index] = flatten;
      return flatten;
    });

    // bad
    inbox.filter((msg) => {
      const { subject, author } = msg;
      if (subject === 'Mockingbird') {
        return author === 'Harper Lee';
      } else {
        return false;
      }
    });

    // good
    inbox.filter((msg) => {
      const { subject, author } = msg;
      if (subject === 'Mockingbird') {
        return author === 'Harper Lee';
      }

      return false;
    });
    ```

  <a name="arrays--bracket-newline"></a>
  - [4.5](#arrays--bracket-newline)  如果数组有多行，在数组的开括号 `[` 和 `]`闭括号前换行。

    ```javascript
    // bad
    const arr = [
      [0, 1], [2, 3], [4, 5],
    ];
    
    const objectInArray = [{
      id: 1,
    }, {
      id: 2,
    }];
    
    const numberInArray = [
      1, 2,
    ];
    
    // good
    const arr = [[0, 1], [2, 3], [4, 5]];
    
    const objectInArray = [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ];
    
    const numberInArray = [
      1,
      2,
    ];
    ```

**[⬆ back to top](#table-contents)**
<a name="destructuring"></a>
## 解构赋值

  <a name="destructuring--object"></a><a name="5.1"></a>
  - [5.1](#destructuring--object) 获取或使用对象的多个属性时使用对象的解构赋值。 eslint: [`prefer-destructuring`](https://eslint.org/docs/rules/prefer-destructuring)

    > Why? 解构赋值可以避免为这些属性创建临时遍量。

    ```javascript
    // bad
    function getFullName(user) {
      const firstName = user.firstName;
      const lastName = user.lastName;

      return `${firstName} ${lastName}`;
    }

    // good
    function getFullName(user) {
      const { firstName, lastName } = user;
      return `${firstName} ${lastName}`;
    }

    // best
    function getFullName({ firstName, lastName }) {
      return `${firstName} ${lastName}`;
    }
    ```

  <a name="destructuring--array"></a><a name="5.2"></a>
  - [5.2](#destructuring--array) 使用数组的解构赋值。eslint: [`prefer-destructuring`](https://eslint.org/docs/rules/prefer-destructuring)

    ```javascript
    const arr = [1, 2, 3, 4];

    // bad
    const first = arr[0];
    const second = arr[1];

    // good
    const [first, second] = arr;
    ```

  <a name="destructuring--object-over-array"></a><a name="5.3"></a>
  - [5.3](#destructuring--object-over-array) 有多个返回值时，使用对象的解构赋值, 而不是数组的解构赋值。

    ```javascript
    // bad
    function processInput(input) {
      // then a miracle occurs
      return [left, right, top, bottom];
    }

    // the caller needs to think about the order of return data
    const [left, __, top] = processInput(input);

    // good
    function processInput(input) {
      // then a miracle occurs
      return { left, right, top, bottom };
    }

    // the caller selects only the data they need
    const { left, top } = processInput(input);
    ```

**[⬆ back to top](#table-contents)**
<a name="strings"></a>
## 字符串

  <a name="strings--quotes"></a><a name="6.1"></a>
  - [6.1](#strings--quotes) 字符串统一使用单引号`''`。 eslint: [`quotes`](https://eslint.org/docs/rules/quotes.html)

    ```javascript
    // bad
    const name = "Capt. Janeway";

    // bad - template literals should contain interpolation or newlines
    const name = `Capt. Janeway`;

    // good
    const name = 'Capt. Janeway';
    ```

  <a name="strings--line-length"></a><a name="6.2"></a>
  - [6.2](#strings--line-length) 超过100个字符的字符串不应多行展示并用字符串连接。

    > Why? 字符串片段不易被检索且使用起来比较痛苦。

    ```javascript
    // bad
    const errorMessage = 'This is a super long error that was thrown because \
    of Batman. When you stop to think about how Batman had anything to do \
    with this, you would get nowhere \
    fast.';

    // bad
    const errorMessage = 'This is a super long error that was thrown because ' +
      'of Batman. When you stop to think about how Batman had anything to do ' +
      'with this, you would get nowhere fast.';

    // good
    const errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';
    ```

  <a name="es6-template-literals"></a><a name="6.4"></a>
  - [6.3](#es6-template-literals) 当程序化地创建字符串时，使用模板字符串而不是字符串连接方法。eslint: [`prefer-template`](https://eslint.org/docs/rules/prefer-template.html) [`template-curly-spacing`](https://eslint.org/docs/rules/template-curly-spacing)

    ```javascript
    // bad
    function sayHi(name) {
      return 'How are you, ' + name + '?';
    }

    // bad
    function sayHi(name) {
      return ['How are you, ', name, '?'].join();
    }

    // bad
    function sayHi(name) {
      return `How are you, ${ name }?`;
    }

    // good
    function sayHi(name) {
      return `How are you, ${name}?`;
    }
    ```

**[⬆ back to top](#table-contents)**
<a name="functions"></a>
## 函数

  <a name="functions--declarations"></a><a name="7.1"></a>
  - [7.1](#functions--declarations) 使用命名函数表达式而不是函数声明。eslint: [`func-style`](https://eslint.org/docs/rules/func-style)

    > Why? 因为函数声明会被提升，这意味着在被定义之前它很容易被引用，这会导致可读性和可维护性下降。

    ```javascript
    // bad
    function foo() {
      // ...
    }

    // bad
    const foo = function () {
      // ...
    };

    // good
    // lexical name distinguished from the variable-referenced invocation(s)
    const short = function longUniqueMoreDescriptiveLexicalFoo() {
      // ...
    };
    ```

  <a name="functions--iife"></a><a name="7.2"></a>
  - [7.2](#functions--iife) 使用圆括号包裹立即执行函数。eslint: [`wrap-iife`](https://eslint.org/docs/rules/wrap-iife.html)

    ```javascript
    // immediately-invoked function expression (IIFE)
    (function () {
      console.log('Welcome to the Internet. Please follow me.');
    }());
    ```

  <a name="functions--in-blocks"></a><a name="7.3"></a>
  - [7.3](#functions--in-blocks) 不要在非函数代码块内 (`if`, `while` 等)声明函数，而是将函数赋值给变量。 浏览器会允许这样做，但所有浏览器解析方式不尽相同。eslint: [`no-loop-func`](https://eslint.org/docs/rules/no-loop-func.html)
    ```javascript
    // bad
    if (currentUser) {
      function test() {
        console.log('Nope.');
      }
    }
    
    // good
    let test;
    if (currentUser) {
      test = () => {
        console.log('Yup.');
      };
    }
    ```
    <a name="functions--arguments-shadow"></a><a name="7.4"></a>
  - [7.4](#functions--arguments-shadow) 不要将参数命名为 `arguments` 。它的优先级会高于函数作用域中的 `arguments` 对象。 

    ```javascript
    // bad
    function foo(name, options, arguments) {
      // ...
    }
    
    // good
    function foo(name, options, args) {
      // ...
    }
    ```

  <a name="es6-rest"></a><a name="7.5"></a>
  - [7.5](#es6-rest) 使用扩展运算符 `...` 而不要使用 `arguments` 对象。eslint: [`prefer-rest-params`](https://eslint.org/docs/rules/prefer-rest-params)

    > Why? `...` 对于你想使用的参数非常明确。另外, rest 参数是一个真实的数组，而 `arguments` 是类数组。

    ```javascript
    // bad
    function concatenateAll() {
      const args = Array.prototype.slice.call(arguments);
      return args.join('');
    }
    
    // good
    function concatenateAll(...args) {
      return args.join('');
    }
    ```

  <a name="es6-default-parameters"></a><a name="7.6"></a>
  - [7.6](#es6-default-parameters) 使用默认参数语法而不是改变函数参数。

    ```javascript
    // really bad
    function handleThings(opts) {
      // No! We shouldn’t mutate function arguments.
      // Double bad: if opts is falsy it'll be set to an object which may
      // be what you want but it can introduce subtle bugs.
      opts = opts || {};
      // ...
    }
    
    // still bad
    function handleThings(opts) {
      if (opts === void 0) {
        opts = {};
      }
      // ...
    }
    
    // good
    function handleThings(opts = {}) {
      // ...
    }
    ```

  <a name="functions--defaults-last"></a><a name="7.7"></a>
  - [7.7](#functions--defaults-last) 将默认参数置于最后。

    ```javascript
    // bad
    function handleThings(opts = {}, name) {
      // ...
    }
    
    // good
    function handleThings(name, opts = {}) {
      // ...
    }
    ```

  <a name="functions--constructor"></a><a name="7.8"></a>
  - [7.8](#functions--constructor) 不要使用构造函数创建函数。eslint: [`no-new-func`](https://eslint.org/docs/rules/no-new-func)

    > Why? 以这种方式创建函数将类似于 `eval()`，会导致很多问题。

    ```javascript
    // bad
    var add = new Function('a', 'b', 'return a + b');
    
    // still bad
    var subtract = Function('a', 'b', 'return a - b');
    ```

  <a name="functions--signature-spacing"></a><a name="7.9"></a>
  - [7.9](#functions--signature-spacing) 函数签名处加空格。eslint: [`space-before-function-paren`](https://eslint.org/docs/rules/space-before-function-paren) [`space-before-blocks`](https://eslint.org/docs/rules/space-before-blocks)

    ```javascript
    // bad
    const f = function(){};
    const g = function (){};
    const h = function() {};
    
    // good
    const x = function () {};
    const y = function a() {};
    ```
    <a name="functions--mutate-params"></a><a name="7.10"></a>
  - [7.10](#functions--mutate-params) 不要改变参数。 eslint: [`no-param-reassign`](https://eslint.org/docs/rules/no-param-reassign.html)

    > Why? 操作以参数传入的对象可能会对最初被调用的对象造成意想不到的副作用。

    ```javascript
    // bad
    function f1(obj) {
      obj.key = 1;
    }
    
    // good
    function f2(obj) {
      const key = Object.prototype.hasOwnProperty.call(obj, 'key') ? obj.key : 1;
    }
    ```

  <a name="functions--reassign-params"></a><a name="7.11"></a>
  - [7.11](#functions--reassign-params) 不要对参数重新赋值。eslint: [`no-param-reassign`](https://eslint.org/docs/rules/no-param-reassign.html)

    > Why? 对参数重新赋值会导致意想不到的行为, 特别是对 `arguments` 对象。它会造成优化问题，尤其在V8环境。

    ```javascript
    // bad
    function f1(a) {
      a = 1;
      // ...
    }
    
    function f2(a) {
      if (!a) { a = 1; }
      // ...
    }
    
    // good
    function f3(a) {
      const b = a || 1;
      // ...
    }
    
    function f4(a = 1) {
      // ...
    }
    ```

  <a name="functions--spread-vs-apply"></a><a name="7.12"></a>
  - [7.12](#functions--spread-vs-apply) 使用扩展运算符 `...` 调用可变的函数。 eslint: [`prefer-spread`](https://eslint.org/docs/rules/prefer-spread)

    > Why? 这样更简洁，而且你不用提供上下文，用 `apply` 来组成 `new` 也并不容易。
    ```javascript
    // bad
    const x = [1, 2, 3, 4, 5];
    console.log.apply(console, x);
    
    // good
    const x = [1, 2, 3, 4, 5];
    console.log(...x);
    
    // bad
    new (Function.prototype.bind.apply(Date, [null, 2016, 8, 5]));
    
    // good
    new Date(...[2016, 8, 5]);
    ```
    <a name="functions--signature-invocation-indentation"></a>

**[⬆ back to top](#table-contents)**
<a name="arrow-functions"></a>
## 箭头函数

  <a name="arrows--use-them"></a><a name="8.1"></a>
  - [8.1](#arrows--use-them) 当你必须要使用匿名函数 (as when passing an inline callback)时，请使用箭头函数。 eslint: [`prefer-arrow-callback`](https://eslint.org/docs/rules/prefer-arrow-callback.html), [`arrow-spacing`](https://eslint.org/docs/rules/arrow-spacing.html)

    ```javascript
    // bad
    [1, 2, 3].map(function (x) {
      const y = x + 1;
      return x * y;
    });
    
    // good
    [1, 2, 3].map((x) => {
      const y = x + 1;
      return x * y;
    });
    ```

  <a name="arrows--implicit-return"></a><a name="8.2"></a>
  - [8.2](#arrows--implicit-return) 如果函数体由返回一个[表达式](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions)且没有副作用的单语句组成，则省略花括号直接返回。否则，保留花括号和 `return` 语句。eslint: [`arrow-parens`](https://eslint.org/docs/rules/arrow-parens.html), [`arrow-body-style`](https://eslint.org/docs/rules/arrow-body-style.html)

    > Why? 语法糖。当多个函数链在一起时更易于阅读。

    ```javascript
    // bad
    [1, 2, 3].map(number => {
      const nextNumber = number + 1;
      `A string containing the ${nextNumber}.`;
    });
    
    // good
    [1, 2, 3].map(number => `A string containing the ${number}.`);
    
    // good
    [1, 2, 3].map((number) => {
      const nextNumber = number + 1;
      return `A string containing the ${nextNumber}.`;
    });
    
    // good
    [1, 2, 3].map((number, index) => ({
      [index]: number,
    }));
    
    // No implicit return with side effects
    function foo(callback) {
      const val = callback();
      if (val === true) {
        // Do something if callback returns true
      }
    }
    
    let bool = false;
    
    // bad
    foo(() => bool = true);
    
    // good
    foo(() => {
      bool = true;
    });
    ```
    <a name="arrows--paren-wrap"></a><a name="8.3"></a>
  - [8.3](#arrows--one-arg-parens) 当表达式超过多行时，为了更好的可读性请使用圆括号将其包裹起来。

    ```javascript
    // bad
    ['get', 'post', 'put'].map(httpMethod => Object.prototype.hasOwnProperty.call(
        httpMagicObjectWithAVeryLongName,
        httpMethod,
      )
    );

    // good
    ['get', 'post', 'put'].map(httpMethod => (
      Object.prototype.hasOwnProperty.call(
        httpMagicObjectWithAVeryLongName,
        httpMethod,
      )
    ));
    ```
    <a name="arrows--one-arg-parens"></a><a name="8.4"></a>
  - [8.4](#arrows--one-arg-parens) 当函数只有一个参数而且没有花括号时。可省略圆括号。 否则，为了明晰和一致性，请使用圆括号包裹参数。eslint: [`arrow-parens`](https://eslint.org/docs/rules/arrow-parens.html)

    ```javascript
    // bad
    [1, 2, 3].map((x) => x * x);
    
    // good
    [1, 2, 3].map(x => x * x);
    
    // good
    [1, 2, 3].map(number => (
      `A long string with the ${number}. It’s so long that we don’t want it to take up space on the .map line!`
    ));
    
    // bad
    [1, 2, 3].map(x => {
      const y = x + 1;
      return x * y;
    });
    
    // good
    [1, 2, 3].map((x) => {
      const y = x + 1;
      return x * y;
    });
    ```
    <a name="arrows--confusing"></a><a name="8.5"></a>
  - [8.5](#arrows--confusing) 避免箭头函数符号 (`=>`) 和比较符 (`<=`, `>=`)混淆。eslint: [`no-confusing-arrow`](https://eslint.org/docs/rules/no-confusing-arrow)

    ```javascript
    // bad
    const itemHeight = item => item.height <= 256 ? item.largeSize : item.smallSize;
    
    // bad
    const itemHeight = (item) => item.height >= 256 ? item.largeSize : item.smallSize;
    
    // good
    const itemHeight = item => (item.height <= 256 ? item.largeSize : item.smallSize);
    
    // good
    const itemHeight = (item) => {
      const { height, largeSize, smallSize } = item;
      return height <= 256 ? largeSize : smallSize;
    };
    ```

  <a name="whitespace--implicit-arrow-linebreak"></a>
  - [8.6](#whitespace--implicit-arrow-linebreak) 在隐式返回中，强制函数体紧跟在箭头符号 `=>` 的后面。eslint: [`implicit-arrow-linebreak`](https://eslint.org/docs/rules/implicit-arrow-linebreak)

    ```javascript
    // bad
    foo =>
      bar;
    
    foo =>
      (bar);
    
    // good
    foo => bar;
    foo => (bar);
    foo => (
       bar
    )
    ```

    **[⬆ back to top](#table-of-contents)**
<a name="constructors"></a>
## 类 & 构造函数

  <a name="constructors--use-class"></a><a name="9.1"></a>
  - [9.1](#constructors--use-class) 使用 `class`，避免直接操作 `prototype` 。

    ```javascript
    // bad
    function Queue(contents = []) {
      this.queue = [...contents];
    }
    Queue.prototype.pop = function () {
      const value = this.queue[0];
      this.queue.splice(0, 1);
      return value;
    };

    // good
    class Queue {
      constructor(contents = []) {
        this.queue = [...contents];
      }
      pop() {
        const value = this.queue[0];
        this.queue.splice(0, 1);
        return value;
      }
    }
    ```

  <a name="constructors--extends"></a><a name="9.2"></a>
  - [9.2](#constructors--extends) 使用 `extends` 用于继承。

    ```javascript
    // bad
    const inherits = require('inherits');
    function PeekableQueue(contents) {
      Queue.apply(this, contents);
    }
    inherits(PeekableQueue, Queue);
    PeekableQueue.prototype.peek = function () {
      return this.queue[0];
    };

    // good
    class PeekableQueue extends Queue {
      peek() {
        return this.queue[0];
      }
    }
    ```

  <a name="constructors--no-useless"></a><a name="9.3"></a>
  - [9.3](#constructors--no-useless) 如果未指定，类有默认的构造函数，所以一个空的构造函数或者仅仅代表父级的构造函数是没有必要的。 eslint: [`no-useless-constructor`](https://eslint.org/docs/rules/no-useless-constructor)

    ```javascript
    // bad
    class Jedi {
      constructor() {}

      getName() {
        return this.name;
      }
    }

    // bad
    class Rey extends Jedi {
      constructor(...args) {
        super(...args);
      }
    }

    // good
    class Rey extends Jedi {
      constructor(...args) {
        super(...args);
        this.name = 'Rey';
      }
    }
    ```

**[⬆ back to top](#table-of-contents)**
<a name="modules"></a>
## 模块

  <a name="modules--use-them"></a><a name="10.1"></a>
  - [10.1](#modules--use-them) 使用ES6标准模块语法 (`import`/`export`)  而不是非标准的模块系统，你可以随时转换到你喜欢的模块系统。

    ```javascript
    // bad
    const AirbnbStyleGuide = require('./AirbnbStyleGuide');
    module.exports = AirbnbStyleGuide.es6;
    
    // ok
    import AirbnbStyleGuide from './AirbnbStyleGuide';
    export default AirbnbStyleGuide.es6;
    
    // best
    import { es6 } from './AirbnbStyleGuide';
    export default es6;
    ```

  <a name="modules--no-wildcard"></a><a name="10.2"></a>
  - [10.2](#modules--no-wildcard) 不要使用通配符引入。

    ```javascript
    // bad
    import * as AirbnbStyleGuide from './AirbnbStyleGuide';

    // good
    import AirbnbStyleGuide from './AirbnbStyleGuide';
    ```

  <a name="modules--no-mutable-exports"></a>
  - [10.3](#modules--no-mutable-exports) 不要导出可变的元素。
 eslint: [`import/no-mutable-exports`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-mutable-exports.md)

    ```javascript
    // bad
    let foo = 3;
    export { foo };

    // good
    const foo = 3;
    export { foo };
    ```

  <a name="modules--prefer-default-export"></a>
  - [10.4](#modules--prefer-default-export) 在单一导出的模块中，使用 `default export` 比命名导出更好。
 eslint: [`import/prefer-default-export`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md)
    > Why? To encourage more files that only ever export one thing, which is better for readability and maintainability.

    ```javascript
    // bad
    export function foo() {}

    // good
    export default function foo() {}
    ```

  <a name="modules--imports-first"></a>
  - [10.5](#modules--imports-first) 将所有 `import` 置于其它语句之前。
 eslint: [`import/first`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md)

    ```javascript
    // bad
    import foo from 'foo';
    foo.init();

    import bar from 'bar';

    // good
    import foo from 'foo';
    import bar from 'bar';

    foo.init();
    ```

  <a name="modules--multiline-imports-over-newlines"></a>
  - [10.6](#modules--multiline-imports-over-newlines) 多个引入应该像多元素数组和对象字面量一样缩进。

    ```javascript
    // bad
    import {longNameA, longNameB, longNameC, longNameD, longNameE} from 'path';

    // good
    import {
      longNameA,
      longNameB,
      longNameC,
      longNameD,
      longNameE,
    } from 'path';
    ```


**[⬆ back to top](#table-of-contents)**
<a name="iterators-and-generators"></a>
## Iterators and Generators

  <a name="iterators--nope"></a><a name="11.1"></a>
  - [11.1](#iterators--nope) 不要使用遍历器。使用JavaScript的高级函数而非 `for-in` 和 `for-of`等循环。 eslint: [`no-iterator`](https://eslint.org/docs/rules/no-iterator.html) [`no-restricted-syntax`](https://eslint.org/docs/rules/no-restricted-syntax)

    > Why? 这强化了不可变的原则，有返回值的纯函数必有副作用的更易于处理。

    > 使用 `map()` / `every()` / `filter()` / `find()` / `findIndex()` / `reduce()` / `some()` / ... 遍历数组, 使用 `Object.keys()` / `Object.values()` / `Object.entries()` 获得数组以遍历对象。

    ```javascript
    const numbers = [1, 2, 3, 4, 5];

    // bad
    let sum = 0;
    for (let num of numbers) {
      sum += num;
    }
    sum === 15;

    // good
    let sum = 0;
    numbers.forEach((num) => {
      sum += num;
    });
    sum === 15;

    // best (use the functional force)
    const sum = numbers.reduce((total, num) => total + num, 0);
    sum === 15;

    // bad
    const increasedByOne = [];
    for (let i = 0; i < numbers.length; i++) {
      increasedByOne.push(numbers[i] + 1);
    }

    // good
    const increasedByOne = [];
    numbers.forEach((num) => {
      increasedByOne.push(num + 1);
    });

    // best (keeping it functional)
    const increasedByOne = numbers.map(num => num + 1);
    ```

  <a name="generators--spacing"></a>
  - [11.2](#generators--spacing) 如果必须使用 `generators` ，那么一定要确保其函数签名被恰当地空格。 eslint: [`generator-star-spacing`](https://eslint.org/docs/rules/generator-star-spacing)

    > Why? `function` 和 `*` 都是同一个概念词的一部分， `*` 并不是 `function` 的修饰符, `function*` 是一个区别于 `function` 的独一无二的结构。

    ```javascript
    // bad
    function * foo() {
      // ...
    }

    // bad
    const bar = function * () {
      // ...
    };

    // bad
    const baz = function *() {
      // ...
    };

    // bad
    const quux = function*() {
      // ...
    };

    // bad
    function*foo() {
      // ...
    }

    // bad
    function *foo() {
      // ...
    }

    // very bad
    function
    *
    foo() {
      // ...
    }

    // very bad
    const wat = function
    *
    () {
      // ...
    };

    // good
    function* foo() {
      // ...
    }

    // good
    const foo = function* () {
      // ...
    };
    ```

**[⬆ back to top](#table-of-contents)**
<a name="properties"></a>
## 对象属性

  <a name="properties--dot"></a><a name="12.1"></a>
  - [12.1](#properties--dot) 使用 `.` 访问对象属性。 eslint: [`dot-notation`](https://eslint.org/docs/rules/dot-notation.html)

    ```javascript
    const luke = {
      jedi: true,
      age: 28,
    };

    // bad
    const isJedi = luke['jedi'];

    // good
    const isJedi = luke.jedi;
    ```

  <a name="properties--bracket"></a><a name="12.2"></a>
  - [12.2](#properties--bracket) 当属性名有变量时使用 `[]` 访问对象属性。

    ```javascript
    const luke = {
      jedi: true,
      age: 28,
    };

    function getProp(prop) {
      return luke[prop];
    }

    const isJedi = getProp('jedi');
    ```

**[⬆ back to top](#table-of-contents)**
<a name="variables"></a>
## 变量

  <a name="variables--const"></a><a name="13.1"></a>
  - [13.1](#variables--const) 声明变量时请使用 `const` 或者 `let`  关键字。 如果不这样做会导致产生全局变量，我们希望避免污染全局命名空间。  eslint: [`no-undef`](https://eslint.org/docs/rules/no-undef) [`prefer-const`](https://eslint.org/docs/rules/prefer-const)

    ```javascript
    // bad
    superPower = new SuperPower();

    // good
    const superPower = new SuperPower();
    ```

  <a name="variables--one-const"></a><a name="13.2"></a>
  - [13.2](#variables--one-const) 对每一个变量或赋值使用一个 `const` 或者 `let` 。  eslint: [`one-var`](https://eslint.org/docs/rules/one-var.html)

    ```javascript
    // bad
    const items = getItems(),
        goSportsTeam = true,
        dragonball = 'z';
    
    // bad
    // (compare to above, and try to spot the mistake)
    const items = getItems(),
        goSportsTeam = true;
        dragonball = 'z';
    
    // good
    const items = getItems();
    const goSportsTeam = true;
    const dragonball = 'z';
    ```

  <a name="variables--const-let-group"></a><a name="13.3"></a>
  - [13.3](#variables--const-let-group) 将所有的 `const`  和 `let` 进行分组。

    ```javascript
    // bad
    let i, len, dragonball,
        items = getItems(),
        goSportsTeam = true;
    
    // bad
    let i;
    const items = getItems();
    let dragonball;
    const goSportsTeam = true;
    let len;
    
    // good
    const goSportsTeam = true;
    const items = getItems();
    let dragonball;
    let i;
    let length;
    ```

  <a name="variables--define-where-used"></a><a name="13.4"></a>
  - [13.4](#variables--define-where-used) 在需要时进行变量赋值，但是需要将变量置于合理的位置。

    > Why? `let` and `const` 是块级作用域而非函数级作用域。

    ```javascript
    // bad - unnecessary function call
    function checkName(hasName) {
      const name = getName();

      if (hasName === 'test') {
        return false;
      }

      if (name === 'test') {
        this.setName('');
        return false;
      }

      return name;
    }

    // good
    function checkName(hasName) {
      if (hasName === 'test') {
        return false;
      }

      const name = getName();

      if (name === 'test') {
        this.setName('');
        return false;
      }

      return name;
    }
    ```
    <a name="variables--no-chain-assignment"></a><a name="13.5"></a>
  - [13.5](#variables--no-chain-assignment) 不要对变量使用链式赋值。 eslint: [`no-multi-assign`](https://eslint.org/docs/rules/no-multi-assign)

    > Why? 对变量进行链式赋值会产生隐式的全局变量。

    ```javascript
    // bad
    (function example() {
      // JavaScript interprets this as
      // let a = ( b = ( c = 1 ) );
      // The let keyword only applies to variable a; variables b and c become
      // global variables.
      let a = b = c = 1;
    }());

    console.log(a); // throws ReferenceError
    console.log(b); // 1
    console.log(c); // 1

    // good
    (function example() {
      let a = 1;
      let b = a;
      let c = a;
    }());

    console.log(a); // throws ReferenceError
    console.log(b); // throws ReferenceError
    console.log(c); // throws ReferenceError

    // the same applies for `const`
    ```

  <a name="variables--unary-increment-decrement"></a><a name="13.6"></a>
  - [13.6](#variables--unary-increment-decrement) 避免使用自增和自减运算符 (`++`, `--`)。eslint [`no-plusplus`](https://eslint.org/docs/rules/no-plusplus)

    > Why? 根据 eslint 文档，自增和自减运算符可以支持分号自动插入，应用内自增和自减的值会导致静默错误。使用例如 `num += 1` 的语句而不是 `num++` 和 `num ++` 改变变量的值的表达效果更好。

    ```javascript
    // bad
    
    const array = [1, 2, 3];
    let num = 1;
    num++;
    --num;
    
    let sum = 0;
    let truthyCount = 0;
    for (let i = 0; i < array.length; i++) {
      let value = array[i];
      sum += value;
      if (value) {
        truthyCount++;
      }
    }
    
    // good
    
    const array = [1, 2, 3];
    let num = 1;
    num += 1;
    num -= 1;
    
    const sum = array.reduce((a, b) => a + b, 0);
    const truthyCount = array.filter(Boolean).length;
    ```

<a name="variables--linebreak"></a>

  - [13.7](#variables--linebreak) 在赋值中 `=` 前后不允许换行。如果赋值表达式超出 [`最大长度`](https://eslint.org/docs/rules/max-len.html)，可以将值包裹起来。 eslint [`operator-linebreak`](https://eslint.org/docs/rules/operator-linebreak.html)

    ```javascript
    // bad
    const foo =
      superLongLongLongLongLongLongLongLongFunctionName();
    
    // bad
    const foo
      = 'superLongLongLongLongLongLongLongLongString';
    
    // good
    const foo = (
      superLongLongLongLongLongLongLongLongFunctionName()
    );
    
    // good
    const foo = 'superLongLongLongLongLongLongLongLongString';
    ```

<a name="variables--no-unused-vars"></a>
  - [13.8](#variables--no-unused-vars) 不允许有未使用的变量。 eslint: [`no-unused-vars`](https://eslint.org/docs/rules/no-unused-vars)

    ```javascript
    // bad
    
    var some_unused_var = 42;
    
    // Write-only variables are not considered as used.
    var y = 10;
    y = 5;
    
    // A read for a modification of itself is not considered as used.
    var z = 0;
    z = z + 1;
    
    // Unused function arguments.
    function getX(x, y) {
        return x;
    }
    
    // good
    
    function getXPlusY(x, y) {
      return x + y;
    }
    
    var x = 1;
    var y = a + 2;
    
    alert(getXPlusY(x, y));
    
    // 'type' is ignored even if unused because it has a rest property sibling.
    // This is a form of extracting an object that omits the specified keys.
    var { type, ...coords } = data;
    // 'coords' is now the 'data' object without its 'type' property.
    ```

**[⬆ back to top](#table-of-contents)**
<a name="hoisting"></a>
## Hoisting

  <a name="hoisting--about"></a><a name="14.1"></a>
  - [14.1](#hoisting--about) `var` 存在变量提升的情况,  即 `var` 会被提升至该作用域的顶部， 但是他们的赋值不会。 `const` 和 `let` 并不存在这种情况，他们被赋予了 [Temporal Dead Zones (TDZ)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#Temporal_Dead_Zone)。

    ```javascript
    // we know this wouldn’t work (assuming there
    // is no notDefined global variable)
    function example() {
      console.log(notDefined); // => throws a ReferenceError
    }
    
    // creating a variable declaration after you
    // reference the variable will work due to
    // variable hoisting. Note: the assignment
    // value of `true` is not hoisted.
    function example() {
      console.log(declaredButNotAssigned); // => undefined
      var declaredButNotAssigned = true;
    }
    
    // the interpreter is hoisting the variable
    // declaration to the top of the scope,
    // which means our example could be rewritten as:
    function example() {
      let declaredButNotAssigned;
      console.log(declaredButNotAssigned); // => undefined
      declaredButNotAssigned = true;
    }
    
    // using const and let
    function example() {
      console.log(declaredButNotAssigned); // => throws a ReferenceError
      console.log(typeof declaredButNotAssigned); // => throws a ReferenceError
      const declaredButNotAssigned = true;
    }
    ```

  <a name="hoisting--anon-expressions"></a><a name="14.2"></a>
  - [14.2](#hoisting--anon-expressions) 匿名函数的变量名会提升，但是函数内容不会。

    ```javascript
    function example() {
      console.log(anonymous); // => undefined

      anonymous(); // => TypeError anonymous is not a function

      var anonymous = function () {
        console.log('anonymous function expression');
      };
    }
    ```

  <a name="hoisting--named-expresions"></a><a name="hoisting--named-expressions"></a><a name="14.3"></a>
  - [14.3](#hoisting--named-expressions) 命名函数的变量名会提升, 但函数名和函数体不会。

    ```javascript
    function example() {
      console.log(named); // => undefined

      named(); // => TypeError named is not a function

      superPower(); // => ReferenceError superPower is not defined

      var named = function superPower() {
        console.log('Flying');
      };
    }

    // the same is true when the function name
    // is the same as the variable name.
    function example() {
      console.log(named); // => undefined

      named(); // => TypeError named is not a function

      var named = function named() {
        console.log('named');
      };
    }
    ```

  <a name="hoisting--declarations"></a><a name="14.4"></a>
  - [14.4](#hoisting--declarations) 函数声明会提升他们的函数名和函数体。

    ```javascript
    function example() {
      superPower(); // => Flying
    
      function superPower() {
        console.log('Flying');
      }
    }
    ```

    **[⬆ back to top](#table-of-contents)**

<a name="comparison-operators--equality"></a>
## Comparison Operators & Equality

  <a name="comparison--eqeqeq"></a><a name="15.1"></a>
  - [15.1](#comparison--eqeqeq) 使用 `===` 和 `!==` 而不是 `==` and `!=`. eslint: [`eqeqeq`](https://eslint.org/docs/rules/eqeqeq.html)

  <a name="comparison--shortcuts"></a><a name="15.2"></a>
  - [15.2](#comparison--shortcuts) 对于布尔类型的比较使用简写, 而字符串和数字需明确比较对象。

    ```javascript
    // bad
    if (isValid === true) {
      // ...
    }

    // good
    if (isValid) {
      // ...
    }

    // bad
    if (name) {
      // ...
    }

    // good
    if (name !== '') {
      // ...
    }

    // bad
    if (collection.length) {
      // ...
    }

    // good
    if (collection.length > 0) {
      // ...
    }
    ```

  <a name="comparison--switch-blocks"></a><a name="15.3"></a>
  - [15.3](#comparison--switch-blocks) 在 `case` 和 `default` 等包含词法声明（例如 `let`, `const`, `function` 和 `class`）的语句中，使用花括号创建块。 eslint: [`no-case-declarations`](https://eslint.org/docs/rules/no-case-declarations.html)

    > Why? 虽然词法声明在整个`switch` 块中可见，但只会在赋值时被初始化，而这只有当运行到其所在的 `case` 语句时才会发生。当多个 `case` 语句试图定义同一个变量是会导致问题。

    ```javascript
    // bad
    switch (foo) {
      case 1:
        let x = 1;
        break;
      case 2:
        const y = 2;
        break;
      case 3:
        function f() {
          // ...
        }
        break;
      default:
        class C {}
    }

    // good
    switch (foo) {
      case 1: {
        let x = 1;
        break;
      }
      case 2: {
        const y = 2;
        break;
      }
      case 3: {
        function f() {
          // ...
        }
        break;
      }
      case 4:
        bar();
        break;
      default: {
        class C {}
      }
    }
    ```

  <a name="comparison--nested-ternaries"></a><a name="15.4"></a>
  - [15.4](#comparison--nested-ternaries) 三元运算符不应该嵌套，而且一般为单行表达式。 eslint: [`no-nested-ternary`](https://eslint.org/docs/rules/no-nested-ternary.html)

    ```javascript
    // bad
    const foo = maybe1 > maybe2
      ? "bar"
      : value1 > value2 ? "baz" : null;

    // split into 2 separated ternary expressions
    const maybeNull = value1 > value2 ? 'baz' : null;

    // better
    const foo = maybe1 > maybe2
      ? 'bar'
      : maybeNull;

    // best
    const foo = maybe1 > maybe2 ? 'bar' : maybeNull;
    ```

  <a name="comparison--unneeded-ternary"></a><a name="15.4"></a>
  - [15.4](#comparison--unneeded-ternary) 避免不必要的三元表达式。eslint: [`no-unneeded-ternary`](https://eslint.org/docs/rules/no-unneeded-ternary.html)

    ```javascript
    // bad
    const foo = a ? a : b;
    const bar = c ? true : false;
    const baz = c ? false : true;

    // good
    const foo = a || b;
    const bar = !!c;
    const baz = !c;
    ```

  <a name="comparison--no-mixed-operators"><a name="15.5"></></a>
  - [15.5](#comparison--no-mixed-operators) 当有多个运算符时，用圆括号将其括起来。唯一的例外是标准的算数运算符 (`+`, `-`, `*`, & `/`) ，因为它们的优先级众所周知。 eslint: [`no-mixed-operators`](https://eslint.org/docs/rules/no-mixed-operators.html)

    ```javascript
    // bad
    const foo = a && b < 0 || c > 0 || d + 1 === 0;

    // bad
    const bar = a ** b - 5 % d;

    // bad
    // one may be confused into thinking (a || b) && c
    if (a || b && c) {
      return d;
    }

    // good
    const foo = (a && b < 0) || c > 0 || (d + 1 === 0);

    // good
    const bar = (a ** b) - (5 % d);

    // good
    if (a || (b && c)) {
      return d;
    }

    // good
    const bar = a + b / c * d;
    ```

**[⬆ back to top](#table-of-contents)**
<a name="blocks"></a>
## Blocks

  <a name="blocks--braces"></a><a name="16.1"></a>
  - [16.1](#blocks--braces) 对于所有的代码块使用花括号。eslint: [`nonblock-statement-body-position`](https://eslint.org/docs/rules/nonblock-statement-body-position)

    ```javascript
    // bad
    if (test)
      return false;

    // good
    if (test) return false;

    // good
    if (test) {
      return false;
    }

    // bad
    function foo() { return false; }

    // good
    function bar() {
      return false;
    }
    ```

  <a name="blocks--cuddled-elses"></a><a name="16.2"></a>
  - [16.2](#blocks--cuddled-elses) 如果使用到含 `if` 和 `else`的多行代码块，将 `else` 置于 `if` 代码块的反花括号（`}`）的同一行。 eslint: [`brace-style`](https://eslint.org/docs/rules/brace-style.html)

    ```javascript
    // bad
    if (test) {
      thing1();
      thing2();
    }
    else {
      thing3();
    }

    // good
    if (test) {
      thing1();
      thing2();
    } else {
      thing3();
    }
    ```

  <a name="blocks--no-else-return"></a><a name="16.3"></a>
  - [16.3](#blocks--no-else-return) 如果一个 `if` 代码中总是会执行 一个 `return` 语句，那么其后的 `else` 代码块是没有必要的。跟在一个含有 `return` 语句的 `if` 代码块后的 `else if` 中的  `return` 可以被分成多个 `if` 代码块。 eslint: [`no-else-return`](https://eslint.org/docs/rules/no-else-return)

    ```javascript
    // bad
    function foo() {
      if (x) {
        return x;
      } else {
        return y;
      }
    }

    // bad
    function cats() {
      if (x) {
        return x;
      } else if (y) {
        return y;
      }
    }

    // bad
    function dogs() {
      if (x) {
        return x;
      } else {
        if (y) {
          return y;
        }
      }
    }

    // good
    function foo() {
      if (x) {
        return x;
      }

      return y;
    }

    // good
    function cats() {
      if (x) {
        return x;
      }

      if (y) {
        return y;
      }
    }

    // good
    function dogs(x) {
      if (x) {
        if (z) {
          return y;
        }
      } else {
        return z;
      }
    }
    ```

**[⬆ back to top](#table-of-contents)**
<a name="whitespace"></a>
## 空格

  <a name="whitespace--spaces"></a><a name="17.1"></a>
  - [17.1](#whitespace--spaces) `tab` 设置为2个空格。 eslint: [`indent`](https://eslint.org/docs/rules/indent.html)

    ```javascript
    // bad
    function foo() {
    ∙∙∙∙let name;
    }

    // bad
    function bar() {
    ∙let name;
    }

    // good
    function baz() {
    ∙∙let name;
    }
    ```

  <a name="whitespace--before-blocks"></a><a name="17.2"></a>
  - [17.2](#whitespace--before-blocks) 最开始的花括号前空一个空格。eslint: [`space-before-blocks`](https://eslint.org/docs/rules/space-before-blocks.html)

    ```javascript
    // bad
    function test(){
      console.log('test');
    }

    // good
    function test() {
      console.log('test');
    }

    // bad
    dog.set('attr',{
      age: '1 year',
      breed: 'Bernese Mountain Dog',
    });

    // good
    dog.set('attr', {
      age: '1 year',
      breed: 'Bernese Mountain Dog',
    });
    ```

  <a name="whitespace--around-keywords"></a><a name="17.3"></a>
  - [17.3](#whitespace--around-keywords) 在控制语句的圆括号前空一个空格。 (`if`, `while` 等)。在函数调用和函数声明的函数名和参数列表之间不空格。eslint: [`keyword-spacing`](https://eslint.org/docs/rules/keyword-spacing.html)

    ```javascript
    // bad
    if(isJedi) {
      fight ();
    }

    // good
    if (isJedi) {
      fight();
    }

    // bad
    function fight () {
      console.log ('Swooosh!');
    }

    // good
    function fight() {
      console.log('Swooosh!');
    }
    ```

  <a name="whitespace--infix-ops"></a><a name="17.4"></a>
  - [17.4](#whitespace--infix-ops) 运算符之间使用空格隔开。 eslint: [`space-infix-ops`](https://eslint.org/docs/rules/space-infix-ops.html)

    ```javascript
    // bad
    const x=y+5;

    // good
    const x = y + 5;
    ```
    <a name="whitespace--padded-blocks"></a><a name="17.5"></a>
  - [17.5](#whitespace--padded-blocks) 不要再代码块中使用空行。 eslint: [`padded-blocks`](https://eslint.org/docs/rules/padded-blocks.html)

    ```javascript
    // bad
    function bar() {

      console.log(foo);

    }

    // bad
    if (baz) {

      console.log(qux);
    } else {
      console.log(foo);

    }

    // bad
    class Foo {

      constructor(bar) {
        this.bar = bar;
      }
    }

    // good
    function bar() {
      console.log(foo);
    }

    // good
    if (baz) {
      console.log(qux);
    } else {
      console.log(foo);
    }
    ```

  <a name="whitespace--in-parens"></a><a name="17.6"></a>
  - [17.6](#whitespace--in-parens) 不要在圆括号里面使用空格。 eslint: [`space-in-parens`](https://eslint.org/docs/rules/space-in-parens.html)

    ```javascript
    // bad
    function bar( foo ) {
      return foo;
    }

    // good
    function bar(foo) {
      return foo;
    }

    // bad
    if ( foo ) {
      console.log(foo);
    }

    // good
    if (foo) {
      console.log(foo);
    }
    ```

  <a name="whitespace--in-brackets"></a><a name="17.7"></a>
  - [17.7](#whitespace--in-brackets) 不要在中括号里面使用空格。eslint: [`array-bracket-spacing`](https://eslint.org/docs/rules/array-bracket-spacing.html)

    ```javascript
    // bad
    const foo = [ 1, 2, 3 ];
    console.log(foo[ 0 ]);

    // good
    const foo = [1, 2, 3];
    console.log(foo[0]);
    ```

  <a name="whitespace--in-braces"></a><a name="17.8"></a>
  - [17.8](#whitespace--in-braces) 在花括号中使用空格。 eslint: [`object-curly-spacing`](https://eslint.org/docs/rules/object-curly-spacing.html)

    ```javascript
    // bad
    const foo = {clark: 'kent'};

    // good
    const foo = { clark: 'kent' };
    ```

  <a name="whitespace--block-spacing"></a>
  - [17.9](#whitespace--block-spacing) 所有的 `{` 和 `}` 应保持相同的空格数。 eslint: [`block-spacing`](https://eslint.org/docs/rules/block-spacing)

    ```javascript
    // bad
    function foo() {return true;}
    if (foo) { bar = 0;}

    // good
    function foo() { return true; }
    if (foo) { bar = 0; }
    ```

  <a name="whitespace--comma-spacing"></a>
  - [17.10](#whitespace--comma-spacing) 在逗号后空格，不要在逗号前空格。 eslint: [`comma-spacing`](https://eslint.org/docs/rules/comma-spacing)

    ```javascript
    // bad
    var foo = 1,bar = 2;
    var arr = [1 , 2];

    // good
    var foo = 1, bar = 2;
    var arr = [1, 2];
    ```

  <a name="whitespace--computed-property-spacing"></a>
  - [17.11](#whitespace--computed-property-spacing) 在计算属性的中括号中强制使用空格。eslint: [`computed-property-spacing`](https://eslint.org/docs/rules/computed-property-spacing)

    ```javascript
    // bad
    obj[foo ]
    obj[ 'foo']
    var x = {[ b ]: a}
    obj[foo[ bar ]]

    // good
    obj[foo]
    obj['foo']
    var x = { [b]: a }
    obj[foo[bar]]
    ```

  <a name="whitespace--func-call-spacing"></a>
  - [17.12](#whitespace--func-call-spacing) 在函数和函数调用之间不要空格。 eslint: [`func-call-spacing`](https://eslint.org/docs/rules/func-call-spacing)

    ```javascript
    // bad
    func ();

    func
    ();

    // good
    func();
    ```

  <a name="whitespace--key-spacing"></a>
  - [17.13](#whitespace--key-spacing) 在对象的字面量属性中，在键和值之间强制空格。 eslint: [`key-spacing`](https://eslint.org/docs/rules/key-spacing)

    ```javascript
    // bad
    var obj = { "foo" : 42 };
    var obj2 = { "foo":42 };

    // good
    var obj = { "foo": 42 };
    ```

  <a name="whitespace--no-trailing-spaces"></a>
  - [17.14](#whitespace--no-trailing-spaces) 禁止在一行的末尾使用拖尾空格。 eslint: [`no-trailing-spaces`](https://eslint.org/docs/rules/no-trailing-spaces)

**[⬆ back to top](#table-of-contents)**
<a name="commas"></a>
## 逗号

  <a name="commas--leading-trailing"></a><a name="18.1"></a>
  - [18.1](#commas--leading-trailing) 不要使用前置逗号。eslint: [`comma-style`](https://eslint.org/docs/rules/comma-style.html)

    ```javascript
    // bad
    const story = [
        once
      , upon
      , aTime
    ];

    // good
    const story = [
      once,
      upon,
      aTime,
    ];

    // bad
    const hero = {
        firstName: 'Ada'
      , lastName: 'Lovelace'
      , birthYear: 1815
      , superPower: 'computers'
    };

    // good
    const hero = {
      firstName: 'Ada',
      lastName: 'Lovelace',
      birthYear: 1815,
      superPower: 'computers',
    };
    ```

  <a name="commas--dangling"></a><a name="18.2"></a>
  - [18.2](#commas--dangling) 请使用额外的拖尾逗号。eslint: [`comma-dangle`](https://eslint.org/docs/rules/comma-dangle.html)

    > Why? 这样可以简化git的diff过程。而且例如Babel这种编辑器，在编译后的代码中会移除多余的拖尾逗号，这也意味着不用担心传统浏览器中的[拖尾逗号问题](https://github.com/airbnb/javascript/blob/es5-deprecated/es5/README.md#commas)

    ```diff
    // bad - git diff without trailing comma
    const hero = {
         firstName: 'Florence',
    -    lastName: 'Nightingale'
    +    lastName: 'Nightingale',
    +    inventorOf: ['coxcomb chart', 'modern nursing']
    };

    // good - git diff with trailing comma
    const hero = {
         firstName: 'Florence',
         lastName: 'Nightingale',
    +    inventorOf: ['coxcomb chart', 'modern nursing'],
    };
    ```

    ```javascript
    // bad
    const hero = {
      firstName: 'Dana',
      lastName: 'Scully'
    };

    const heroes = [
      'Batman',
      'Superman'
    ];

    // good
    const hero = {
      firstName: 'Dana',
      lastName: 'Scully',
    };

    const heroes = [
      'Batman',
      'Superman',
    ];

    // bad
    function createHero(
      firstName,
      lastName,
      inventorOf
    ) {
      // does nothing
    }

    // good
    function createHero(
      firstName,
      lastName,
      inventorOf,
    ) {
      // does nothing
    }

    // good (note that a comma must not appear after a "rest" element)
    function createHero(
      firstName,
      lastName,
      inventorOf,
      ...heroArgs
    ) {
      // does nothing
    }

    // bad
    createHero(
      firstName,
      lastName,
      inventorOf
    );

    // good
    createHero(
      firstName,
      lastName,
      inventorOf,
    );

    // good (note that a comma must not appear after a "rest" element)
    createHero(
      firstName,
      lastName,
      inventorOf,
      ...heroArgs
    );
    ```

**[⬆ back to top](#table-of-contents)**
<a name="semicolons"></a>
## 分号

  <a name="semicolons--required"></a><a name="19.1"></a>
  - [19.1](#semicolons--required) 使用分号。 eslint: [`semi`](https://eslint.org/docs/rules/semi.html)

    > Why? 当JavaScript遇到没有分号的一行时，它会使用一系列叫做[Automatic Semicolon Insertion](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion) 的规则判断它是否应该将换行符当做一段语句的结束。如果判断是的话它会在换行符前插入分号。 ASI有一些古怪的行为，如果JavaScript错误地编译了换行符，会导致代码崩溃。如果新的特性成为JavaScript的一部分，这些规则将会变得更加复杂。显式地使用分号结束语句并且配置lint规则捕获未加的分号会避免一些问题。

    ```javascript
    // bad - raises exception
    const luke = {}
    const leia = {}
    [luke, leia].forEach(jedi => jedi.father = 'vader')

    // bad - raises exception
    const reaction = "No! That’s impossible!"
    (async function meanwhileOnTheFalcon() {
      // handle `leia`, `lando`, `chewie`, `r2`, `c3p0`
      // ...
    }())

    // bad - returns `undefined` instead of the value on the next line - always happens when `return` is on a line by itself because of ASI!
    function foo() {
      return
        'search your feelings, you know it to be foo'
    }

    // good
    const luke = {};
    const leia = {};
    [luke, leia].forEach((jedi) => {
      jedi.father = 'vader';
    });

    // good
    const reaction = "No! That’s impossible!";
    (async function meanwhileOnTheFalcon() {
      // handle `leia`, `lando`, `chewie`, `r2`, `c3p0`
      // ...
    }());

    // good
    function foo() {
      return 'search your feelings, you know it to be foo';
    }
    ```

**[⬆ back to top](#table-of-contents)**