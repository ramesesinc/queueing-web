#!/bin/sh
RUN_DIR=`pwd`
cd ../..
BASE_DIR=`pwd`

echo "[queueing-web] build stage-01..."
docker rmi -f queueing-web:stage-01
docker build --no-cache -f $RUN_DIR/Dockerfile-stage-01 -t queueing-web:stage-01 .
echo ""
echo "[queueing-web] done..."

cd $RUN_DIR
