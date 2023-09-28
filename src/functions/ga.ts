//@ts-nocheck

export const gtag = (...data: unknown): void => {
    if (!localStorage.getItem("accept-cookies")){
        return;
    }
    initGA();

    window.dataLayer = window?.dataLayer || [];
    window.dataLayer.push(...data);
}

export const initGA = (): void => {
    if (!localStorage.getItem("accept-cookies")){
        return;
    }

    const script = document.querySelector('script[src*="googletagmanager"]');
    if (script) {
        return;
    }

    const GA_ID: string = import.meta.env.VITE_APP_GA_ID as string;

    if (GA_ID.length <= 0) {
        return;
    }

    const element = document.createElement("script");
    element.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    element.async = true;
    document.head.appendChild(element);

    window.gtag = () => {
        dataLayer.push(arguments);
    }
    window.dataLayer = window?.dataLayer || [];

    gtag('js', new Date());
    gtag('config', GA_ID);
}