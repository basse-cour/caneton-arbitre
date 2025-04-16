ARG NODE_TAG=lts-alpine
FROM node:${NODE_TAG}

# Copy application files
COPY . /app
WORKDIR /app

### Transpilation to Javascript

# Install dev dependencies (including Typescript and types)
RUN npm ci

RUN npm run build

### Production build

# Remove dev dependencies
RUN npm prune --omit=dev

CMD ["npm", "start"]
