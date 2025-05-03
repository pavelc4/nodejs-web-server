console.log('haloo kita akan belajar membuat server');

const http = require('http');

const requestListener = (request, response) => {
    const { method, url } = request;
    // response.statusCode =404;
    //
    // response.statusMessage = 'usr not found';

    if (url === '/') {
        if (method === 'GET') {
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: 'Selamat Datang Di dunia Node.JS',
            }));
        } else if (method === 'POST') {
            let body = [];

            request.on('data', (chunk) => {
                body.push(chunk);
            });

            request.on('end', () => {
                body = Buffer.concat(body).toString();
                response.end(JSON.stringify({
                    message: `halaman home dengan data :  ${body}`,
                }));
            });
        } else {
            response.statusCode = 400;
            response.end(JSON.stringify({
                message: 'halaman home tidak mendukung metod ${method}!',
            }));
        }
    }


    else if (url === '/about') {
        if (method === 'GET') {
            response.statusCode = 200;
            response.end(JSON.stringify({
                message: 'heloo ini adalah halaman adalah halaman about',
            }));
        } else if (method === 'POST') {
            let body = [];

            request.on('data', (chunk) => {
                body.push(chunk);
            });

            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const { name } = JSON.parse(body);
                response.end(JSON.stringify({
                    message: `hello ${name} ini adalah halaman about`,
                }));
            });
        } else {
            response.statusCode = 400;
            response.end(JSON.stringify({
                message: 'halaman tidak tersedia ${method}!',
            }));
        }
    }


    if (method === 'PUT') {
        response.statusCode = 200;
        response.end(JSON.stringify({
            message: 'Bonjur',
        }));
    }

    if (method === 'DELETE') {
        response.statusCode = 200;
        response.end(JSON.stringify({
            message: 'salam',
        }));
    }

    if (url !== '/' && url !== '/about') {
        response.statusCode = 404;
        response.end(JSON.stringify({
            message: 'halaman tidak tersedia',
        }));
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

const port = 3000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`server berjalan pada http://${host}:${port}`);
});
