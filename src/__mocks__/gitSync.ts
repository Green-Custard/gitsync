import {LoggerProxy} from '@amazon-web-services-cloudformation/cloudformation-cli-typescript-lib';

import {CreateProps, DelProps, Errors, FetchProps, GitSyncJob} from '../gitSyncAPI';

const store: {
  [jobID: string]: GitSyncJob;
} = {};

export const create = async (props: CreateProps, logger: LoggerProxy): Promise<GitSyncJob> => {
  const jobID = String(Math.floor(Math.random() * 1000000));
  store[jobID] = {
    jobID,
    deployKey: 'ssh-rsa 1234',
    webhookURL: 'https://example.com',
    webhookSecret: '1234',
    syncStatusURL: 'https://example.com',
  };
  return store[jobID];
};

export const fetch = async (props: FetchProps, logger: LoggerProxy): Promise<GitSyncJob> => {
  if (!store[props.jobID]) {
    throw new Error(Errors.NOT_FOUND);
  }
  return store[props.jobID];
};

export const del = async (props: DelProps, logger: LoggerProxy): Promise<void> => {
  if (!store[props.jobID]) {
    throw new Error(Errors.NOT_FOUND);
  }
  delete store[props.jobID];
};
