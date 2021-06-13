import axios, {AxiosInstance, AxiosResponse} from 'axios';

import {LoggerProxy} from '@amazon-web-services-cloudformation/cloudformation-cli-typescript-lib';
import {AuthProps, CreateProps, DelProps, Errors, FetchProps, GitSyncJob} from './gitSyncAPI';
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
  let response: AxiosResponse<GitSyncServiceResponse>;
  try {
    response = await instance.put<GitSyncServiceResponse>('/syncJob', {
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
  } catch (err) {
    if (err && err.config) {
      err.config.headers = {};
    }
    throw err;
  }
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
  const authString = (
    await ssm.batchGet([
      {
        name,
        default: '',
      },
    ])
  )[name];
  if (!authString) {
    throw new Error(Errors.NOT_FOUND);
  }
  const authProps: AuthProps = JSON.parse(authString);
  const instance = createAxios(authProps);

  let response: AxiosResponse<GitSyncServiceResponse>;
  try {
    response = await instance.get<GitSyncServiceResponse>(`/syncJob/${props.jobID}`);
  } catch (err) {
    if (err.response.status === 404) {
      throw new Error(Errors.NOT_FOUND);
    }
    if (err && err.config) {
      err.config.headers = {};
    }
    throw err;
  }

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
  try {
    await instance.delete<GitSyncServiceResponse>(`/syncJob/${props.jobID}`);
  } catch (err) {
    if (err && err.config) {
      err.config.headers = {};
      throw err;
    }
  }
  try {
    await ssm.batchDelete([
      {
        name: `${secretPrefix}/${props.jobID}`,
      },
    ]);
  } catch (err) {
    throw new Error(Errors.NOT_FOUND);
  }
};
