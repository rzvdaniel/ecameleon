# eCameleon.Api Prototype

## Prerequisites

1. eCameleon.Auth already up and running
2. Node.js server

## Setup

### Env

Low level configuration exists as environment variables.
Ex: Database, third party credentials, default configuration, 
website name and address.

### Configuration

All the configuration is seeded from default environment variables to the database when eCameleon.Auth is launched for the first time. Most of the default values would be overriden by eCameleon.Web during setup.

### Moleculer Configuration

Moleculer is configured in the separate file moleculer.config.js.

## Authentication

Authentication can be setup at:
- API Gateway level
- Service level
- Action level

Ideally, services should be protected from unwanted access by restricting access only to:
- certain apps
- certain groups
- authenticated users

There is possible for a service to provide unrestricted access, as a public Api, but this would be a less common scenario.

We should be able to setup this limitation dynamically, while the API Gateway is already up and running.

