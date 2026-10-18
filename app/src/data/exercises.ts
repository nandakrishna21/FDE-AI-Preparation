export type TestCase = { args: string; expected: string }
export type Exercise = {
  id: string
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  prompt: string
  starter: string
  hint: string
  tests: { args: unknown[]; expected: unknown; show: string }[]
}

export const EXERCISES: Exercise[] = [
  {
    id: 'reverse-string',
    title: 'Reverse a String',
    difficulty: 'Easy',
    prompt: 'Write a function reverseString(str) that returns the string reversed.',
    starter: 'function reverseString(str) {\n  // your code here\n}\n',
    hint: 'Split into chars, reverse, join: str.split("").reverse().join("")',
    tests: [
      { args: ['hello'], expected: 'olleh', show: 'reverseString("hello") ➜ "olleh"' },
      { args: ['abc'], expected: 'cba', show: 'reverseString("abc") ➜ "cba"' },
      { args: [''], expected: '', show: 'reverseString("") ➜ ""' },
    ],
  },
  {
    id: 'factorial',
    title: 'Factorial',
    difficulty: 'Easy',
    prompt: 'Write factorial(n) returning n! . factorial(0) = 1.',
    starter: 'function factorial(n) {\n  // your code here\n}\n',
    hint: 'Loop from 1 to n multiplying, or use recursion.',
    tests: [
      { args: [5], expected: 120, show: 'factorial(5) ➜ 120' },
      { args: [0], expected: 1, show: 'factorial(0) ➜ 1' },
      { args: [3], expected: 6, show: 'factorial(3) ➜ 6' },
    ],
  },
  {
    id: 'is-palindrome',
    title: 'Palindrome Check',
    difficulty: 'Easy',
    prompt: 'Write isPalindrome(str) that returns true if str reads the same forwards and backwards (ignore case).',
    starter: 'function isPalindrome(str) {\n  // your code here\n}\n',
    hint: 'Lowercase it, then compare with its reverse.',
    tests: [
      { args: ['madam'], expected: true, show: 'isPalindrome("madam") ➜ true' },
      { args: ['Hello'], expected: false, show: 'isPalindrome("Hello") ➜ false' },
      { args: ['Level'], expected: true, show: 'isPalindrome("Level") ➜ true' },
    ],
  },
  {
    id: 'sum-array',
    title: 'Sum of an Array',
    difficulty: 'Easy',
    prompt: 'Write sumArray(arr) returning the sum of all numbers.',
    starter: 'function sumArray(arr) {\n  // your code here\n}\n',
    hint: 'Try arr.reduce((a, b) => a + b, 0).',
    tests: [
      { args: [[1, 2, 3, 4]], expected: 10, show: 'sumArray([1,2,3,4]) ➜ 10' },
      { args: [[]], expected: 0, show: 'sumArray([]) ➜ 0' },
      { args: [[-1, 1, 5]], expected: 5, show: 'sumArray([-1,1,5]) ➜ 5' },
    ],
  },
  {
    id: 'find-max',
    title: 'Find the Maximum',
    difficulty: 'Easy',
    prompt: 'Write findMax(arr) returning the largest number. Do not use Math.max.',
    starter: 'function findMax(arr) {\n  // your code here\n}\n',
    hint: 'Track the biggest value while looping.',
    tests: [
      { args: [[1, 9, 3]], expected: 9, show: 'findMax([1,9,3]) ➜ 9' },
      { args: [[-5, -2, -8]], expected: -2, show: 'findMax([-5,-2,-8]) ➜ -2' },
      { args: [[42]], expected: 42, show: 'findMax([42]) ➜ 42' },
    ],
  },
  {
    id: 'count-vowels',
    title: 'Count Vowels',
    difficulty: 'Easy',
    prompt: 'Write countVowels(str) returning how many vowels (a,e,i,o,u) the string has (ignore case).',
    starter: 'function countVowels(str) {\n  // your code here\n}\n',
    hint: 'Loop chars and test with "aeiou".includes(ch).',
    tests: [
      { args: ['hello world'], expected: 3, show: 'countVowels("hello world") ➜ 3' },
      { args: ['xyz'], expected: 0, show: 'countVowels("xyz") ➜ 0' },
      { args: ['AEIOU'], expected: 5, show: 'countVowels("AEIOU") ➜ 5' },
    ],
  },
  {
    id: 'fizzbuzz',
    title: 'FizzBuzz',
    difficulty: 'Medium',
    prompt: 'Write fizzbuzz(n) returning an array from 1..n as strings: "Fizz" for multiples of 3, "Buzz" for 5, "FizzBuzz" for both, else the number as a string.',
    starter: 'function fizzbuzz(n) {\n  const out = [];\n  // your code here\n  return out;\n}\n',
    hint: 'Check %15, then %3, then %5, else push String(i).',
    tests: [
      { args: [5], expected: ['1', '2', 'Fizz', '4', 'Buzz'], show: 'fizzbuzz(5) ➜ ["1","2","Fizz","4","Buzz"]' },
      { args: [15], expected: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz'], show: 'fizzbuzz(15)[14] ➜ "FizzBuzz"' },
    ],
  },
  {
    id: 'fibonacci',
    title: 'Nth Fibonacci',
    difficulty: 'Medium',
    prompt: 'Write fibonacci(n) returning the nth Fibonacci number with fibonacci(0)=0, fibonacci(1)=1.',
    starter: 'function fibonacci(n) {\n  // your code here\n}\n',
    hint: 'Iterate keeping two previous values.',
    tests: [
      { args: [6], expected: 8, show: 'fibonacci(6) ➜ 8' },
      { args: [0], expected: 0, show: 'fibonacci(0) ➜ 0' },
      { args: [10], expected: 55, show: 'fibonacci(10) ➜ 55' },
    ],
  },
  {
    id: 'remove-duplicates',
    title: 'Remove Duplicates',
    difficulty: 'Medium',
    prompt: 'Write removeDuplicates(arr) returning a new array with duplicates removed, order preserved.',
    starter: 'function removeDuplicates(arr) {\n  // your code here\n}\n',
    hint: 'Use [...new Set(arr)] or filter with indexOf.',
    tests: [
      { args: [[1, 1, 2, 3, 3]], expected: [1, 2, 3], show: 'removeDuplicates([1,1,2,3,3]) ➜ [1,2,3]' },
      { args: [['a', 'b', 'a']], expected: ['a', 'b'], show: 'removeDuplicates(["a","b","a"]) ➜ ["a","b"]' },
    ],
  },
  {
    id: 'capitalize-words',
    title: 'Capitalize Words',
    difficulty: 'Medium',
    prompt: 'Write capitalizeWords(str) that capitalizes the first letter of each word.',
    starter: 'function capitalizeWords(str) {\n  // your code here\n}\n',
    hint: 'Split by spaces, map each word, join back.',
    tests: [
      { args: ['hello world'], expected: 'Hello World', show: 'capitalizeWords("hello world") ➜ "Hello World"' },
      { args: ['the quick fox'], expected: 'The Quick Fox', show: 'capitalizeWords("the quick fox") ➜ "The Quick Fox"' },
    ],
  },
]
