import NextCors from 'nextjs-cors';
import { Amplify, withSSRContext } from "aws-amplify";
import config from "../../src/aws-exports.js"

Amplify.configure({ ...config, ssr: true })

export default async function handler(req, res) {

   //let currentUser = 'Not Signed In'
   // Run the cors middleware
   // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
   await NextCors(req, res, {
      // Options
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
   });

   const SSR = withSSRContext({req});

   const currentUserInfo = await SSR.Auth.currentUserInfo();
   console.log(currentUserInfo);
   if (currentUserInfo){
      
      res.json(currentUserInfo);
   }else{

      //res.headers.push('Content-Type:application/json');
      res.status(401);
      res.json({error:'No user signed in'});

   }

   // Rest of the API logic
   
}