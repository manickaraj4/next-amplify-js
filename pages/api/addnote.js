import {graphqlOperation,withSSRContext,Amplify} from 'aws-amplify';
import config from "../../src/aws-exports.js"
import * as uuid from "uuid"

import {createTodo} from '../../src/graphql/mutations';
Amplify.configure({ ...config, ssr: true })

export default async function handler(req, res) {

    const SSR = withSSRContext({req});

    const name = req.query.name ? req.query.name : "Sample Todo";

    const desc = req.query.description ? req.query.description : "Hello World!";

    const todo = { id:uuid.v4(), name: name, description: desc };

    

    //console.log(req.method);

/* create a todo */

    try {
        const result = await SSR.API.graphql(graphqlOperation(createTodo, {input: todo}));
        console.log(result);

        res.status(200);
        res.json({"result":result.data.createTodo});

    } catch (error){
        console.log(error);

        if(error.data.createTodo === null){

            console.log(error.errors);
            if(error.errors[0].errorType === 'UnAuthorized'){
                res.status(401)
                console.log("in 401");
            }else{
                res.status(500)
                console.log("in 500");
            }
            res.json({"error":error.errors[0].message})
            
        }


    }
 




}