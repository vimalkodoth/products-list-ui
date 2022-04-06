/**
 * Checks if route starts with trace
 * @param route string
 * @param trace string
 * @returns boolean
 */
export const isChild = (route, trace) => {
    if (!trace || !route) return false;
    if (trace.split('-').length >= route.split('-').length) return false;
    return route.startsWith(trace);
};
