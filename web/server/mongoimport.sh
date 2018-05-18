#!/bin/bash

mongoimport -d whatschat -c users --file ./configs/users.json --type json
mongoimport -d whatschat -c chats --file ./configs/chats.json --type json
