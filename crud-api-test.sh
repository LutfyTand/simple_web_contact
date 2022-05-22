#!/bin/bash

readonly ACTION=$1
readonly ENDPOINT="http://localhost"

if [[ $ACTION == "get" ]]; then
    curl -i -X GET $ENDPOINT/contacts
    echo "\n=============="
elif [[ $ACTION == "post" ]]; then
    curl -i -X POST $ENDPOINT/contacts \
    -d '{"contact_id":0,"firstname":"Adas","lastname":"Bryan","email":"Adas.Bryan@contact.com","phone":"62856555378"}'
    echo "\n=============="
elif [[ $ACTION == "put" ]]; then
    curl -i -X PUT $ENDPOINT/contacts \
    -d '{"contact_id":1,"firstname":"Jones","lastname":"Jordan","email":"James.Jordan@contact.com","phone":"62838555602"}'
    echo "\n=============="
elif [[ $ACTION == "delete" ]]; then
    readonly CONTACT_ID="${2:-"3"}"
    curl -i -X "DELETE" $ENDPOINT/contacts/$CONTACT_ID
    echo "\n=============="
fi