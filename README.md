# Keycloak behind Reverse Proxy Setup

> This is not for a production environment!!! Just playing around with Keycloak and reverse proxy.

## Run

```shell
docker compose up
```

## Containers

### `reverse_proxy`

This container is a reverse proxy for anything exposed to end users; `web` and `keycloak`.

### `web`

This container is a simple web server that serves a static page. It is used to test login by keycloak login page.

### `keycloak`

This container is a keycloak server. It is configured to use a postgres database (`keycloak_postgres`). `myrealm` is imported from `keycloak_export/realm/myrealm.json` when the container is started.

### `pseudo_backend`

### `keycloak_postgres`

This container is a postgres database for keycloak.

### `keycloak_export`

This container is used to export keycloak realm. Since keycloak server should be stopped when exporting, I needed a container other than `keycloak` where I can run `kc.sh`.

[This image is a bit customized](./keycloak_export/Dockerfile) since default keycloak image does not respect `KC_DB=postgres` environment variable (always uses `h2` database) when `kc.sh export`. Needed to specify `KC_DB=postgres` and build.

### Export Realm

```shell
docker compose exec keycloak_export /keycloak_export/export.sh
```

This script exports `myrealm` to `keycloak_export/realm/myrealm.json`.
