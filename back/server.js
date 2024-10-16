import express from 'express';
import cors from 'cors';
import {
    getGameStatus,
    getGooglePoints,
    getGooglePosition,
    getGridSize,
    getGridSizeBlockValues,
    getPlayerPoints,
    getPlayerPosition,
    getPointsToLoseBlockValues,
    getPointsToWinBlockValues,
    getSoundStatus,
    getStartButtonStatus,
    movePlayer,
    playAgain,
    saveSettings,
    start,
    subscribe,
    unsubscribe
} from '../core/state-manger.server.js';



const app = express();

app.use(cors());

const port = 3000;


app.get('/events', cors(), (req, res) => {
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



app.get('/saveSettings', async (req, res) => {
    if(req.query.newSettings == []) return;
    await saveSettings(req.query.newSettings);
    // console.log(req.query.newSettings)
    res.send(200);
    
});




app.get('/getGameStatus', async (req, res) => {
    const gameStatus = await getGameStatus();
    res.send({data: gameStatus});
});
app.get('/getGridSizeBlockValues', async (req, res) => {
    const gridSizeBlockValues = await getGridSizeBlockValues();
    res.send({data: gridSizeBlockValues});
});
app.get('/getPointsToWinBlockValues', async (req, res) => {
    const pointsToWinBlockValues = await getPointsToWinBlockValues();
    res.send({data: pointsToWinBlockValues});
});
app.get('/getPointsToLoseBlockValues', async (req, res) => {
    const pointsToLoseBlockValues = await getPointsToLoseBlockValues();
    res.send({data: pointsToLoseBlockValues});
});
app.get('/getSoundStatus', async (req, res) => {
    const soundStatus = await getSoundStatus();
    res.send({data: soundStatus});
});
app.get('/getStartButtonStatus', async (req, res) => {
    const startButtonStatus = await getStartButtonStatus();
    res.send({data: startButtonStatus});
});





app.get('/getGooglePoints', async (req, res) => {
    const googlePoints = await getGooglePoints();
    res.send({data: googlePoints});
});
app.get('/getPlayerPoints', async (req, res) => {
    const playerPoints = await getPlayerPoints(req.query.playerNumber);
    res.send({data: playerPoints});
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
    const playerPosition = await getPlayerPosition(req.query.playerNumber);
    res.send({data: playerPosition});
});


app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
});