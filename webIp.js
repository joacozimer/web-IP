const http = require('http');
const fetch = require('node-fetch');

const server = http.createServer(async (req, res) => {
  if (req.url === '/getIP') {
    try {
      const response = await fetch('https://api.ipify.org?format=json');

      if (!response.ok) {
        throw new Error('La solicitud a la API falló');
      }

      const data = await response.json();
      const publicIp = data.ip;
      console.log(`La IP publica es: ${publicIp}`);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(`La IP publica es: ${publicIp}`);
    } catch (err) {
      console.error('Error al obtener la IP publica: ', err);
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.end('Error al obtener la IP publica');
    }
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('404: Not Found');
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto: ${PORT}`);
});
