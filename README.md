# gatsby-plugin-source-eventbrite

A Gatsby plugin to asynchronously load events from the [Eventbrite Event Search API](https://www.eventbrite.com/platform/api#/reference/event-search/list/search-events).

> Note: this will only load 50 events, this is to avoid thrashing the servers and eagerly loading.

## Installation

With npm:

```bash
npm install --save gatsby-plugin-source-eventbrite
```

Or with Yarn:

```bash
yarn add gatsby-plugin-source-eventbrite
```

## Usage

In your `gatsby-config.js` file, load in the plugin along with which web fonts to load. For example, loading Google Fonts could look like this:

```javascript
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-source-eventbrite',
      options: {
        // You will need to generate an Eventbrite Access token
        // https://www.eventbrite.com/myaccount/apps/
        token: '',
        // This option will pass query param directly to the event search API
        // https://www.eventbrite.com/platform/api#/reference/event-search/list/search-events
        query: {},
      },
    },
  ],
};
```

For a list of all available options, consult the [Web Font Loader readme](https://github.com/typekit/webfontloader).
