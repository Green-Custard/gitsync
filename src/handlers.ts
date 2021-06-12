import {
  Action,
  BaseResource,
  handlerEvent,
  HandlerErrorCode,
  LoggerProxy,
  OperationStatus,
  Optional,
  ProgressEvent,
  ResourceHandlerRequest,
  SessionProxy,
  LambdaContext,
  Dict,
} from '@amazon-web-services-cloudformation/cloudformation-cli-typescript-lib';
import {ResourceModel} from './models';

import {RepositoryType} from './gitSyncAPI';
import AWS from 'aws-sdk';

let gitSyncFactory = import('./gitSync');

interface CallbackContext extends Record<string, any> {}

class Resource extends BaseResource<ResourceModel> {
  @handlerEvent(Action.Create)
  public async create(
    session: Optional<SessionProxy>,
    request: ResourceHandlerRequest<ResourceModel>,
    _: CallbackContext,
    logger: LoggerProxy
  ): Promise<ProgressEvent<ResourceModel, CallbackContext>> {
    const gitSync = await gitSyncFactory;
    const model = new ResourceModel(request.desiredResourceState);
    const progress = ProgressEvent.progress<ProgressEvent<ResourceModel, CallbackContext>>(model);
    try {
      const job = await gitSync.create(
        {
          ssm: session.client(AWS.SSM),
          gitSyncServiceURL: model.gitSyncServiceURL,
          gitSyncAccessToken: model.gitSyncAccessToken,
          gitSyncAccessSecret: model.gitSyncAccessSecret,
          repository: model.repository,
          repositoryType: model.repositoryType as RepositoryType,
          codeCommitRepository: model.codeCommitRepository,
          codeCommitAccessRoleArn: model.codeCommitAccessRoleArn,
        },
        logger
      );
      model.jobID = job.jobID;
      model.deployKey = job.deployKey;
      model.webhookURL = job.webhookURL;
      model.webhookSecret = job.webhookSecret;
      model.syncStatusURL = job.syncStatusURL;
      progress.status = OperationStatus.Success;
    } catch (err) {
      logger.log(err);
      return ProgressEvent.failed<ProgressEvent<ResourceModel, CallbackContext>>(
        HandlerErrorCode.InternalFailure,
        err.message
      );
    }
    return progress;
  }

  @handlerEvent(Action.Delete)
  public async delete(
    session: Optional<SessionProxy>,
    request: ResourceHandlerRequest<ResourceModel>,
    _: CallbackContext,
    logger: LoggerProxy
  ): Promise<ProgressEvent<ResourceModel, CallbackContext>> {
    const gitSync = await gitSyncFactory;
    const model = new ResourceModel(request.desiredResourceState);
    const progress = ProgressEvent.progress<ProgressEvent<ResourceModel, CallbackContext>>();
    await gitSync.del(
      {
        ssm: session.client(AWS.SSM),
        jobID: model.jobID,
        gitSyncServiceURL: model.gitSyncServiceURL,
        gitSyncAccessToken: model.gitSyncAccessToken,
        gitSyncAccessSecret: model.gitSyncAccessSecret,
      },
      logger
    );
    progress.status = OperationStatus.Success;
    return progress;
  }

  @handlerEvent(Action.Read)
  public async read(
    session: Optional<SessionProxy>,
    request: ResourceHandlerRequest<ResourceModel>,
    _: CallbackContext,
    logger: LoggerProxy
  ): Promise<ProgressEvent<ResourceModel, CallbackContext>> {
    const ssm = session.client(AWS.SSM, session.configuration);
    const gitSync = await gitSyncFactory;
    const model = new ResourceModel(request.desiredResourceState);
    const progress = ProgressEvent.progress<ProgressEvent<ResourceModel, CallbackContext>>(model);
    try {
      const job = await gitSync.fetch(
        {
          ssm: session.client(AWS.SSM),
          jobID: model.jobID,
        },
        logger
      );
      model.jobID = job.jobID;
      model.deployKey = job.deployKey;
      model.webhookURL = job.webhookURL;
      model.webhookSecret = job.webhookSecret;
      model.syncStatusURL = job.syncStatusURL;
      progress.status = OperationStatus.Success;
    } catch (err) {
      logger.log(err);
      return ProgressEvent.failed<ProgressEvent<ResourceModel, CallbackContext>>(
        HandlerErrorCode.InternalFailure,
        err.message
      );
    }
    progress.status = OperationStatus.Success;
    return progress;
  }

  @handlerEvent(Action.List)
  public async list(
    session: Optional<SessionProxy>,
    request: ResourceHandlerRequest<ResourceModel>,
    _: CallbackContext,
    logger: LoggerProxy
  ): Promise<ProgressEvent<ResourceModel, CallbackContext>> {
    const gitSync = await gitSyncFactory;
    const model = new ResourceModel(request.desiredResourceState);
    const progress = ProgressEvent.builder<ProgressEvent<ResourceModel, CallbackContext>>()
      .status(OperationStatus.Success)
      .resourceModels([model])
      .build();
    try {
      const job = await gitSync.fetch(
        {
          ssm: session.client(AWS.SSM),
          jobID: model.jobID,
        },
        logger
      );
      model.jobID = job.jobID;
      model.deployKey = job.deployKey;
      model.webhookURL = job.webhookURL;
      model.webhookSecret = job.webhookSecret;
      model.syncStatusURL = job.syncStatusURL;
      progress.status = OperationStatus.Success;
    } catch (err) {
      logger.log(err);
      return ProgressEvent.failed<ProgressEvent<ResourceModel, CallbackContext>>(
        HandlerErrorCode.InternalFailure,
        err.message
      );
    }
    return progress;
  }

  @handlerEvent(Action.Update)
  public async update(): Promise<ProgressEvent<ResourceModel, CallbackContext>> {
    return ProgressEvent.builder<ProgressEvent<ResourceModel, CallbackContext>>()
      .errorCode(HandlerErrorCode.NotUpdatable)
      .status(OperationStatus.Failed)
      .build();
  }
}

export const resource = new Resource(ResourceModel.TYPE_NAME, ResourceModel);

export const entrypoint = resource.entrypoint;

export function testEntrypoint(
  eventData: any,
  context?: Partial<LambdaContext>
): Promise<ProgressEvent<ResourceModel, Dict<any>>> {
  gitSyncFactory = import('./__mocks__/gitSync');
  return resource.testEntrypoint(eventData, context);
}
