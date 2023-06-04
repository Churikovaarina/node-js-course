const add = a => {
    let sum = a;
    const inner = b => {
        if (!b)
            return sum;
        sum += b;
        return inner;
    };
    return inner;
}

console.log(add(2)(5)(7)(1)(6)(5)(11)());
// Перевірка на анаграму
const areAnagrams = (str1 = ``, str2 = ``) =>
    str1.split(``).sort().join(``)
    ===
    str2.split(``).sort().join(``)

// Глибоке копіювання

//const deepCopy = (obj =  {}) => structuredClone(obj);
const deepCopy = (obj =  {}) => JSON.parse(JSON.stringify(obj));

// Cache

const wrapper = (func) => {
    const cache = new Map();
    return (...args) => {
        let key = args.join();
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = func.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

const calc = (a, b, c) => a+b+c;
const cachedCalc = wrapper(calc);

console.log(cachedCalc(2,2,3)); // 7 обраховано
console.log(cachedCalc(5,8,1)); // 14 обраховано
console.log(cachedCalc(2,2,3)); // 7 взято з кешу