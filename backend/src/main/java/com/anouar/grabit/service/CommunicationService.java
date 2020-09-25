package com.anouar.grabit.service;

import com.anouar.grabit.model.Location;
import com.corundumstudio.socketio.SocketIOServer;

import java.util.Map;
import java.util.UUID;

public interface CommunicationService {
    /**
     * Start Services
     */
    void start();

    /**
     * Out of Service
     */
    void stop();

    /**
     * Push information to specified client
     *
     * @param uuid:     Client Unique Identification
     * @param msgContent: Message Content
     */
    void pushMessageToUser(UUID uuid, String msgContent, String event);


    SocketIOServer getSocketIOServer();

    UUID getDriversUUID(Integer driversId);

}
