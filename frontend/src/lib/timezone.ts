
/**
 * Convert UTC datetime string to local timezone Date object
 */
export function utcToLocal(utcString: string): Date {
  return new Date(utcString);
}

/**
 * Format date in local timezone
 */
export function formatDate(utcString: string, options?: Intl.DateTimeFormatOptions): string {
  const date = utcToLocal(utcString);
  const defaultOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  return date.toLocaleDateString('en-US', { ...defaultOptions, ...options });
}

/**
 * Format time in local timezone
 */
export function formatTime(utcString: string, options?: Intl.DateTimeFormatOptions): string {
  const date = utcToLocal(utcString);
  const defaultOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  
  return date.toLocaleTimeString('en-US', { ...defaultOptions, ...options });
}

/**
 * Format datetime in local timezone
 */
export function formatDateTime(utcString: string, options?: Intl.DateTimeFormatOptions): string {
  const date = utcToLocal(utcString);
  const defaultOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  
  return date.toLocaleString('en-US', { ...defaultOptions, ...options });
}

/**
 * Get relative time (e.g., "2 hours ago", "in 3 days")
 */
export function getRelativeTime(utcString: string): string {
  const date = utcToLocal(utcString);
  const now = new Date();
  const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);
  
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 },
  ];
  
  for (const interval of intervals) {
    const count = Math.floor(Math.abs(diffInSeconds) / interval.seconds);
    if (count >= 1) {
      const plural = count !== 1 ? 's' : '';
      const direction = diffInSeconds > 0 ? 'in ' : '';
      const suffix = diffInSeconds > 0 ? '' : ' ago';
      return `${direction}${count} ${interval.label}${plural}${suffix}`;
    }
  }
  
  return 'just now';
}

/**
 * Check if event is upcoming, ongoing, or ended
 */
export function getEventStatus(startTime: string, endTime: string) {
  const now = new Date();
  const start = utcToLocal(startTime);
  const end = utcToLocal(endTime);
  
  if (now < start) {
    return { 
      status: 'upcoming', 
      color: 'bg-blue-100 text-blue-800',
      label: 'Upcoming'
    };
  } else if (now >= start && now <= end) {
    return { 
      status: 'ongoing', 
      color: 'bg-green-100 text-green-800',
      label: 'Ongoing'
    };
  } else {
    return { 
      status: 'ended', 
      color: 'bg-gray-100 text-gray-800',
      label: 'Ended'
    };
  }
}

/**
 * Get timezone offset string (e.g., "UTC-5", "UTC+2")
 */
export function getTimezoneOffset(): string {
  const offset = new Date().getTimezoneOffset();
  const hours = Math.abs(Math.floor(offset / 60));
  const minutes = Math.abs(offset % 60);
  const sign = offset <= 0 ? '+' : '-';
  
  if (minutes === 0) {
    return `UTC${sign}${hours}`;
  } else {
    return `UTC${sign}${hours}:${minutes.toString().padStart(2, '0')}`;
  }
}

/**
 * Get user's timezone name (e.g., "America/New_York")
 */
export function getUserTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
