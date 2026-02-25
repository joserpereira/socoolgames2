const json = require('./allowedOrigins.json')
export const corsOptions = {
    origin: (origin: any, callback: any) => {
        if (json.indexOf(origin) !== -1 || json.indexOf('*') !== -1 || !origin) {
            callback(null, true)
        } else {
            console.warn('Blocked by CORS:', origin)
            callback(new Error(`Origin ${origin} not allowed by CORS`))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}
