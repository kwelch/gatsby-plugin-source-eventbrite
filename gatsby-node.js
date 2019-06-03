const queryString = require('querystring');
const createNodeHelpers = require('gatsby-node-helpers').default;
const eventbrite = require('eventbrite').default;

const {
  createNodeFactory,
} = createNodeHelpers({
  typePrefix: `Eventbrite`,
})

const EventNode = createNodeFactory('Event', node => {
  // HACK: since types are inferred we need to mock them or queries fail
  node.venue = node.venue || {
    id: '',
    name: '',
    address: {
      localized_address_display: '',
    },
  };
  return node
})

exports.sourceNodes = async function(
  { actions: { createNode, setPluginStatus } },
  { query, token }
) {
  if (!token) {
    throw new Error('Missing Eventbrite OAuth token');
  }
  const sdk = eventbrite({ token });
  try {
    const { events } = await sdk.request(
      `/events/search/?${queryString.stringify(query)}`
    );

    events
      .map((event) => EventNode(event))
      .forEach((eventNode) => createNode(eventNode));

    setPluginStatus({lastFetched: new Date()});
  } catch (err) {
    console.error('EB Fetch fail:', err);
  }
};
