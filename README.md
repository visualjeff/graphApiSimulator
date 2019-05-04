Simulates Azure MS Graph API calls so you can exercise calling @odata.nextLink urls.

To run:

```
npm install
npm start
```

Then open the url below in browser:

http//:localhost:3000/beta/auditLogs/directoryAudits?filter=loggedByService eq ''B2C''and activityDateTime gt ' + $daysago&top=10
