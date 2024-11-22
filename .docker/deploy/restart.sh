#!/bin/sh
RUN_DIR=`pwd`
BASE_DIR=`pwd`

cd $BASE_DIR && docker-compose down

cd $BASE_DIR && docker-compose -p queueingWeb up -d

cd $BASE_DIR && docker-compose logs -f

cd $RUN_DIR
