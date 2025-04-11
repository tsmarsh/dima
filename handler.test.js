const { handler } = require('./handler');

describe('Handler', () => {
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
}); 