FROM mcr.microsoft.com/playwright:v1.39.0-jammy

WORKDIR /app

# Install dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-dev \
    build-essential \
    libssl-dev \
    libffi-dev \
    python3-setuptools \
    python3-venv \
    git \
    && apt-get clean

#install node
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

RUN node -v


COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

RUN npm install

COPY . /app

CMD [ "node", "index.js" ]