/**
 * Checks if route starts with trace
 * @param route string
 * @param trace string
 * @returns {boolean} true if route startswith trace
 */
export const isChild = (route, trace) => {
    if (!trace || !route) return false;
    if (trace.split('-').length >= route.split('-').length) return false;
    return route.startsWith(trace);
};

/**
 *
 * @param keys
 * @param listViewMap
 * @returns {Array<String>} routes
 */
export const isAllKeysChecked = (keys, listViewMap) => {
    return keys.every((key) => listViewMap[key]['checked']);
};

/**
 *
 * @param keys
 * @param listViewMap
 * @returns {Array<String>} routes
 */
export const isSomeKeysUnChecked = (keys, listViewMap) => {
    return keys.some((key) => !listViewMap[key]['checked']);
};
