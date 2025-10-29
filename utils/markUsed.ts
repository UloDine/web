// Utility to mark variables as used to satisfy linters/build in production.
// This is a no-op at runtime and safe to call with any values.
export function markUsed(..._items: any[]) {
  // intentionally do nothing - presence of this call marks the variables as used
  return;
}
