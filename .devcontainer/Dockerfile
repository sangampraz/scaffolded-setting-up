# .devcontainer/Dockerfile
FROM node:20-bookworm

# Optional: install a few useful tools
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    curl \
  && rm -rf /var/lib/apt/lists/*

# Workspace folder (VS Code will mount your repo here)
WORKDIR /workspaces

# Ensure Node/npm versions visible
RUN node -v && npm -v