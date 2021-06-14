# GC::GitSync::Job Custom Resource

## Links

- [Custom Resource Documentation](docs/README.md)
- [GitSync Architecture Documentation](documentation/arch.md)
- [GitSync API Documentation](documentation/api.md)

## Purpose

This Cloudformation Custom Resource extends the DevOps capabilites of AWS by syncing Github (can be
extended) repositories seamlessly to AWS Codecommit.

Meanwhile if AWS releases a git sync service the custom resource can be deprecated gracefully.

## Format

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Parameters:
  SSHGithubURL:
    Type: String
  GitSyncServiceURL:
    Type: String
  GitSyncAccessToken:
    Type: String
  GitSyncAccessSecret:
    Type: String
    NoEcho: True
  GitSyncServiceRole:
    Type: String
    AllowedPattern: '^arn:aws[A-Za-z0-9-]{0,64}:iam:.*:([0-9]{12})?:role/.+$'
GitSyncJobRepository:
  Type: AWS::CodeCommit::Repository
  Properties:
    RepositoryDescription: The GitSync Job Repository is synced here
    RepositoryName: GitSyncJobRepository
GitSyncJobRepositoryAccessRole:
  Type: AWS::IAM::Role
  Properties:
    MaxSessionDuration: 8400
    AssumeRolePolicyDocument:
      Statement:
        - Effect: Allow
          Principal:
            AWS: !Ref GitSyncServiceRole
          Action: sts:AssumeRole
    Policies:
      - PolicyName: GitSyncJobRepositoryAccess
        PolicyDocument:
          Version: '2012-10-17'
          Statement:
            - Effect: Allow
              Action: '*'
              Resource:
                - !Sub '${GitSyncJobRepository.Arn}'
GitSyncJobRepositoryJob:
  Type: GC::GitSync::Job
  Properties:
    Description: This job syncs the GitSyncJob repository to CodeCommit
    GitSyncServiceURL: !Ref GitSyncServiceURL
    GitSyncAccessToken: !Ref GitSyncAccessToken
    GitSyncAccessSecret: !Ref GitSyncAccessSecret
    Repository: !Ref SSHGithubURL
    RepositoryType: GITHUB
    CodeCommitRepository: !Sub 'codecommit::${AWS::Region}://${GitSyncJobRepository.Name}'
    CodeCommitAccessRoleArn: !Sub '${GitSyncJobRepositoryAccessRole.Arn}'
```

## Use cases

[The cicd example](cicd/GitSyncJobRepository.yaml) can be find in the `cicd` directory.

- Secure CI/CD pipelines for Cloudformation Custom Resources (`cicd` directory of this repository)
- Centralized git control in AWS on a single account stored in Cloudformation
- Split workflow and access control of DevOps and Development in terms of git repositories
- Easy and fast multi-region deployments while having access to git metadata in the pipelines (for
  example `git describe --tags --abbrev=1`)

## How to use

- Fork this repository
- Clone the forked repository
- Install dependencies
- Compile with `tsc`
- Deploy the resource with `cfn submit --set-default`
- Copy `cicd/GitSyncJobRepository.params.example` to `cicd/GitSyncJobRepository.params` and fill the
  parameters
- `GitSyncAccessToken`, `GitSyncAccessSecret`, `GitSyncServiceRole` can be asked from
  [Green Custard](https://green-custard.com) or you can implement your own GitSync Service using the
  [GitSync Swagger API Documentation](documentation/src/swagger.yaml)
- call `./deploy_cicd.sh`
- Add the Public Key / Deploy Key to the forked repository
- Add the Webhook and the Webhook Secret to the forked repository
- Wait for the initial sync to complete
- The sync status can be checked on the Status URL

```bash
git clone $FORK_URL
npm install
tsc
cfn submit --set-default
cp cicd/GitSyncJobRepository.params.example cicd/GitSyncJobRepository.params
# Fill the parameters
# vim cicd/GitSyncJobRepository.params
bash ./deploy_cicd.sh
# Add deploy key
# Add Webhook and Webhook Secret
```

## How it works

- On creating the custom resource, it creates a parameter in SSM parameter store for the
  `GitSync Service URL`, `Access Token` and `Access Secret`.
- It uses those credentails to make requests to the `GitSync Service`
- Those credentials can be used too to access the `Sync Status Page`
- The resource outputs a `Public Key` that can be used as a `Readonly Deploy Token` in Github and a
  `Webhook URL` that can be used to trigger the `Sync Job`
- When the job is triggered using the `Webhook` it fetches the respotory using the
  `Readonly Deploy Key` and pushes into the `Target CodeCommit Repository` using the `Role` provided
- The detailed architecture can been seen in the `links` section of this document

## License

### Code

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

### Documentation

[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
