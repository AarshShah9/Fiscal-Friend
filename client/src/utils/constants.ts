const URL =
  process.env.REACT_APP_ENV === 'production'
    ? 'https://fiscal-friend.ca-central-1.elasticbeanstalk.com'
    : 'http://localhost:4000';

export { URL };
