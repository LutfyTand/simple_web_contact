#!/bin/bash

echo "run db migrate"
docker exec web_contact npm run migrate
echo "run db seed"
docker exec web_contact npm run seed