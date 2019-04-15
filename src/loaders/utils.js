const { keyBy } = require('lodash');

/**
 * Takes an array of items and orders them by their ID in the order of the orderedIds array.
 * Used to order an array of results from a DataLoader function
 * into the original order that it came in.
 * @param {array} orderedIds
 * @param {array} items
 * @param {string} key
 */
function orderLoaderResult(orderedIds, items, key) {
    const itemsById = keyBy(items, key);
    return orderedIds.map(item => itemsById[item]);
}

module.exports = {
    orderLoaderResult,
};
