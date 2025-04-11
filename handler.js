const { App } = require('@slack/bolt');

// Initialize the Slack app
const app = new App({
  token: process.env.SLACK_BOT_TOKEN || '',
  signingSecret: process.env.SLACK_SIGNING_SECRET || '',
});

// Listen for message events
app.message(async ({ message, say }) => {
  // Skip messages from bots to avoid infinite loops
  if (message.subtype === 'bot_message') {
    return;
  }

  // Check if the message contains the word 'fuck'
  if (!message.text.toLowerCase().includes('fuck')) {
    await say({
      text: `Hey <@${message.user}>, your message doesn't contain the word 'fuck'! Please try again.`,
      thread_ts: message.ts
    });
  }
});

// Handle the Lambda function
module.exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  };

  try {
    // Handle Slack's challenge verification
    if (event.body) {
      const body = JSON.parse(event.body);
      if (body.challenge) {
        return {
          statusCode: 200,
          headers,
          body: body.challenge
        };
      }
    }

    const handler = await app.start();
    const result = await handler(event, context);
    
    return {
      ...result,
      headers
    };
  } catch (error) {
    console.error('Error processing request:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}; 