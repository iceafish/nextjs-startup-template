// Re-export commonly used utilities
export { omit, pick, debounce, throttle } from "radash";
export { 
  isEmpty, 
  isEqual, 
  cloneDeep, 
  merge, 
  get, 
  set, 
  uniq, 
  uniqBy,
  groupBy,
  orderBy,
  sortBy
} from "lodash-es";

// Custom utility functions
export const sleep = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

export const formatCurrency = (
  amount: number, 
  currency = 'USD', 
  locale = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatDate = (
  date: Date | string | number, 
  options?: Intl.DateTimeFormatOptions,
  locale = 'en-US'
): string => {
  return new Intl.DateTimeFormat(locale, options).format(new Date(date));
};

export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};