import { words } from "./words"

const shortestWordSize = words[0].length
const longestWordSize = words[words.length - 1].length

export function generateRandomWords(
  options: {
    minLength?: number
    maxLength?: number
    exactly?: number
    min?: number
    max?: number
  } = { min: 3, max: 8 }
): string[] {
  const { minLength, maxLength, ...rest } = options || {}

  function word() {
    let min = typeof minLength !== "number" ? shortestWordSize : limitWordSize(minLength)

    const max = typeof maxLength !== "number" ? longestWordSize : limitWordSize(maxLength)

    if (min > max) min = max

    let rightSize = false
    let wordUsed

    while (!rightSize) {
      wordUsed = generateRandomWord()
      rightSize = wordUsed.length <= max && wordUsed.length >= min
    }

    return wordUsed as string
  }

  function generateRandomWord() {
    return words[randInt(words.length)]
  }

  // limits the size of words to the minimum and maximum possible
  function limitWordSize(wordSize: number) {
    if (wordSize < shortestWordSize) wordSize = shortestWordSize
    if (wordSize > longestWordSize) wordSize = longestWordSize
    return wordSize
  }

  // random int as seeded by options.seed if applicable, or Math.random() otherwise
  function randInt(lessThan: number) {
    return Math.floor(Math.random() * lessThan)
  }

  // No arguments = generate one word
  if (options === undefined) {
    return [word()]
  }

  if (Object.keys(rest).length === 0) {
    return [word()]
  }

  // options supported: exactly, min, max, join
  if (options.exactly) {
    options.min = options.exactly
    options.max = options.exactly
  }

  const { min = 3, max = 8 } = options

  const total = min + randInt(max + 1 - min)

  const results: string[] = []

  for (let i = 0; i < total * 1; i++) {
    results.push(word())
  }

  return results
}

export function count(options: { minLength?: number; maxLength?: number } = {}) {
  let { minLength, maxLength } = options

  if (typeof minLength !== "number") {
    minLength = shortestWordSize
  }

  if (typeof maxLength !== "number") {
    maxLength = longestWordSize
  }

  return words.filter((word) => word.length >= minLength && word.length <= maxLength).length
}
