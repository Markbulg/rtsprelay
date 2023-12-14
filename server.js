import express   from 'express';
import rtspRelay from 'rtsp-relay';

const port = process.env.PORT || 3000;

const app = express()
,     { proxy, scriptUrl } = rtspRelay(app);

console.log('scriptUrl: ', scriptUrl);

app.ws('/api/stream/:camUrl', (ws, req) => {
	const params = req.params.camUrl.replace('-', '/');
	console.log('req.params: ', req.params);
	
    return proxy({ url: `rtsp://${params}`, verbose: false })(ws);
	//return proxy({ url: `rtsp://190.46.20.34:554/1` })(ws);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

