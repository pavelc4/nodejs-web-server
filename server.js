console.log('haloo kita akan belajar membuat server');

const http = require('http');

const requestListener = (request, response) => {
    const { method, url } = request;

    if (url === '/') {
        if (method === 'GET') {
            response.statusCode = 200;
            response.end('<h1>ini halaman home</h1>');
        } else if (method === 'POST') {
            let body = [];

            request.on('data', (chunk) => {
                body.push(chunk);
            });

            request.on('end', () => {
                body = Buffer.concat(body).toString();
                response.end(`<h1>ini halaman home dengan data: ${body}</h1>`);
            });
        } else {
            response.statusCode = 400;
            response.end(`<h1>Halaman home tidak mendukung method ${method}</h1>`);
        }
    }


    else if (url === '/about') {
        if (method === 'GET') {
            response.statusCode = 200;
            response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`);
        } else if (method === 'POST') {
            let body = [];

            request.on('data', (chunk) => {
                body.push(chunk);
            });

            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const { name } = JSON.parse(body);
                response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`);
                response.statusCode = 200;
            });
        } else {
            response.statusCode = 400;
            response.end(`<h1>Halaman tidak dapat diakses menggunakan ${method} request</h1>`);
        }
    }


    if (method === 'PUT') {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html');
        response.end('<h1>Bonjour!</h1>');
    }

    if (method === 'DELETE') {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html');
        response.end('<h1>Salam!</h1>');
    }

    if (url !== '/' && url !== '/about') {
        response.statusCode = 404;
        response.end('<h1>Halaman tidak ditemukan</h1>');
    }

    /*
    // Contoh sebelumnya (komentar lama kamu):
    // if (method === 'GET') {
    //     response.statusCode = 200;
    //     response.setHeader('Content-Type', 'text/html');
    //     response.end('<h1>Hello!</h1>');
    // }

    // if (method === 'POST') {
    //     let body = [];

    //     request.on('data', (chunk) => {
    //         body.push(chunk);
    //     });

    //     request.on('end', () => {
    //         body = Buffer.concat(body).toString();

    //         let output = body;

    //         try {
    //             const parsed = JSON.parse(body);
    //             if (parsed.name) {
    //                 output = parsed.name;
    //             }
    //         } catch (e) {

    //         }

    //         response.statusCode = 200;
    //         response.setHeader('Content-Type', 'text/html');
    //         response.end(`<h1>Hai!, ${output}</h1>`);
    //     });
    // }
    */
};

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`server berjalan pada http://${host}:${port}`);
});
