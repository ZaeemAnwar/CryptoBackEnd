This is the back end repo meant to support: https://github.com/ZaeemAnwar/CryptoDashBoard
This repo should be deployed BEFORE the front end code to minimize errors. 

1. Create a free account on https://coinmarketcap.com/api/
2. Generate an API key and use it to replace value in the .env.example
3. Ensure there is a .env file that has the API key as specified in example
4. run `npm i` and then `npm start` or `npm dev` if working in dev mode to start express server.
5. Ensure the host deploys succesfully on port `5001`

In a production environment, this would still not be secure. As some kind of handshake should be implemneted between the FE and BE (like OAuth) to ensure only the specified website/ip address is allowed to make requests. This server is only meant to be used for the sake of the code demo and is not a recommended best practise. Rate limiting checks, query sanitation and intelligent errors have also been skipped. 
