const faker = require('faker');

const generateFakeData = (numberOfRecords) => {
    return new Array(numberOfRecords).fill({}).map((v, i) => {
        return  {
		"id": faker.random.number(),
		"category": "UserManagement",
         	"correlationId": faker.random.uuid(),
		"result": "success",
		"resultReason": "Successfully added member to group",
		"activityDisplayName": "Add member to group",
		"activityDateTime": "2018-01-09T21:20:02.7215374Z",
		"loggedByService": "Core Directory",
		"initiatedBy": {
			"user": {
				"id": faker.random.uuid(),
				"displayName": `${faker.name.firstName()} ${faker.name.lastName()}`,
				"userPrincipalName": faker.internet.email(),
				"ipAddress": faker.internet.ip()
			},
			"app": null
		},
		"targetResources": [{
			"@odata.type": "#microsoft.graph.TargetResourceGroup",
			"id": faker.random.uuid(),
			"displayName": faker.internet.domainName(),
			"modifiedProperties": [{
				"displayName": "Action Client Name",
				"oldValue": null,
				"newValue": "DirectorySync"
			}],
			"groupType": "unifiedGroups"
		}, {
			"@odata.type": "#microsoft.graph.targetResourceUser",
			"id": faker.random.uuid(),
			"displayName": null,
			"modifiedProperties": [],
			"userPrincipalName": faker.internet.email()
		}],
		"additionalDetails": [{
			"key": "Additional Detail Name",
			"value": "Additional Detail Value"
		}]
	    }
    })
}

module.exports.generateFakeData = generateFakeData;
