## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:8080](http://localhost:8080) with your browser to see the result.

## EC2 Instructions

gives you universal privilege to run commands as root

```bash
sudo su -
```

install nvm (node version manager)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

activate nvm

```bash
. ~/.nvm/nvm.sh
```

install node

```bash
nvm install node
```

check node version

```bash
node -v
```

check npm version

```bash
npm -v
```

update yum

```bash
sudo yum update -y
```

install git

```bash
sudo yum install git -y
```

check git version

```bash
git --version
```

clone the repository

```bash
git clone {repository}
```

check the repository

```bash
ls
```

change directory to the repository

```bash
cd {repository}
```

install dependencies

```bash
npm install
```

run the development server

```bash
npm run dev
```

create environment variables (first method)

```bash
touch .env
```

open the environment variables

```bash
nano .env
```

add the following environment variables

```bash
PORT=80
```

save the environment variables

```bash
ctrl + x
```

create environment variables (second method)

```bash
echo "PORT=80" > .env
```

install pm2

```bash
npm install pm2 -g
```

allow automatic restarts

```bash
sudo env PATH=$PATH:$(which node) $(which pm2) startup systemd -u $USER --hp $(eval echo ~$USER)
```

start the server (first method)

```bash
pm2 start npm --name "{name}" -- start
```

start the server using the ecosystem file (second method)

```bash
pm2 start ecosystem.config.js
```

check the status of the server

```bash
pm2 status
```

monitor the server

```bash
pm2 monit
```

stop the server

```bash
pm2 stop {name}
```

delete the server

```bash
pm2 delete {name}
```

add database environment variables (first method)

```bash
echo "DATABASE_URL={database_url}" >> .env
```

add database environment variables (second method)

```bash
nano .env
```

add the following environment variables

```bash
DATABASE_URL="postgresql://{username}:{password}@{hostname}:{port}/{database}?schema={schema}"
```

save the environment variables

```bash
ctrl + x
```

generate prisma

```bash
npx prisma generate
```

migrate the database

```bash
npx prisma migrate dev
```
