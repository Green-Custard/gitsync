import axios, {AxiosInstance} from 'axios';

import {LoggerProxy} from '@amazon-web-services-cloudformation/cloudformation-cli-typescript-lib';
import {AuthProps, CreateProps, DelProps, FetchProps, GitSyncJob} from './gitSyncAPI';
import {SSM} from '@viperhq/secrets';
import {pick} from './utils';

const timeout = 30000;
const secretPrefix = '/GC/GitSync';

type GitSyncServiceResponse = {
  id: string;
  source: {
    url: string;
  };
  target: {
    url: string;
    args: {
      roleArn: string;
    };
  };
  publicKey: string;
  secret: string;
  tries: number;
  lastExecution: {
    stdio: string;
    stderr: string;
    status: string;
  };
};

const createAxios = (props: AuthProps): AxiosInstance =>
  axios.create({
    baseURL: `${props.gitSyncServiceURL}/api`,
    timeout,
    headers: {
      'x-access-key': props.gitSyncAccessToken,
      'x-access-secret': props.gitSyncAccessSecret,
    },
  });

export const create = async (props: CreateProps, _: LoggerProxy): Promise<GitSyncJob> => {
  const ssm = new SSM({
    client: props.ssm,
  });
  const instance = createAxios(props);
  const response = await instance.put<GitSyncServiceResponse>('/syncJob', {
    source: {
      url: props.repository,
    },
    target: {
      url: props.codeCommitRepository,
      args: {
        roleArn: props.codeCommitAccessRoleArn,
      },
    },
  });
  await ssm.put({
    name: `${secretPrefix}/${response.data.id}`,
    content: JSON.stringify(
      pick<CreateProps, keyof AuthProps>(
        props,
        'gitSyncServiceURL',
        'gitSyncAccessToken',
        'gitSyncAccessSecret'
      )
    ),
    encrypted: true,
  });
  return {
    jobID: response.data.id,
    deployKey: response.data.publicKey,
    webhookURL: `${props.gitSyncServiceURL}/webhook/${response.data.id}`,
    webhookSecret: response.data.secret,
    syncStatusURL: `${props.gitSyncServiceURL}/status/${response.data.id}`,
  };
};

export const fetch = async (props: FetchProps, _: LoggerProxy): Promise<GitSyncJob> => {
  const ssm = new SSM({
    client: props.ssm,
  });
  const name = `${secretPrefix}/${props.jobID}`;
  const authProps: AuthProps = JSON.parse(
    (
      await ssm.batchGet([
        {
          name,
        },
      ])
    )[name]
  );
  const instance = createAxios(authProps);

  const response = await instance.get<GitSyncServiceResponse>(`/syncJob/${props.jobID}`);

  return {
    jobID: response.data.id,
    deployKey: response.data.publicKey,
    webhookURL: `${authProps.gitSyncServiceURL}/webhook/${response.data.id}`,
    webhookSecret: response.data.secret,
    syncStatusURL: `${authProps.gitSyncServiceURL}/status/${response.data.id}`,
  };
};

export const del = async (props: DelProps, _: LoggerProxy): Promise<void> => {
  const ssm = new SSM({
    client: props.ssm,
  });
  const instance = createAxios(props);
  await ssm.batchDelete([
    {
      name: `${secretPrefix}/${props.jobID}`,
    },
  ]);
  await instance.delete<GitSyncServiceResponse>(`/syncJob/${props.jobID}`);
};
