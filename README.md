# Augustus v3 API

Augustus v3 API using GraphQL and Sequelize. The difference with v2 is that this API uses Auth0 for authentication, so we no longer manage users via our own DB.

## Local Setup

-   `docker-compose up -d`
-   `npm install`
-   `npm run db-reset` (if DB isn't already set up)
-   Visit `localhost:8080/docs` for graphql playground

## Local Setup (with nginx-proxy)

-   Start `nginx-proxy` containers
-   `docker-compose up -d -f docker-compose.proxy.yml`
-   `npm install`
-   `npm run db-reset` (if DB isn't already set up)
-   Visit `augustus.rchen.dev/docs` for graphql playground

## Deployment

Prereqs:

-   Add alias for your VPS: `[IP ADDRESS] lightsail` in your `/etc/hosts` _or_
-   Add what's below into `~/.ssh/config` file:

```
Host lightsail
	Hostname [IP ADDRESS]
	User {Your User on Remote Server Here}
```

-   create `.env.prod` in project root with production variables (this file will be gitignored so you have to create it)
-   In the `docker-compose.prod.yml` file, update the `VIRTUAL_HOST` and `LETSENCRYPT_HOST` to the url of your custom domain.

Deploy Steps:

-   `npm run deploy`

Initial Setup: (only has to be done once)

-   Start `nginx-proxy` if you haven't already (assuming this is in a shared VPS)
-   `ssh lightsail`
-   `cd ~/apps/augustus`
-   `bash setup.sh`
-   `dc -f docker-compose.prod.yml up -d --build`
-   `docker exec -it augustus-backend bash`
-   `npm run db-reset`

Restart Server Steps: (after initial setup)

-   `ssh lightsail`
-   `cd ~/apps/augustus`
-   `bash restart.sh`

Misc:

-   `dc -f docker-compose.prod.yml ps` checks if server is running
-   `dc -f docker-compose.prof.yml logs` opens up logs for all running containers
