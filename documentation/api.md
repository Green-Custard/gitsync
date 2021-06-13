# GitSync API

This is a sample GitSync server

## Version: 1.0.0

### Security

**AccessKey**

| apiKey | _API Key_    |
| ------ | ------------ |
| In     | header       |
| Name   | x-access-key |

**AccessSecret**

| apiKey | _API Key_       |
| ------ | --------------- |
| In     | header          |
| Name   | x-access-secret |

**AccessKeyAndSecretBasicAuth**

| basic | _Basic_ |
| ----- | ------- |

### /api/syncJob

#### PUT

##### Summary

Add a new SyncJob

##### Parameters

| Name | Located in | Description                           | Required | Schema                    |
| ---- | ---------- | ------------------------------------- | -------- | ------------------------- |
| body | body       | GitSync object that needs to be added | Yes      | [SyncJobPut](#syncjobput) |

##### Responses

| Code | Description              | Schema              |
| ---- | ------------------------ | ------------------- |
| 201  | SyncJob has been created | [SyncJob](#syncjob) |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| AccessKey       |        |
| AccessSecret    |        |

### /api/syncJob/{id}

#### GET

##### Summary

Get a SyncJob

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id   | path       | SyncJob Id  | Yes      | string |

##### Responses

| Code | Description            | Schema              |
| ---- | ---------------------- | ------------------- |
| 200  | Got the SyncJob        | [SyncJob](#syncjob) |
| 404  | SyncJob does not exist |                     |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| AccessKey       |        |
| AccessSecret    |        |

#### DELETE

##### Summary

Delete a SyncJob

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id   | path       | SyncJob Id  | Yes      | string |

##### Responses

| Code | Description                          | Schema              |
| ---- | ------------------------------------ | ------------------- |
| 200  | Deleted the SyncJob or did not exist | [SyncJob](#syncjob) |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| AccessKey       |        |
| AccessSecret    |        |

### /webhook/{id}

#### GET

##### Summary

Trigger a SyncJob (Request Parameters Vary)

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id   | path       | SyncJob Id  | Yes      | string |

##### Responses

| Code | Description    |
| ---- | -------------- |
| 200  | Responses Vary |

#### POST

##### Summary

Trigger a SyncJob (Request Parameters Vary)

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id   | path       | SyncJob Id  | Yes      | string |

##### Responses

| Code | Description    |
| ---- | -------------- |
| 200  | Responses Vary |

### /status/{id}

#### GET

##### Summary

SyncJob Status Page

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id   | path       | SyncJob Id  | Yes      | string |

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 200  | SyncJob Status Page |

##### Security

| Security Schema             | Scopes |
| --------------------------- | ------ |
| AccessKeyAndSecretBasicAuth |        |

### Models

#### SyncJob

| Name      | Type   | Description    | Required |
| --------- | ------ | -------------- | -------- |
| id        | string |                | Yes      |
| secret    | string | Webhook secret | Yes      |
| publicKey | string | Deploy Key     | Yes      |

#### SyncJobPut

| Name   | Type   | Description | Required |
| ------ | ------ | ----------- | -------- |
| source | object |             | Yes      |
| target | object |             | Yes      |
