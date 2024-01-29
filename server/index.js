const express = require('express');
const cors = require('cors');
const bilbordRouter = require('./routes/bilbord.routes');
const requestRouter = require('./routes/request.routes');

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.disable('etag');
app.use(express.json());
app.use('/api', bilbordRouter);
app.use('/api', requestRouter);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
