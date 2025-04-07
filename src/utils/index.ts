import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names using clsx and tailwind-merge
 * This allows for conditional and dynamic class names that work well with Tailwind CSS
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date using the Intl.DateTimeFormat API
 */
export function formatDate(date: Date | string, options: Intl.DateTimeFormatOptions = {}) {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  
  const dateToFormat = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('en-US', { ...defaultOptions, ...options }).format(dateToFormat);
}

/**
 * Truncates a string to a specified length and adds an ellipsis
 */
export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

/**
 * Creates a URL-friendly slug from a string
 */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

/**
 * Delays execution for a specified number of milliseconds
 */
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Safely access nested object properties without throwing errors
 */
export function getNestedValue<T>(obj: Record<string, unknown>, path: string, defaultValue: T): T {
  const keys = path.split('.');
  let result: unknown = obj;
  
  for (const key of keys) {
    if (result === undefined || result === null) {
      return defaultValue;
    }
    result = (result as Record<string, unknown>)[key];
  }
  
  return (result === undefined || result === null) ? defaultValue : result as T;
}

/**
 * Smoothly scrolls to an element with the specified ID
 * @param id The ID of the element to scroll to (without the # prefix)
 * @param options Optional configuration for the scroll behavior
 */
export function scrollToAnchor(id: string, options: ScrollIntoViewOptions = {}) {
  // Remove the # if it's included in the id
  const elementId = id.startsWith('#') ? id.substring(1) : id;
  const element = document.getElementById(elementId);
  
  if (element) {
    const defaultOptions: ScrollIntoViewOptions = {
      behavior: 'smooth',
      block: 'start',
    };
    
    // Merge default options with provided options
    const scrollOptions = { ...defaultOptions, ...options };
    
    // Scroll to the element
    element.scrollIntoView(scrollOptions);
    
    // Update URL hash without causing a jump
    window.history.pushState(null, '', `#${elementId}`);
  }
}
