export type AWSProps = {
  ssm: AWS.SSM;
};

export type AuthProps = {
  gitSyncServiceURL: string;
  gitSyncAccessToken: string;
  gitSyncAccessSecret: string;
};

export enum RepositoryType {
  GITHUB = 'GITHUB',
}

export type CreateProps = {
  repository: string;
  repositoryType: RepositoryType;
  codeCommitRepository: string;
  codeCommitAccessRoleArn: string;
} & AuthProps &
  AWSProps;

export type DelProps = {
  jobID: string;
} & AuthProps &
  AWSProps;

export type FetchProps = {
  jobID: string;
} & AWSProps;

export type GitSyncJob = {
  jobID: string;
  webhookURL: string;
  webhookSecret: string;
  syncStatusURL: string;
  deployKey: string;
};

export enum Errors {
  NOT_FOUND = 'NOT_FOUND',
}
