sam deploy \
  --template-file cicd/GitSyncJobRepository.yaml \
  --capabilities CAPABILITY_IAM --stack-name GitSyncJobRepository \
  --parameter-overrides $(cat ./cicd/GitSyncJobRepository.params)
