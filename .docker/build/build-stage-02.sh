#!/bin/sh
RUN_DIR=`pwd`
cd ../..
BASE_DIR=`pwd`

echo "[queueing-web] build stage-02..."
docker rmi -f queueing-web:stage-02
docker build --no-cache -f $RUN_DIR/Dockerfile-stage-02 -t queueing-web:stage-02 .
echo ""
echo "[queueing-web] done..."

cd $RUN_DIR
