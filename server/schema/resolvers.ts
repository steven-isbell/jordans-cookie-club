export default {
  Query: {
    hello: (_: any, { id }): string => {
      return 'Hello World';
    }
  }
};
