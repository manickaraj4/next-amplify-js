// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Cors from 'cors';

const corsConfig = {
  "origin": "https://main.d3mecxrojhc6ov.amplifyapp.com/",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
};
const cors = Cors(corsConfig);

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handler(req, res) {

  await runMiddleware(req, res, cors)

  res.status(200).json({ name: 'John or Manick' })
}
