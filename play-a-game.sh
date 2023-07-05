#!/bin/sh

# Play tic tac toe
echo "Play X (0,0)"
curl -X POST http://localhost:3000/game/move -d '{"x":0,"y":0}' -H 'Content-Type: application/json' | jq
# Board 
# X - -
# - - -
# - - -
echo "Play O (1,0)"
curl -X POST http://localhost:3000/game/move -d '{"x":1,"y":0}' -H 'Content-Type: application/json' | jq
# X O -
# - - -
# - - -
echo "Play X (0,1)"
curl -X POST http://localhost:3000/game/move -d '{"x":0,"y":1}' -H 'Content-Type: application/json' | jq
# X O - 
# X - -
# - - -
echo "Play O (1,1)"
curl -X POST http://localhost:3000/game/move -d '{"x":1,"y":1}' -H 'Content-Type: application/json' | jq
# X O - 
# X O -
# - - -
echo "Play X (0,2)"
curl -X POST http://localhost:3000/game/move -d '{"x":0,"y":2}' -H 'Content-Type: application/json' | jq
# X O - 
# X O -
# X - -
# !! Winner 
echo "Try to play O (1,2)"
curl -X POST http://localhost:3000/game/move -d '{"x":1,"y":2}' -H 'Content-Type: application/json' | jq
