#!/bin/bash

# Config
CRAFTY_SERVER_DIR="/var/opt/minecraft/crafty/crafty-4/servers"
CRAFTY_API_URL="https://localhost:8443/api/v2/servers"
API_KEY="" #Replace with bearer token
HEADER_AUTH="Authorization: Bearer $API_KEY"

# Loop through each server directory
while true; do
	# Counters
	active_servers=0

	for server_dir in "$CRAFTY_SERVER_DIR"/*/; do
	    [ -d "$server_dir" ] || continue  # Skip non-dirs
	    server_id=$(basename "$server_dir")

	    # Call Crafty API for status
	    response=$(curl -s -k -H "$HEADER_AUTH" "$CRAFTY_API_URL/$server_id/stats")

	    # Check if the server is running
	    if echo "$response" | grep -q '"running":true'; then
	        echo "Server $server_id is running."
	        ((active_servers++))
	    else
	        echo "Server $server_id is not running."
	    fi
	done

	# Take action if no servers are running
	if [ "$active_servers" -eq 0 ]; then
	    echo "No servers running. Suspending system..."
	    systemctl suspend
	else
	    echo "$active_servers server(s) running. No action taken."
	fi

    #Run every 15 minutes
	sleep 900 
done
