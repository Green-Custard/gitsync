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

export type GetProps = {
  JobID: string;
} & CommonProps;


export type GitSyncJob = {
  jobID: string;
  webhookURL: string;
  webhookSecret: string;
  deployKey: string;
}