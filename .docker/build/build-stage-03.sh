#!/bin/sh
RUN_DIR=`pwd`
cd ../..
BASE_DIR=`pwd`

echo "[queueing-web] build stage-03..."
docker rmi -f ramesesinc/queueing-web:1.01
echo ""
docker build --no-cache -f $RUN_DIR/Dockerfile-stage-03 -t ramesesinc/queueing-web:1.01 .
echo ""
echo "[queueing-web] done..."

cd $RUN_DIR
