console.log('haloo kita akan belajar membuat server');

const  http = require ('http');

const requestListerner = (requset, response) => {
    response.setHeader('Content-Type', 'text/html');


    response.statusCode = 200;
    response.end('<H1> haloo HTTP Server</H1>');
}

const server = http.createServer(requestListerner);


const  port = 5000;
const  host = 'localhost';


server.listen(port, host, () => {
    console.log(`server berjalan pada Https://${host}:${port}`);
})
