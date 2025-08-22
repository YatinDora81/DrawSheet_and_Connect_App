import { rateLimit } from 'express-rate-limit'

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 60 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
    handler: (req, res, next, options) => {
        res.status(options.statusCode).json({
            success: false,
            message: `Limit Reached, Try Again after ${options.windowMs / 60000} minutes.`,
            data: `Limit Reached, Try Again after ${options.windowMs / 60000} minutes.`,
            limit: options.limit,
            windowMs: options.windowMs,
        })
    }
})

export const roomLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    limit: 150, // Limit each IP to 60 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
    handler: (req, res, next, options) => {
        res.status(options.statusCode).json({
            success: false,
            message: `Limit Reached, Try Again after ${options.windowMs / 60000} minutes.`,
            data: `Limit Reached, Try Again after ${options.windowMs / 60000} minutes.`,
            limit: options.limit,
            windowMs: options.windowMs,
        })
    }
})

export const otpLimiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 15 minutes
    limit: 5, // Limit each IP to 60 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
    handler: (req, res, next, options) => {
        res.status(options.statusCode).json({
            success: false,
            message: `Limit Reached, Try Again after ${options.windowMs / 60000} minutes.`,
            data: `Limit Reached, Try Again after ${options.windowMs / 60000} minutes.`,
            limit: options.limit,
            windowMs: options.windowMs,
        })
    }
})