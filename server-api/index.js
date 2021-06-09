const http = require('http');
const os = require('os');
const dns = require('dns');
const resolver = new dns.Resolver();

var address = (os.networkInterfaces().eth0 || os.networkInterfaces().en0).filter(iface => iface.family === 'IPv4')[0].address;

var NAME = 'API';
var ENV = process.env.NODE_ENV;
var PORT = process.env.PORT;
var SERVER_API;
var SERVER_ETL;
var SERVER_GQL;

resolver.resolve4('server-api', (err, addresses) => {
    console.log(err, addresses);
    if (err) throw err;

    SERVER_API = !addresses || !addresses.length || addresses[0] != address 
        ? addresses[0] 
        : 'dns could not resolve';
});

resolver.resolve4('server-etl', (err, addresses) => {
    console.log(err, addresses);
    if (err) throw err;
    
    SERVER_ETL = !addresses || !addresses.length || addresses[0] != address 
        ? addresses[0] 
        : 'dns could not resolve';
});

resolver.resolve4('server-gql', (err, addresses) => {
    console.log(err, addresses);
    if (err) throw err;

    SERVER_GQL = !addresses || !addresses.length || addresses[0] != address 
        ? addresses[0] 
        : 'dns could not resolve';
});

const server = http.createServer((req, res) => {
    console.log(NAME, req.url);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        env: ENV,
        port: PORT,
        service: NAME,
        platform: os.platform(),
        hostname: os.hostname(),
        address: address,
        addresses: {
            api: SERVER_API,
            etl: SERVER_ETL,
            gql: SERVER_GQL,
        }
    }, null, 4));
});

server.listen(PORT, () => {
    console.log(`listening on ${address}:${PORT}`);
});