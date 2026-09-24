export function formatCOP(amount: number): string {
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  const formatted = new Intl.NumberFormat('es-CO', {
    maximumFractionDigits: 0,
  }).format(absAmount);
  return `${isNegative ? '-' : ''}$${formatted}`;
}
