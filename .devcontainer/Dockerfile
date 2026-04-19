FROM node:22.15.1-bookworm

# Install useful tools for development
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        git \
        sudo \
        curl \
        ca-certificates \
        openssh-client \
        less \
        # for git gpg signing
        gnupg2 \
    && rm -rf /var/lib/apt/lists/*

# Allow the default `node` user to use sudo without a password (handy for installing extra tools)
RUN echo "node ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/node \
    && chmod 0440 /etc/sudoers.d/node

# Enable corepack so pnpm is available out of the box
RUN corepack enable \
    && corepack prepare pnpm@latest --activate

ENV PNPM_HOME=/home/node/.local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /workspace

USER node
