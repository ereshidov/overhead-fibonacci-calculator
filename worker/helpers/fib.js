// !!Solution with recursion is using intentionally
// !!to artificially create slow process for Redis

function fibonacci (index) {
  if (index < 2) return 1;

  return fib(index - 1) + fib(index - 2)
}

module.exports = {
  fibonacci
}
