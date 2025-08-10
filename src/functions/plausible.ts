//@ts-nocheck

export const plausible = (...data: unknown[]): void => {
  initPlausible();

  window.plausible =
    window.plausible ||
    ((...args: unknown[]) => {
      window.plausible.q = window.plausible.q || [];
      window.plausible.q.push(args);
    });

  window.plausible(...data);
};

export const initPlausible = (): void => {
  const script = document.querySelector('script[src*="analytics"]');
  if (script) {
    return;
  }

  const PLAUSIBLE_URL: string = import.meta.env
    .VITE_APP_PLAUSIBLE_URL as string;

  if (!PLAUSIBLE_URL || PLAUSIBLE_URL.length <= 0) {
    return;
  }

  const element = document.createElement("script");
  element.src = PLAUSIBLE_URL;
  element.defer = true;
  element.setAttribute("data-domain", document.location.hostname);
  document.head.appendChild(element);
};
