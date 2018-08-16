export default {
  Query: {
    hello: (): string => {
      return 'Hello World';
    }
  }
};

/////////// Subscription Example
// interface IPubSub {
//   publish: (channel: string, ctx: object) => void;
//   asyncIterator: (channel: string) => void;
// }

// Subscription: {
//   counter: {
//     subscribe: (_: any, args: object, { pubsub }: { pubsub: IPubSub }) => {
//       const channel = Math.random()
//         .toString(36)
//         .substring(2, 15); // random channel name
//       let count = 0;
//       setInterval(
//         () => pubsub.publish(channel, { counter: { count: count++ } }),
//         2000
//       );
//       return pubsub.asyncIterator(channel);
//     }
//   }
// }
