# Hapi push notifications

## [Work in progress]

Example of a Node app with Hapi framework utilising push notifications

## Setup

Needs a config folder containing a configuration file with the following info (a YAML example):

```
port: 9000 # default port on which the app is running
gcm:
    apiKey: <API KEY> # gotten from Google for push notifications
    senderId: <SENDER ID> # gotten from Google for push notifications
```
