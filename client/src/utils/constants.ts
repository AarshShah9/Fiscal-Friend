const URL = !process.env.URL
  ? 'http://localhost:4000'
  : process.env.environment === 'production'
    ? 'https://fiscal-friend.ca-central-1.elasticbeanstalk.com'
    : 'http://localhost:4000';

export { URL };
