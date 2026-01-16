type ClassValue =
  | string
  | number
  | false
  | null
  | undefined
  | ClassValue[]
  | { [key: string]: boolean };

export function cn(...args: ClassValue[]): string {
  const classes: string[] = [];

  for (const arg of args) {
    if (!arg) continue;

    if (typeof arg === "string" || typeof arg === "number") {
      classes.push(String(arg));
      continue;
    }

    if (Array.isArray(arg)) {
      const inner = cn(...arg);
      if (inner) classes.push(inner);
      continue;
    }

    if (typeof arg === "object") {
      for (const key in arg) {
        if (arg[key]) classes.push(key);
      }
    }
  }

  return classes.join(" ");
}
