module.exports = {
    Node: {
        __resolveType(obj) {
            return obj.__typename;
        },
    },
};
