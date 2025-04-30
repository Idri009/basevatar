export default (async () => {
    const { uiConfig } = await import("@basevatar/vitest-config/ui");
    return uiConfig;
})();
