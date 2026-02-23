export const sanitizeInput = (input: string): string => {
  let sanitized = input
  .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  .replace(/<[^>]*>/g, '');

  return sanitized = sanitized
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');
}
