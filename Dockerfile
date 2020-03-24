FROM node:12.16.1-alpine3.10

USER node
WORKDIR /workspace
ENV PATH /workspace/node_modules/.bin:$PATH

ENTRYPOINT [ "yarn" ]
