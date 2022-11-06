export const errorWrapper = (i, callback) => {
  try {
    console.log(`${i + 1}:`, callback());
  } catch (err) {
    console.error(`${i + 1}: ${String(err)}`)
  }
}
