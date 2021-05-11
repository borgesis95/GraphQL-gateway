export default {
  Query: {
    user: async (parent:any, { id} :any , { models }:any) => {
      return {
        id: 1,
        username: "Pippo",
      };
    },
  },
};
