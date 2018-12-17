const uriHelper = require('../src/index');

let input = {
  pathname: '/q/b/e',
  hash: 'anchor',
  query: {
    some: ['a', 'qwe', 555],
    other: 'b',
    nested: {
      one: {
        two: {
          three: 321,
          four: [7,7,7]
        }
      },
      plain: 55,
      sib: {
        inn: 'str'
      }
    }
  }
  
},
str = uriHelper.stringify(input);

console.log(str);

console.log(uriHelper.stringify(uriHelper.parse(str)));