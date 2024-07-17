import express from 'express';
import cors from 'cors';
import {
    getGameStatus,
    getGooglePoints,
    getGooglePosition,
    getGridSize,
    getPlayerPoints,
    getPlayerPosition,
    movePlayer,
    playAgain,
    start,
    subscribe,
    unsubscribe
} from '../core/state-manger.server.js';


const app = express();

app.use(cors());

const port = 3000;


app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    // res.flushHeaders(); // flush the headers to establish SSE with client
  
    const observer = (e) => {
        // Send event if changed state data
        res.write(`data: ${JSON.stringify(e)}\n\n`);
    }

    subscribe(observer)

    // Cleanup when client closes connection
    req.on('close', () => {
    unsubscribe(observer);
      res.end();
    });
  });



app.get('/start', async (req, res) => {
    //   res.send('Hello, world!');
    await start()
    res.send(200);
});
app.get('/playAgain', async (req, res) => {
    await playAgain();
    res.send(200);
});
app.get('/movePlayer', async (req, res) => {
    await movePlayer(req.query.playerNumber, req.query.direction);
    res.send(200);
});
app.get('/getGooglePoints', async (req, res) => {
    const googlePoints = await getGooglePoints();
    res.send({data: googlePoints});
});
app.get('/getPlayerPoints', async (req, res) => {
    // console.log(req.query);
    const playerPoints = await getPlayerPoints(req.query.playerNumber);
    res.send({data: playerPoints});
});
app.get('/getGameStatus', async (req, res) => {
    const gameStatus = await getGameStatus();
    res.send({data: gameStatus});
});
app.get('/getGridSize', async (req, res) => {
    const gridSize = await getGridSize();
    res.send({data: gridSize});
});
app.get('/getGooglePosition', async (req, res) => {
    const googlePosition = await getGooglePosition();
    res.send({data: googlePosition});
});
app.get('/getPlayerPosition', async (req, res) => {
    // console.log(req.query);
    const playerPosition = await getPlayerPosition(req.query.playerNumber);
    res.send({data: playerPosition});
    //  console.log(playerPosition);
});

app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
});