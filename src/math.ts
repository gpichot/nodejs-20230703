export function fibonacci(n: number): number {
  if (n < 0)
    throw new Error(`n must be greater than or equal to 0, received ${n}`);
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
