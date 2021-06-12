// This is a generated file. Modifications will be overwritten.
import {
  BaseModel,
  Dict,
  integer,
  Integer,
  Optional,
  transformValue,
} from '@amazon-web-services-cloudformation/cloudformation-cli-typescript-lib';
import {Exclude, Expose, Type, Transform} from 'class-transformer';

export class ResourceModel extends BaseModel {
  ['constructor']: typeof ResourceModel;

  @Exclude()
  public static readonly TYPE_NAME: string = 'GC::GitSync::Job';

  @Exclude()
  protected readonly IDENTIFIER_KEY_JOBID: string = '/properties/JobID';

  @Expose({name: 'Description'})
  @Transform((value: any, obj: any) => transformValue(String, 'description', value, obj, []), {
    toClassOnly: true,
  })
  description?: Optional<string>;
  @Expose({name: 'GitSyncServiceURL'})
  @Transform(
    (value: any, obj: any) => transformValue(String, 'gitSyncServiceURL', value, obj, []),
    {
      toClassOnly: true,
    }
  )
  gitSyncServiceURL?: Optional<string>;
  @Expose({name: 'GitSyncAccessToken'})
  @Transform(
    (value: any, obj: any) => transformValue(String, 'gitSyncAccessToken', value, obj, []),
    {
      toClassOnly: true,
    }
  )
  gitSyncAccessToken?: Optional<string>;
  @Expose({name: 'GitSyncAccessSecret'})
  @Transform(
    (value: any, obj: any) => transformValue(String, 'gitSyncAccessSecret', value, obj, []),
    {
      toClassOnly: true,
    }
  )
  gitSyncAccessSecret?: Optional<string>;
  @Expose({name: 'Repository'})
  @Transform((value: any, obj: any) => transformValue(String, 'repository', value, obj, []), {
    toClassOnly: true,
  })
  repository?: Optional<string>;
  @Expose({name: 'RepositoryType'})
  @Transform((value: any, obj: any) => transformValue(String, 'repositoryType', value, obj, []), {
    toClassOnly: true,
  })
  repositoryType?: Optional<string>;
  @Expose({name: 'CodeCommitRepository'})
  @Transform(
    (value: any, obj: any) => transformValue(String, 'codeCommitRepository', value, obj, []),
    {
      toClassOnly: true,
    }
  )
  codeCommitRepository?: Optional<string>;
  @Expose({name: 'CodeCommitAccessRoleArn'})
  @Transform(
    (value: any, obj: any) => transformValue(String, 'codeCommitAccessRoleArn', value, obj, []),
    {
      toClassOnly: true,
    }
  )
  codeCommitAccessRoleArn?: Optional<string>;
  @Expose({name: 'JobID'})
  @Transform((value: any, obj: any) => transformValue(String, 'jobID', value, obj, []), {
    toClassOnly: true,
  })
  jobID?: Optional<string>;
  @Expose({name: 'DeployKey'})
  @Transform((value: any, obj: any) => transformValue(String, 'deployKey', value, obj, []), {
    toClassOnly: true,
  })
  deployKey?: Optional<string>;
  @Expose({name: 'WebhookURL'})
  @Transform((value: any, obj: any) => transformValue(String, 'webhookURL', value, obj, []), {
    toClassOnly: true,
  })
  webhookURL?: Optional<string>;
  @Expose({name: 'WebhookSecret'})
  @Transform((value: any, obj: any) => transformValue(String, 'webhookSecret', value, obj, []), {
    toClassOnly: true,
  })
  webhookSecret?: Optional<string>;
  @Expose({name: 'SyncStatusURL'})
  @Transform((value: any, obj: any) => transformValue(String, 'syncStatusURL', value, obj, []), {
    toClassOnly: true,
  })
  syncStatusURL?: Optional<string>;

  @Exclude()
  public getPrimaryIdentifier(): Dict {
    const identifier: Dict = {};
    if (this.jobID != null) {
      identifier[this.IDENTIFIER_KEY_JOBID] = this.jobID;
    }

    // only return the identifier if it can be used, i.e. if all components are present
    return Object.keys(identifier).length === 1 ? identifier : null;
  }

  @Exclude()
  public getAdditionalIdentifiers(): Array<Dict> {
    const identifiers: Array<Dict> = new Array<Dict>();
    // only return the identifiers if any can be used
    return identifiers.length === 0 ? null : identifiers;
  }
}
