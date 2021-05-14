import axios from "axios";

import { LoggerProxy } from "@amazon-web-services-cloudformation/cloudformation-cli-typescript-lib";
import { CreateProps, DelProps, GitSyncJob } from "./gitSyncAPI";

const timeout = 30000;

type GitSyncServiceResponse = {
  id: string;
  source: {
    url: string;
  };
  target: {
    url: string;
    args: {
      roleArn: string;
    }
  };
  publicKey: string;
  secret: string;
  tries: number;
  lastExecution: {
    stdio: string;
    stderr: string;
    status: string;
  }
}

export const create = async(props: CreateProps, logger: LoggerProxy): Promise<GitSyncJob> => {
  const instance = axios.create({
    baseURL: `${props.gitSyncServiceURL}/api`,
    timeout,
    headers: {
      'x-access-key': props.gitSyncAccessToken,
      'x-access-secret': props.gitSyncAccessSecret,
    }
  });
  const response = await instance.put<GitSyncServiceResponse>('/syncJob', {
    source: {
      url: props.repository,
    },
    target: {
      url: props.codeCommitRepository,
      args: {
        roleArn: props.codeCommitAccessRoleArn,
      }
    }
  });
  return {
    jobID: response.data.id,
    deployKey: response.data.publicKey,
    webhookURL: `${props.gitSyncServiceURL}/webhook/${response.data.id}`,
    webhookSecret: response.data.secret,
  }
}

export const del = async(props: DelProps, logger: LoggerProxy): Promise<void> => {
  const instance = axios.create({
    baseURL: `${props.gitSyncServiceURL}/api`,
    timeout,
    headers: {
      'x-access-key': props.gitSyncAccessToken,
      'x-access-secret': props.gitSyncAccessSecret,
    }
  });
  await instance.delete<GitSyncServiceResponse>(`/syncJob/${props.jobID}`);
}
