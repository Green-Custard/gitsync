sam deploy \
  --template-file cfn-tests/GitSyncJobRepository.yaml \
  --capabilities CAPABILITY_IAM --stack-name GitSyncJobRepository \
  --parameter-overrides $(cat ./cicd/GitSyncJobRepository.params)
