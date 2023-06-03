type InnerFunction = {
    (b?: number): InnerFunction;
    (b?: undefined): number;
};

const add = (a: number) => {
    let sum: number = a;
    
    function inner(b?: undefined): number;
    function inner(b?: number): InnerFunction;
    function inner(b?: number | undefined): number | InnerFunction {
        if (!b)
            return sum;
        sum += b;
        return inner;
    }

    return inner;
};

console.log(add(2)(5)(7)(1)(6)(5)(11)(12)());


// Перевірка на анаграму
const areAnagrams = (str1: string, str2: string): boolean =>
    str1.split(``).every(letter => str2.includes(letter))
    &&
    str2.split(``).every(letter => str1.includes(letter));

// Глибоке копіювання

//const deepCopy = (obj =  {}) => structuredClone(obj);
const deepCopy = <T extends Object>(obj: T): T => JSON.parse(JSON.stringify(obj));

// Cache

type FuncType<T> = (...args: T[]) => any;

const wrapper = <T extends FuncType<any>>(func: T) => {
    const cache = new Map<string, ReturnType<T>>();
    return (...args: Parameters<T>): ReturnType<T> => {
        const key = args.join() as string;
        if (cache.has(key)) {
            return cache.get(key)!;
        }
        const result = func(...args);
        cache.set(key, result);
        return result;
    };
};

const calc = (a: number, b: number, c: number) => a+b+c;
const cachedCalc = wrapper(calc);

console.log(cachedCalc(2,2,3)); // 7 calculated
console.log(cachedCalc(5,8,1)); // 14 calculated
console.log(cachedCalc(2,2,3)); // 7 from cache