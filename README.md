# gatsby-plugin-source-eventbrite

> NOTE: THESE ARE THE V2 DOCS. DON'T WORRY YOU PROBABLY WANT THESE SINCE V1 IS BROKE

[<img src="https://img.shields.io/npm/v/gatsby-plugin-source-eventbrite.svg?style=for-the-badge" alt="npm version" />](https://www.npmjs.com/package/gatsby-plugin-source-eventbrite)

A Gatsby plugin to asynchronously load events from the [Eventbrite List Events By Organization](https://www.eventbrite.com/platform/api#/reference/event/list/list-events-by-organization).

> Note: this will only load 50 events, this is to avoid thrashing the servers and eagerly loading.

## v2 Migration Guide

v2 has moved to leverage the Eventbs by Organizations API. v1 was written against the now deprecated search API.

To upgrade please ensure your `gatsby-config.js`, contains a key for `organizationId`.

## Installation

With npm:

```bash
npm install --save gatsby-plugin-source-eventbrite@next
```

Or with Yarn:

```bash
yarn add gatsby-plugin-source-eventbrite@next
```

## Usage

In your `gatsby-config.js` file, load in the plugin along with the parameters of which events to load:

```javascript
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-source-eventbrite',
      options: {
        // You will need to generate an Eventbrite Access token
        // https://www.eventbrite.com/myaccount/apps/
        token: 'ASDF1234',
        // organization to load events for
        organizationsId: '0987LKJH',
        // This option will pass query param directly to the event search API
        // https://www.eventbrite.com/platform/api#/reference/event-search/list/search-events
        query: {
          expand: ['venue'],
        },
      },
    },
  ],
};
```

### Keeping Dynamic Content

Since gatsby plugins are used to create static content, it will not load new events until the next deployment.

As a workaround you can use webhooks. You will need a webhook on the Eventbrite side to trigger a webhook to fire a new build.

Here are the steps for leveraging webhooks to keep fresh content when hosting with [Netlify](https://www.netlify.com).

First, create Netlify a build hook url, [see instructions here](https://www.netlify.com/docs/webhooks/#incoming-webhooks). From this you will have a url like this, `https://api.netlify.com/build_hooks/XXXXXXXXXXXXXXX`, save it for the next step.

Next, [create an Eventbrite Webhook](https://www.eventbrite.com/account-settings/webhooks) to trigger the build when events are created or changed. Documentation on [Eventbrite Webhooks can be found here](https://www.eventbrite.com/platform/docs/webhooks).

Recommended Eventbrite Webhook actions:

- `event.created`
- `event.published`
- `event.unpublished`
- `event.updated`
- `organizer.updated`
- `venue.updated`

Then, use the Netlify build hook url as the "Payload URI".

Lastly, you can use the test button on the Eventbrite Webhook page to verify that the build was properly triggered.
