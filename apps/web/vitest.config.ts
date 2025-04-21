export default (async () => {
    const { nodeConfig } = await import("@basevatar/vitest-config/node");
    return nodeConfig;
})();
