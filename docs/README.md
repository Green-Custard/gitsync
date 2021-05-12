# GC::GitSync::Job

Git Sync Jobs for an existing GC Git Sync solution

## Syntax

To declare this entity in your AWS CloudFormation template, use the following syntax:

### JSON

<pre>
{
    "Type" : "GC::GitSync::Job",
    "Properties" : {
        "<a href="#description" title="Description">Description</a>" : <i>String</i>
    }
}
</pre>

### YAML

<pre>
Type: GC::GitSync::Job
Properties:
    <a href="#description" title="Description">Description</a>: <i>String</i>
</pre>

## Properties

#### Description

The description of the Sync Job.

_Required_: Yes

_Type_: String

_Pattern_: <code>^[a-zA-Z0-9=:#@/\-,.][a-zA-Z0-9+=:#@/\-,.\s]+[a-zA-Z0-9+=:#@/\-,.]{1,256}$</code>

_Update requires_: [Replacement](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-update-behaviors.html#update-replacement)

## Return Values

### Ref

When you pass the logical ID of this resource to the intrinsic `Ref` function, Ref returns the JobID.

### Fn::GetAtt

The `Fn::GetAtt` intrinsic function returns a value for a specified attribute of this type. The following are the available attributes and sample return values.

For more information about using the `Fn::GetAtt` intrinsic function, see [Fn::GetAtt](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-getatt.html).

#### JobID

A JobID is assigned to a Job on CREATE or UPDATE, Jobs are immutable.

