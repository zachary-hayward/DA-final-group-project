export default function titleWord(word: string) {
  return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
}