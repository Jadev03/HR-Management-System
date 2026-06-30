export function createMockDb(queryHandler) {
  return {
    query(sql, params, callback) {
      if (typeof params === "function") {
        queryHandler(sql, [], params);
        return;
      }

      const normalizedParams = Array.isArray(params) ? params : [];
      queryHandler(sql, normalizedParams, callback);
    },
    promise() {
      return {
        query: async () => {
          throw new Error("promise().query mock not implemented for this test");
        },
      };
    },
  };
}
