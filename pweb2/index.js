/*const http = require('http');
const fs = require('fs');
const path = require('path');
const HOST = 'localhost';
const PORT = 3000;

const requestHandler = (request, response) => {
    console.log(`Requested URL: ${request.url}`);

    if (request.url === '/static/html/index.html' || request.url == '/') {
        console.log('Load HTML file');
        const pathToFile = path.join(__dirname, 'static', 'html', 'index.html');
        fs.readFile(pathToFile, (error, data) => {
            if (error) {
                console.error(error);
                response.writeHead(404);
                response.end('Error loading HTML file');
            } else {
                response.setHeader('Content-Type', 'text/html');
                response.writeHead(200);
                response.end(data.toString());
            }
        });
     } else if (request.url === '/css/styles.css' || request.url === '/static/css/styles.css') {
        console.log('Load CSS file');
        const pathToFile = path.join(__dirname, 'static', 'css', 'styles.css');
        fs.readFile(pathToFile, (error, data) => {
            if (error) {
                console.error(error);
                response.writeHead(404);
                response.end('Error loading CSS file');
            } else {
                response.setHeader('Content-Type', 'text/css');
                response.writeHead(200);
                response.end(data.toString());
            }
        });
         } else {
            response.writeHead(404);
            response.end('Error loading file');
         }
         };
        
const server = http.createServer(requestHandler);
server.listen(PORT, HOST, () => {
console.log(`Web server running at http://${HOST}:${PORT}`);
         });*/

const express = require('express');
const path = require('path');
const PORT = 8000;
const HOST = 'localhost';
const app = express();

app.use((urlencoded({extended: true})));
app.use(express.static('static'));
app.use(express.urlencoded({ extended: true }));


 app.get('/', (request, response) => {
 const pathToFile = path.join(__dirname, 'static', 'html', 'index.html');
 response.sendFile(pathToFile);
 });

 app.post('/process-form', (request, response) => {
 const user = request.body;
 console.log(`First name: ${user.firstName}`);
 console.log(`Last name: ${user.lastName}`);
 console.log(`Birth date: ${user.birthday}`);
 console.log(`Email: ${user.email}`);

 response.status(200).send('Form data successfully submitted');
 });

 const server = app.listen(PORT, () => {
 console.log(`Servidor web rodando em http://${HOST}:${PORT}`);
 });