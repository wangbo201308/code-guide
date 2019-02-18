<a name="language-guide"></a></a>

# 语言规范

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

**[⬆ back to top](#language-guide)**

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

**[⬆ back to top](#language-guide)**

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

**[⬆ back to top](#language-guide)**

## Arrays

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

**[⬆ back to top](#language-guide)**

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

**[⬆ back to top](#language-guide)**

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

**[⬆ back to top](#language-guide)**

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

**[⬆ back to top](#language-guide)**

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