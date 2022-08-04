import {API,graphqlOperation,Auth} from 'aws-amplify';

import {createTodo} from '../../graphql/mutations';


export default async function handler(req, res) {

    const todo = { name: "My first todo", description: "Hello world!" };

    console.log(req.method);

/* create a todo */
    await API.graphql(graphqlOperation(createTodo, {input: todo}));


}