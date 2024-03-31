export function mod(n: number, m: number) {
  // because native JS % operator chokes on negatives
  return ((n % m) + m) % m;
}
