export function getDataId(element: HTMLElement): number | null {
  if (!element) return null;

  const dataId = element.getAttribute("data-id");
  const id = Number.parseInt(dataId ?? "", 10);

  if (Number.isNaN(id)) return null;
  return id;
}
