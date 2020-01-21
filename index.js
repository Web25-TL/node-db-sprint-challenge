const server = require('./server.js');

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`Listenineth on thee porteth that is atop thee number ${PORT}`);
});