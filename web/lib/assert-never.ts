export function assertNever(arg: never): never {
  throw new Error(`Arg must be of type 'never', but got arg: ${arg} typeof ${typeof arg}`)
}
