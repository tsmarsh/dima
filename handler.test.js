jest.mock('@slack/bolt', () => {
  return {
    App: jest.fn().mockImplementation(() => ({
      message: jest.fn(),
      start: jest.fn().mockResolvedValue(async (event, context) => ({
        statusCode: 200,
        body: 'OK'
      }))
    }))
  };
});

const { handler } = require('./handler');

describe('Handler', () => {
  beforeEach(() => {
    process.env.SLACK_BOT_TOKEN = 'test-token';
    process.env.SLACK_SIGNING_SECRET = 'test-secret';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should respond to Slack challenge', async () => {
    const event = {
      body: JSON.stringify({
        challenge: 'test-challenge'
      })
    };

    const response = await handler(event);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe('test-challenge');
  });

  it('should handle invalid JSON', async () => {
    const event = {
      body: 'invalid-json'
    };

    const response = await handler(event);
    expect(response.statusCode).toBe(500);
  });

  it('should handle normal Slack events', async () => {
    const event = {
      body: JSON.stringify({
        type: 'event_callback',
        event: {
          type: 'message',
          text: 'test message'
        }
      })
    };

    const response = await handler(event);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe('OK');
  });
}); 