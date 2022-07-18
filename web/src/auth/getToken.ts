import { IncomingHttpHeaders } from 'http2';

function getToken(headers: IncomingHttpHeaders) {
  return headers.cookie ? { Cookie: headers.cookie } : undefined;
}

export { getToken };
