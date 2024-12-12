import https from 'node:https';

export const handler = async (event) => {
  const postData = JSON.stringify({
    username:
      event.request.userAttributes['preferred_username'] ?? event.userName,
    cognitoId: event.userName,
    profilePictureUrl: event.request.userAttributes['picture'] ?? 'i1.jpg',
    teamId: event.request.userAttributes['custom:teamId'] ?? 1,
  });

  const options = {
    hostname: process.env.API_URL ?? 'localhost',
    port: 443,
    path: '/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
    },
  };

  await new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      res.setEncoding('utf8');

      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        resolve(body);
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);

    req.end();
  });

  return event;
};
