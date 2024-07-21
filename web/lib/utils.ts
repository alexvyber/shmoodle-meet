export function isNotNull<T>(some: T): some is Exclude<T, null> {
  if (!some && typeof some === "object") return false
  return true
}
