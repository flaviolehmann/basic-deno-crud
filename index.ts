import pogo from 'https://deno.land/x/pogo/main.ts';
import CarService from './services/car.service.ts';

const server = pogo.server({ port : 3000 });

const carService = new CarService();

server.router.get('/cars', (_, res) => {
  return res.response(carService.index());
});

server.router.get('/cars/{id}', (req, res) => {
  return res.response(carService.show(+req.params.id))
});

server.router.post('/cars', async (req, res) => {
  const decoder = new TextDecoder();
  const bodyText = decoder.decode(await Deno.readAll(req.body));
  return res.response(carService.create(JSON.parse(bodyText)));
});

server.router.put('/cars/{id}', async (req, res) => {
  const decoder = new TextDecoder();
  const bodyText = decoder.decode(await Deno.readAll(req.body));
  return res.response(carService.update(JSON.parse(bodyText)));
});

server.router.delete('/cars/{id}', async (req, res) => {
  carService.destroy(+req.params.id);
  return res.response().code(204);
});


console.log('Listening on port 3000')
server.start();
