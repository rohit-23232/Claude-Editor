/*
====================================
Simple Rate Limiter
====================================
*/

const requests = new Map();

const WINDOW = 60 * 1000;
const LIMIT = 60;

export default function rateLimiter(req, res, next) {

    const ip =
        req.ip ||
        req.socket.remoteAddress ||
        "unknown";

    const now = Date.now();

    if (!requests.has(ip)) {

        requests.set(ip, []);

    }

    let timestamps = requests.get(ip);

    timestamps = timestamps.filter(
        time => now - time < WINDOW
    );

    if (timestamps.length >= LIMIT) {

        return res.status(429).json({

            success: false,

            error: "Too many requests. Please wait."

        });

    }

    timestamps.push(now);

    requests.set(ip, timestamps);

    next();

}
