

import * as webpush from 'web-push';
import config from './config/config';

webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    config.webpush.publicKey,
    config.webpush.privateKey
);

const WP = webpush

export default WP
