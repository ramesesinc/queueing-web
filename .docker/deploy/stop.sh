#!/bin/sh
RUN_DIR=`pwd`
BASE_DIR=`pwd`

cd $BASE_DIR && docker-compose down

cd $RUN_DIR
