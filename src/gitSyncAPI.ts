export type CommonProps = {
  gitSyncServiceURL: string;
  gitSyncAccessToken: string;
  gitSyncAccessSecret: string;
}

export enum RepositoryType {
  GITHUB = 'GITHUB'
};

export type CreateProps = {
  repository: string;
  repositoryType: RepositoryType;
  codeCommitRepository: string;
  codeCommitAccessRoleArn: string;
} & CommonProps;

export type DelProps = {
  jobID: string;
} & CommonProps;


export type GitSyncJob = {
  jobID: string;
  webhookURL: string;
  webhookSecret: string;
  syncStatusURL: string;
  deployKey: string;
}