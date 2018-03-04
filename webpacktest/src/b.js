// babel-preset-stage-0 涵盖最多的语法,包括es7,然后去 babelrc 配置,
let obj1 = {'name':'姚明'};
let obj2 = {'age':30};

let newObj = {...obj1,...obj2};

module.exports = newObj;
