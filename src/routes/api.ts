import { Router } from 'express';
import { bar } from '../utils/progress-bar-gen/bar.js';
import { getParam } from '../utils/f.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Hello from the /api page!'
  });
});

router.get('/bar', (req, res) => {

  const currentTime = getParam(req.query.c, 30); // Current time
  const totalTime = getParam(req.query.t, 60); // Total time
  const isCurrent = getParam(req.query.s, true); // Is it the current song?
  const isPaused = getParam(req.query.p, false); // Is it paused?
  const isLive = getParam(req.query.l, false); // Is it Live?
  const position = getParam(req.query.q, 0); // Position

  const params = [currentTime, totalTime, isCurrent, isPaused, isLive, position];

  let anyDefaulted = false;
  for (const p of params) {
    if (p.defaulted) {
      anyDefaulted = true;
      break;
    }
  }

  const buff = (
    anyDefaulted
      ? bar({
          currentTime: 100,
          totalTime: 100,
          isCurrentSong: true,
          isPaused: false,
          isLive: false,
          position: 0,
          forceCustomText: 'Error.'
        })
      : bar({
          currentTime: currentTime.value,
          totalTime: totalTime.value,
          isCurrentSong: isCurrent.value,
          isPaused: isPaused.value,
          isLive: isLive.value,
          position: position.value
        })
  ).buffer;

  res.contentType('png');
  res.writeHead(200, { 'Content-Length': buff.length }).end(buff);
});

export default router;


/*

const cache = new whateverthefuck(30 * 60 * 1000) // 30m expire time
cache.onExpire(item => cache.delete(item)) // delete on expire

on request (c:number, t:number, l:bool) ->
  id = `$c$t$l`
  if (cache[id]) // this will be false if 30m is out for the id cuz it would be deleted
    respond with cache[id]
  else
    cache[id] = generateImage(id)
    respond with cache[id]
*/