export function getDataId(element: HTMLElement): number | null {
  if (!element) return null;

  const dataId = element.getAttribute("data-id");
  const id = parseInt(dataId || "");

  if (!id) return null;
  return id;
}
