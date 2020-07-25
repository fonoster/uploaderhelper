# Uploader Helper

> Watches for mew files on a volume and pushes those files to the filesserver

![publish to docker](https://github.com/fonoster/uploaderhelper/workflows/publish%20to%20docker%20hub/badge.svg)

Watches for mew files on a volume and pushes those files to the filesserver.

## Available Versions

You can see all images available to pull from Docker Hub via the [Tags](https://hub.docker.com/repository/registry-1.docker.io/fonoster/uploaderhelper/tags?page=1) page. Docker tag names that begin with a "change type" word such as task, bug, or feature are available for testing and may be removed at any time.

## Installation

You can clone this repository and manually build it.

```
cd certshelper
docker build -t fonoster/uploaderhelper:%%VERSION%% .
```

Otherwise you can pull this image from docker index.

```
docker pull fonoster/uploaderhelper:latest:%%VERSION%%
```

## Usage Example

The following is a minimal example of using this image.

```bash
docker run -it \
  -v $(pwd)/data:/data \
  fonoster/uploaderhelper
```

## Environment Variables

Environment variables are used in the entry point script to render configuration templates. You can specify the values of these variables during `docker run`, `docker-compose up`, or in Kubernetes manifests in the `env` array.

- `BUCKET` - Bucket for object storing. Defaults to `default`
- `METADATA` - Metadata for uploaded object. Defaults to `{ 'Content-Type': 'audio/x-wav' }`
- `REMOVE_AFTER_UPLOAD` - Determines action after files has been uploaded. Defaults to `false`

> The extension to test the AGI endpoint is 1002. Using ENABLE_TEST_ACCOUNT is not recommended in production.

## Volumes

- `/data` - Volume used by the image to monitoring new files.

## Contributing

Please read [CONTRIBUTING.md](https://github.com/fonoster/fonos/blob/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

- [Pedro Sanders](https://github.com/psanders)

See also the list of contributors who [participated](https://github.com/fonoster/uploaderhelper/contributors) in this project.

## License

Copyright (C) 2020 by Fonoster Inc. MIT License (see [LICENSE](https://github.com/fonoster/fonos/blob/master/LICENSE) for details).
