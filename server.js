import express   from 'express';
import rtspRelay from 'rtsp-relay';

const port = 3000;

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
		    console.log('location.host: ', location.host);
			
            loadPlayer({
                url: 'wss://' + location.host + '/api/stream',
                canvas: document.getElementById('canvas')
            });
        </script>
    `),
);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

