import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";

export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }
  return formatDistanceToNow(date, { addSuffix: true, locale: enUS });
}
