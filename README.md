# Ribozilla

## Table of contents

* [Introduction](#introduction)
* [Pre-requisites](#pre-requisites)
* [Platforms](#platforms)
* [Get the source code](#get-the-source-code)
* [Building](#building)
  * [Windows details](#windows-details)
  * [macOS details](#macos-details)
  * [Linux details](#linux-details)
* [Development](#development)

## Introduction

**Ribozilla** is a GUI-based flexible architecture to develop RNA-Seq pipelines and setup analysis.

Ribozilla has own **Extensions API**, that takes CLI software parameters to be used in GUI to be setup and generates the scripts to run  based on inputs. It works in Mac, Linux and Windows.

## Platforms
You should be able to build Ribozilla on the following platforms:

* Windows 10
* macOS Sierra and later
* Linux

## Pre-requisites

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/en/) `x64` version `>= 12.14.1`
* [Yarn](https://classic.yarnpkg.com/en/docs/install)
* [Python](https://www.python.org/) `x64` version `>= 3.6.x`

## Get the source code

  You can get the source code cloning the repository using the following command:

    git clone https://github.com/wapablos/ribozilla.git

## Building
Build software base and extensions API
```
$ cd ribozilla
$ yarn install && yarn install-dev
```
Then, build the extensions
```
$ cd extensions
$ yarn install && yarn build
```

## Development

You can use any CLI software inside Ribozilla, using the `ribozilla-extension-api` to create it.