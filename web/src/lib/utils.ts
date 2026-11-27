export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function money(value: number, currency = "Q") {
  return `${currency}${value.toLocaleString("es-GT", { maximumFractionDigits: value % 1 === 0 ? 0 : 2 })}`;
}

export function compact(value: number) {
  return value.toLocaleString("es-GT");
}
