import express   from 'express';
import rtspRelay from 'rtsp-relay';

const port = process.env.PORT || 3000;

const app = express()
,     { proxy, scriptUrl } = rtspRelay(app);

const handler = proxy({
  url: `rtsp://190.46.20.34:554/1`,
  verbose: false,
});

// the endpoint our RTSP uses
app.ws('/api/stream', handler);

app.get('/', (req, res) =>
    res.send(`
        <canvas id='canvas'></canvas>

        <script src='${scriptUrl}'></script>
        <script>
            loadPlayer({
                url: 'ws://localhost:3000/api/stream',
                canvas: document.getElementById('canvas')
            });
        </script>
    `),
);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

