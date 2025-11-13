export const getDomain = () =>
  globalThis.location.protocol
    .concat("//")
    .concat(globalThis.location.hostname) +
  (globalThis.location.port ? `:${globalThis.location.port}` : "");
