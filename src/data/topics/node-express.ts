import type { Topic } from '../types'

export const nodeExpress: Topic = {
  id: 'node-express',
  title: 'Node.js / Express',
  blurb: 'Event loop, modules, Express middleware and routing, auth, streams, scaling and security basics.',
  questions: [
    {
      id: 'node-1',
      question: 'What is Node.js and how does the event loop work?',
      short: `Node.js is a runtime that lets me run JavaScript outside the browser, built on Chrome's V8 engine. It is single threaded for my JS code, but it handles many requests because of the event loop. When I start something like a file read or a DB call, Node hands it off to the OS or a thread pool and keeps going. When it finishes, the callback is queued, and the event loop picks it up when the call stack is empty. That is why Node is good for I/O heavy apps and bad for heavy CPU work.`,
      simple: `Node runs JavaScript on a server. It does one thing at a time but never waits around, it starts slow tasks and comes back when they finish.`,
      followUp: ['What are the phases of the event loop?', 'Difference between process.nextTick and setImmediate?'],
    },
    {
      id: 'node-2',
      question: 'What does non-blocking I/O mean?',
      short: `It means that when I ask for something slow, like reading a file or calling a database, my code does not freeze waiting. I pass a callback or use a promise, and Node continues with other work. When the result is ready, my handler runs. A blocking call like fs.readFileSync stops everything for every user until it finishes, so on a server I avoid the Sync versions except at startup. Non-blocking is why one Node process can serve thousands of connections.`,
      simple: `Node does not stand and wait for slow jobs. It asks for the result and does other things meanwhile.`,
      example: {
        lang: 'js',
        code: `// blocking, freezes the server
const data = fs.readFileSync('big.txt')

// non-blocking
const data2 = await fs.promises.readFile('big.txt')`,
      },
      followUp: ['What happens if you run a heavy loop in a request handler?', 'How would you handle CPU-heavy work?'],
    },
    {
      id: 'node-3',
      question: 'What is the difference between CommonJS and ES modules?',
      short: `CommonJS is the older Node system with require and module.exports. It loads synchronously and is the default for .js files unless I say otherwise. ES modules use import and export, load asynchronously, support top-level await and are the standard in browsers too. To use ESM in Node I set type: module in package.json or use .mjs. In ESM I do not get __dirname by default, I use import.meta.url. For new projects I go with ESM, but many older packages are still CJS.`,
      simple: `require is the old way to share code in Node, import is the new standard way. New projects should use import.`,
      example: {
        lang: 'js',
        code: `// CJS
const express = require('express')
module.exports = router

// ESM
import express from 'express'
export default router`,
      },
      followUp: ['How do you get __dirname in ESM?', 'Can you import a CJS package from ESM?'],
    },
    {
      id: 'node-4',
      question: 'What is npm and what is in package.json?',
      short: `npm is the package manager that comes with Node, and also the public registry. package.json describes my project: name, scripts, dependencies and devDependencies. dependencies are needed at runtime and devDependencies only for building and testing. package-lock.json pins exact versions so everyone gets the same install, and I commit it. I use npm ci in CI for clean reproducible installs, and npm audit to check for known vulnerabilities. Semver ranges like ^4.18.0 allow minor and patch updates.`,
      simple: `npm installs and manages libraries. package.json lists what your project needs and the commands to run it.`,
      followUp: ['What does the caret in ^1.2.3 mean?', 'npm install vs npm ci?'],
    },
    {
      id: 'node-5',
      question: 'What is middleware in Express?',
      short: `Middleware is a function with req, res and next that sits in the request pipeline. Each one can read or change the request, end the response, or call next() to pass control on. I use them for logging, parsing JSON, auth checks, CORS and error handling. Order matters a lot, they run in the order I register them with app.use. If I forget to call next or send a response, the request just hangs, which is a classic bug.`,
      simple: `Middleware is a step that every request passes through before it reaches your route. Each step can check things and then pass it on.`,
      example: {
        lang: 'js',
        code: `app.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})`,
      },
      followUp: ['Does the order of middleware matter?', 'How do you apply middleware to only one route?'],
    },
    {
      id: 'node-6',
      question: 'How does routing work in Express?',
      short: `I map an HTTP method and path to a handler, like app.get('/users/:id', handler). Route params come from req.params, query strings from req.query. For bigger apps I split routes into files using express.Router() and mount them with app.use('/api/users', userRouter). That keeps the entry file clean. I also version the API with something like /api/v1. Routes match in the order they are declared, so specific ones go before wildcard ones.`,
      simple: `You tell Express which function should run for which URL and HTTP method. Routers let you group related routes in separate files.`,
      example: {
        lang: 'js',
        code: `const router = express.Router()
router.get('/:id', getUser)
router.post('/', createUser)
app.use('/api/users', router)`,
      },
      followUp: ['req.params vs req.query vs req.body?', 'Why does route order matter?'],
    },
    {
      id: 'node-7',
      question: 'How do you write error handling middleware in Express?',
      short: `Error middleware is the one with four arguments: err, req, res, next. Express recognises it by that signature, and I register it last, after all routes. Inside, I log the error and send a consistent JSON response with the right status code. In routes I either throw or call next(err) to land there. I usually build a small custom AppError class with a statusCode so I can tell expected errors apart from real bugs, and hide stack traces in production.`,
      simple: `It is a special function with four arguments that catches any error in your app and sends a clean error response. Put it at the end.`,
      example: {
        lang: 'js',
        code: `app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.statusCode || 500).json({
    message: err.message || 'Server error',
  })
})`,
      },
      followUp: ['Why must it have exactly four parameters?', 'How do you handle 404s?'],
    },
    {
      id: 'node-8',
      question: 'What are the req and res objects used for?',
      short: `req is the incoming request. I read req.params, req.query, req.body, req.headers and req.cookies from it. res is what I send back, with methods like res.status(201), res.json(data), res.send, res.redirect and res.cookie. res.json sets the content type and serialises the object for me. I can only send a response once, if I call res.json twice I get the 'headers already sent' error. A common habit is writing return res.status(400).json(...) so the function stops there.`,
      simple: `req holds what the client sent. res is how you reply. You can reply only once per request.`,
      followUp: ['Why do you get "Cannot set headers after they are sent"?', 'Difference between res.send and res.json?'],
    },
    {
      id: 'node-9',
      question: 'How does body parsing work in Express?',
      short: `By default Express does not read the request body. I add express.json() to parse JSON bodies and express.urlencoded({ extended: true }) for HTML form posts, and then the data shows up in req.body. These are built in since Express 4.16, so I do not need body-parser anymore. I also set a size limit like express.json({ limit: '1mb' }) to avoid huge payloads. For file uploads I use multer, since JSON parsing does not handle multipart data.`,
      simple: `Express needs a helper like express.json() to turn the request body into a JavaScript object you can read from req.body.`,
      example: {
        lang: 'js',
        code: `app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true }))`,
      },
      followUp: ['How do you handle file uploads?', 'Why set a body size limit?'],
    },
    {
      id: 'node-10',
      question: 'What is CORS and how do you handle it in Express?',
      short: `CORS is a browser rule. If my React app on one origin calls my API on another origin, the browser blocks it unless the server sends the right Access-Control-Allow-Origin headers. In Express I use the cors package. In production I do not use the wildcard, I allow only my frontend origin, and set credentials: true if I send cookies. For non-simple requests the browser first sends an OPTIONS preflight, and the cors middleware answers that too. It is only enforced by browsers, so it is not a security layer for the API itself.`,
      simple: `Browsers block a website from calling another domain's API unless that API says it is allowed. The cors package adds those permissions.`,
      example: {
        lang: 'js',
        code: `import cors from 'cors'
app.use(cors({ origin: 'https://myapp.com', credentials: true }))`,
      },
      followUp: ['What is a preflight request?', 'Why can you not use origin * with credentials?'],
    },
    {
      id: 'node-11',
      question: 'How do you implement authentication with JWT vs sessions?',
      short: `With sessions, the server stores the session data and gives the browser a session id in a cookie. It is easy to revoke, but needs a store like Redis when scaling. With JWT, the server signs a token that holds the user id, and the client sends it back each time, so the server stays stateless. Revoking is harder, so I use short-lived access tokens with a refresh token. I store tokens in httpOnly, secure cookies rather than localStorage to reduce XSS risk. For a simple app I go with sessions, for multiple services I go with JWT.`,
      simple: `Sessions: the server remembers you. JWT: you carry a signed ticket and the server just checks it. Either way, keep the cookie safe.`,
      example: {
        lang: 'js',
        code: `const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' })
res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' })

// verify middleware
const payload = jwt.verify(req.cookies.token, process.env.JWT_SECRET)`,
      },
      followUp: ['How do refresh tokens work?', 'How do you log a user out with JWT?'],
    },
    {
      id: 'node-12',
      question: 'How do you manage environment configuration in Node?',
      short: `I keep config in environment variables, not in code. Locally I use a .env file loaded by dotenv, or node --env-file in newer Node versions, and I never commit it. In production the host provides the values. I read process.env in one config file, validate the required ones at startup, for example with Zod, and fail fast if something is missing. Everything else imports from that config file, so I do not scatter process.env around the codebase.`,
      simple: `Put secrets and settings like database URLs in environment variables, not in your code, and read them in one place.`,
      example: {
        lang: 'js',
        code: `import 'dotenv/config'

export const config = {
  port: Number(process.env.PORT) || 3000,
  dbUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
}`,
      },
      followUp: ['Why fail fast on missing variables?', 'How do you handle different environments?'],
    },
    {
      id: 'node-13',
      question: 'What are streams in Node.js and why use them?',
      short: `Streams let me process data in small chunks instead of loading it all into memory. There are readable, writable, duplex and transform streams. A good example is sending a big file to the client: fs.createReadStream(file).pipe(res) uses almost no memory, whereas readFile would load the entire file first. They also handle backpressure, so a fast reader does not overwhelm a slow writer. I use pipeline from stream/promises to chain them with proper error handling.`,
      simple: `A stream moves data piece by piece, so you can handle huge files without loading them whole into memory.`,
      example: {
        lang: 'js',
        code: `import { pipeline } from 'node:stream/promises'
import fs from 'node:fs'

app.get('/video', async (req, res) => {
  await pipeline(fs.createReadStream('video.mp4'), res)
})`,
      },
      followUp: ['What is backpressure?', 'Why prefer pipeline over pipe?'],
    },
    {
      id: 'node-14',
      question: 'How do clustering and worker threads help in Node?',
      short: `Node runs my JS on one thread, so one process uses only one CPU core. The cluster module, or a process manager like PM2, starts several processes, one per core, sharing the same port, so I get more throughput for the web traffic. Worker threads are different, they run CPU-heavy tasks like image processing or big computations on another thread in the same process, so the event loop is not blocked. So cluster is for scaling requests, workers are for heavy computation. In production I often just run multiple containers behind a load balancer instead.`,
      simple: `Cluster runs several copies of your server to use all CPU cores. Worker threads move heavy calculations off the main thread.`,
      followUp: ['Cluster vs worker threads, when each?', 'How do you share session state across cluster processes?'],
    },
    {
      id: 'node-15',
      question: 'How do you handle async errors in Express?',
      short: `In Express 4, an error thrown inside an async handler is not caught, it becomes an unhandled rejection and the request hangs. So I either wrap the handler in try/catch and call next(err), or write a small asyncHandler wrapper that catches the promise rejection. Express 5 fixes this, it forwards rejected promises to the error middleware automatically. I also listen for unhandledRejection and uncaughtException to log and exit cleanly, letting a process manager restart the app.`,
      simple: `In older Express, errors in async functions get lost. Wrap the handler so errors reach your error middleware.`,
      example: {
        lang: 'js',
        code: `const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

router.get('/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  res.json(user)
}))`,
      },
      followUp: ['What changed in Express 5?', 'What do you do on an uncaughtException?'],
    },
    {
      id: 'node-16',
      question: 'How do you structure an Express project?',
      short: `I split by responsibility. Routes only map URLs to controllers. Controllers handle req and res, and call services. Services hold the business logic and talk to models or the DB layer. Alongside that I keep middleware, a config folder, and utils. The entry file only builds the app, and a separate server.js starts listening, which makes testing with supertest easier. For bigger apps I group by feature, like users/ with its own routes, controller and service.`,
      simple: `Keep routes, controllers, business logic and database code in separate folders so each file has one job.`,
      example: {
        lang: 'text',
        code: `src/
  app.js
  server.js
  config/
  middleware/
  modules/
    users/
      user.routes.js
      user.controller.js
      user.service.js
      user.model.js`,
      },
      followUp: ['Why separate app.js and server.js?', 'Layer-based vs feature-based folders?'],
    },
    {
      id: 'node-17',
      question: 'What is the controller pattern for a REST API?',
      short: `The controller is the function that handles one route. It takes req, pulls out and validates the input, calls a service, and sends back the response with the right status code. I keep business logic out of it so it stays thin. For REST I follow the conventions: GET to read, POST to create with 201, PUT or PATCH to update, DELETE to remove with 204, and plural nouns like /users. Errors are passed to the central error middleware instead of being formatted in every controller.`,
      simple: `A controller takes the request, asks the service to do the work, and returns the result. It should not contain the main logic.`,
      example: {
        lang: 'js',
        code: `export const createUser = asyncHandler(async (req, res) => {
  const user = await userService.create(req.body)
  res.status(201).json(user)
})`,
      },
      followUp: ['PUT vs PATCH?', 'Where do you validate request data?'],
    },
    {
      id: 'node-18',
      question: 'What security basics do you apply in an Express app?',
      short: `I add helmet, which sets safe HTTP headers. I add express-rate-limit, especially on login and signup routes, to slow down brute force. I restrict CORS to known origins, validate and sanitise all input with Zod or Joi, and use parameterised queries or an ORM to avoid injection. Passwords are hashed with bcrypt or argon2, cookies are httpOnly and secure, and secrets stay in env variables. I also limit body size and keep dependencies updated with npm audit.`,
      simple: `Use helmet for headers, rate limiting against spam, validate every input, hash passwords and keep secrets out of the code.`,
      example: {
        lang: 'js',
        code: `import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

app.use(helmet())
app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, max: 20 }))`,
      },
      followUp: ['What does helmet actually do?', 'How do you prevent SQL or NoSQL injection?'],
    },
  ],
}
