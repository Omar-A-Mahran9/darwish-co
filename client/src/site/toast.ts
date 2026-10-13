/** A one-line status message at the bottom of the screen (rendered by SiteLayout). */
export const TOAST_EVENT = "site:toast";

export function showToast(message: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<string>(TOAST_EVENT, { detail: message }));
}
