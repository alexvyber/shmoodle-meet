function genChar() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function genWord() {
  const length = Math.floor(Math.random() * 2) + 3
  let str = ""
  for (let i = 0; i <= length; i++) {
    str += genChar()
  }
  return str
}

export default function genRoomKey() {
  const length = Math.floor(Math.random() * 2) + 3
  return Array.from({ length }, () => genWord()).join("-")
}
