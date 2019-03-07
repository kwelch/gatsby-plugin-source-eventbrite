const queryString = require('query-string');
const eventbrite = require('eventbrite').default;

exports.sourceNodes = async function(
  { actions: { createNode }, createNodeId, createContentDigest },
  { query, token, verbose = true }
) {
  const processEvent = (event) => {
    return {
      ...event,
      id: createNodeId(`eventbrite-event-${event.id}`),
      parent: null,
      children: [],
      internal: {
        type: `EventbriteEvent`,
        content: JSON.stringify(event),
        contentDigest: createContentDigest(event),
      },
    };
  };
  if (!token) {
    throw new Error('Missing Eventbrite OAuth token');
  }
  const sdk = eventbrite({ token });
  try {
    const { events } = await sdk.request(
      `/events/search/?${queryString.stringify(query)}`
    );

    events
      .map((event) => processEvent(event))
      .forEach((event) => createNode(event));
  } catch (err) {
    console.error('EB Fetch fail:', err);
  }
};
