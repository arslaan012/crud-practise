FROM ubuntu

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update
RUN apt-get install -y curl git ca-certificates bash build-essential

WORKDIR /usr/src/app

ENV NVM_DIR=/root/.nvm
RUN mkdir -p $NVM_DIR && \ 
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash && \ 
bash -i -c "export NVM_DIR=$NVM_DIR && \ 
source $NVM_DIR/nvm.sh && \
nvm install 24.11.0 && \ 
nvm alias default 24.11.0 && \ 
nvm use default"

ENV NODE_VERSION=24.11.0
ENV PATH=$NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]