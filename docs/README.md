# GC::GitSync::Job

Git Sync Jobs for an existing GC Git Sync solution

## Syntax

To declare this entity in your AWS CloudFormation template, use the following syntax:

### JSON

<pre>
{
    "Type" : "GC::GitSync::Job",
    "Properties" : {
        "<a href="#description" title="Description">Description</a>" : <i>String</i>,
        "<a href="#gitsyncserviceurl" title="GitSyncServiceURL">GitSyncServiceURL</a>" : <i>String</i>,
        "<a href="#gitsyncaccesstoken" title="GitSyncAccessToken">GitSyncAccessToken</a>" : <i>String</i>,
        "<a href="#gitsyncaccesssecret" title="GitSyncAccessSecret">GitSyncAccessSecret</a>" : <i>String</i>,
        "<a href="#repository" title="Repository">Repository</a>" : <i>String</i>,
        "<a href="#repositorytype" title="RepositoryType">RepositoryType</a>" : <i>String</i>,
        "<a href="#codecommitrepository" title="CodeCommitRepository">CodeCommitRepository</a>" : <i>String</i>,
        "<a href="#codecommitaccessrolearn" title="CodeCommitAccessRoleArn">CodeCommitAccessRoleArn</a>" : <i>String</i>,
    }
}
</pre>

### YAML

<pre>
Type: GC::GitSync::Job
Properties:
    <a href="#description" title="Description">Description</a>: <i>String</i>
    <a href="#gitsyncserviceurl" title="GitSyncServiceURL">GitSyncServiceURL</a>: <i>String</i>
    <a href="#gitsyncaccesstoken" title="GitSyncAccessToken">GitSyncAccessToken</a>: <i>String</i>
    <a href="#gitsyncaccesssecret" title="GitSyncAccessSecret">GitSyncAccessSecret</a>: <i>String</i>
    <a href="#repository" title="Repository">Repository</a>: <i>String</i>
    <a href="#repositorytype" title="RepositoryType">RepositoryType</a>: <i>String</i>
    <a href="#codecommitrepository" title="CodeCommitRepository">CodeCommitRepository</a>: <i>String</i>
    <a href="#codecommitaccessrolearn" title="CodeCommitAccessRoleArn">CodeCommitAccessRoleArn</a>: <i>String</i>
</pre>

## Properties

#### Description

The description of the Sync Job.

_Required_: Yes

_Type_: String

_Pattern_: <code>^[a-zA-Z0-9=:#@/\-,.][a-zA-Z0-9+=:#@/\-,.\s]+[a-zA-Z0-9+=:#@/\-,.]{1,256}$</code>

_Update requires_: [Replacement](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-update-behaviors.html#update-replacement)

#### GitSyncServiceURL

Service URL of the GitSync Service.

_Required_: Yes

_Type_: String

_Update requires_: [Replacement](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-update-behaviors.html#update-replacement)

#### GitSyncAccessToken

Access Token for the GitSync Service.

_Required_: Yes

_Type_: String

_Update requires_: [Replacement](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-update-behaviors.html#update-replacement)

#### GitSyncAccessSecret

Access Token for the GitSync Service.

_Required_: Yes

_Type_: String

_Update requires_: [Replacement](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-update-behaviors.html#update-replacement)

#### Repository

Repository SSH URL of the remote source

_Required_: Yes

_Type_: String

_Update requires_: [Replacement](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-update-behaviors.html#update-replacement)

#### RepositoryType

Repository Type of the remote source

_Required_: Yes

_Type_: String

_Allowed Values_: <code>GITHUB</code>

_Update requires_: [Replacement](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-update-behaviors.html#update-replacement)

#### CodeCommitRepository

CodeCommit Repository to sync into

_Required_: Yes

_Type_: String

_Update requires_: [Replacement](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-update-behaviors.html#update-replacement)

#### CodeCommitAccessRoleArn

The Amazon Resource Name (ARN) of the IAM role that the GitSync Service will assume.

_Required_: Yes

_Type_: String

_Minimum_: <code>1</code>

_Maximum_: <code>1283</code>

_Pattern_: <code>^arn:aws[A-Za-z0-9-]{0,64}:iam:.*:([0-9]{12})?:role/.+$</code>

_Update requires_: [Replacement](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-update-behaviors.html#update-replacement)

## Return Values

### Ref

When you pass the logical ID of this resource to the intrinsic `Ref` function, Ref returns the JobID.

### Fn::GetAtt

The `Fn::GetAtt` intrinsic function returns a value for a specified attribute of this type. The following are the available attributes and sample return values.

For more information about using the `Fn::GetAtt` intrinsic function, see [Fn::GetAtt](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-getatt.html).

#### JobID

A JobID is assigned to a Job on CREATE or UPDATE, Jobs are immutable.

#### DeployKey

A public key to be used to fetch the remote SSH git repository

#### WebhookURL

Webhook created by the GitSync service to trigger the Sync Job

#### WebhookSecret

Webhook Secret created by the GitSync service to trigger the Sync Job

