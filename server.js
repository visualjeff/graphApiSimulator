'use strict';

const express = require('express');
const uuidv4 = require('uuid/v4');
const dataGenerator = require('./data/dataGenerator');

const _internals = {
    count: 0,
    max: 1000,
    skiptoken: null
}

const app = express();

app.use((req, res, next) => {
    console.log(req.method, req.originalUrl);
    next();
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

//Just to confirm the express is working
app.use('/ping', (req, res) => {
    res.send('pong');
});

//http//:localhost:3000/beta/auditLogs/directoryAudits?filter=loggedByService eq ''B2C''and activityDateTime gt ' + $daysago&top=10
app.use('/beta/auditLogs/directoryAudits', (req, res) => {
    let data;
    if (req.query.$filter) {
        _internals.count = 0;
	data = {
            "@odata.context": "https://graph.microsoft.com/beta/$metadata#auditLogs/directoryAudits",
            "value": dataGenerator.generateFakeData(Number(req.query.$top))
        }
        console.log('payload length: ', data.value.length);    
    } else {
        data = {
            "@odata.context": "https://graph.microsoft.com/beta/$metadata#auditLogs/directoryAudits",
            "value": dataGenerator.generateFakeData(Number(req.query.$top))
        }
    }
    
    if (_internals.count < _internals.max) {
	_internals.skiptoken = uuidv4();    
        data["@odata.nextLink"] = `http://localhost:3000/beta/auditLogs/directoryAudits?$top=${req.query.$top}&$skiptoken=${_internals.skiptoken}`;
        _internals.count++;
    }

    res.json(data);
});

const port = 3000;
app.listen(port, () => console.log(`listening on ${port}`));
