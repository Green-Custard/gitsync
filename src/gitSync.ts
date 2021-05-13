import { LoggerProxy } from "@amazon-web-services-cloudformation/cloudformation-cli-typescript-lib";
import { CreateProps, GetProps, GitSyncJob } from "./gitSyncAPI";

export const create = async(props: CreateProps, logger: LoggerProxy): Promise<GitSyncJob> => {
  return {
    jobID: String(Math.floor(Math.random() * 1000000)),
    deployKey: 'ssh-rsa 1234',
    webhookURL: 'https://example.com',
    webhookSecret: '1234',
  }
}

export const get = async(props: GetProps, logger: LoggerProxy): Promise<GitSyncJob> => {
  return {
    jobID: String(Math.floor(Math.random() * 1000000)),
    deployKey: 'ssh-rsa 1234',
    webhookURL: 'https://example.com',
    webhookSecret: '1234',
  }
}
