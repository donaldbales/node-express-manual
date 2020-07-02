import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import { Errback, NextFunction, Request, Response } from 'express';
import * as rs from 'readable-stream'; // not using this. Just here for testing it's .d.ts file
import * as util from 'util';

const app: any = express();
const port: number = 8000;

function inspect(obj: any, depth: number = 13): string {
  return `${util.inspect(obj, true, depth, false)}`;
}

app.use(cookieParser('a secret', {}));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use((req: Request, res: Response, next: NextFunction) => {
  // console.log(req);
  /*
  for (const property in req) {
    if (req.hasOwnProperty(property)) {
      const descriptor: any = Object.getOwnPropertyDescriptor(req, property);
      
      if (property === 'res') {
        continue;
      }
      
      console.log(`\n***${property}`);
      // console.log(eval(`req.${property}`));
      // console.log(eval(`req[property]`));
      try {
        console.log(`${property}: ${inspect(descriptor.value, 3)}`);
      } catch (err) {
        console.log(`*not displayable*`);
      }
    }
  }
  */
  console.log(`\n\nHostname: ${req.hostname}`);
  console.log(`IP:       ${req.ip}`);
  console.log(`Headers:  ${inspect(req.headers)}`);
  console.log(`Method:   ${req.method}`);
  console.log(`Original: ${req.originalUrl}`);
  console.log(`Protocol: ${req.protocol}`);
  console.log(`Path:     ${req.path}`);
  console.log(`Domains:  ${inspect(req.subdomains)}`);
  console.log(`Query:    ${inspect(req.query)}`);
  console.log(`Params:   ${inspect(req.params)}`);
  console.log(`Body:     ${inspect(req.body)}`);
  console.log(`Cookies:  ${inspect(req.cookies)}`);
  console.log(`Signed:   ${inspect(req.signedCookies)}`);
  console.log(`Route:    ${inspect(req.route)}`);
  
  next();
});

app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send('Something broke!');
});

app.get('/', (req: Request, res: Response) => res.send('Hello World!'))

app.use(express.static('public'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
