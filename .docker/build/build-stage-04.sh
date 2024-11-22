#!/bin/sh

echo "[queueing-web] exec stage-04... cleanup"
docker rmi -f queueing-web:stage-01
docker rmi -f queueing-web:stage-02
echo "[queueing-web] list queueing-web images..."
docker images | grep queueing-web
echo ""
echo "[queueing-web] done..."
