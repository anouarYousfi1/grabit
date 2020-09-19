package com.anouar.grabit.service;

import com.anouar.grabit.model.Location;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import org.assertj.core.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Logger;

@Service
@CrossOrigin(exposedHeaders = "errors, content-type", allowCredentials = "true")

public class SocketIOServiceImpl implements SocketIOService {

    private Logger log = Logger.getLogger(SocketIOServiceImpl.class.getName());

    /**
     * Store connected clients
     */
    private static Map<String, SocketIOClient> clientMap = new ConcurrentHashMap<>();
    private static Map<UUID, Location> customersMap = new ConcurrentHashMap<>();
    private static Map<UUID, Location> driversMap = new ConcurrentHashMap<>();


    /**
     * Custom Event`push_data_event` for service side to client communication
     */
    private static final String PUSH_DATA_EVENT = "push_data_event";
    private static final String POST_LOCATION = "PostLocation";
    private static final String REDIRECT_LOCATION = "RedirectLocation";

    @Autowired
    private SocketIOServer socketIOServer;

    /**
     * Spring IoC After the container is created, start after loading the SocketIOServiceImpl Bean
     */
    @PostConstruct
    private void autoStartup() {
        start();
    }

    /**
     * Spring IoC Container closes before destroying SocketIOServiceImpl Bean to avoid restarting project service port occupancy
     */
    @PreDestroy
    private void autoStop() {
        stop();
    }

    @Override
    public void start() {
        // Listen for client connections
        socketIOServer.addConnectListener(client -> {
            log.info("************ Client: " + getIpByClient(client) + " Connected ************");
            // Custom Events `connected` -> communicate with clients (built-in events such as Socket.EVENT_CONNECT can also be used)
            client.sendEvent("connected", "You're connected successfully...");
            String userId = getParamsByClient(client);
            if (userId != null) {
                clientMap.put(userId, client);
            }

        });

        // Listening Client Disconnect
        socketIOServer.addDisconnectListener(client -> {
            String clientIp = getIpByClient(client);
            log.info(clientIp + " *********************** " + "Client disconnected");
            String userId = getParamsByClient(client);
            if (userId != null) {
                clientMap.remove(userId);
            }
            client.disconnect();
        });

        // Custom Event`client_info_event` ->Listen for client messages
        socketIOServer.addEventListener(PUSH_DATA_EVENT, String.class, (client, data, ackSender) -> {
            // When a client pushes a `client_info_event` event, onData accepts data, which is json data of type string here and can be Byte[], other types of object
            String clientIp = getIpByClient(client);
            log.info(clientIp + " ************ Client : " + data);
        });


        socketIOServer.addEventListener(POST_LOCATION, Location.class, (client, data, ackSender)  -> {

            String clientIp = getIpByClient(client);
            UUID uuid = client.getSessionId();

            if(!userExists(uuid))
                saveUser(uuid, data);

            if(driversMap.containsKey(uuid) && (driversMap.get(uuid).getLongtitude() != data.getLongtitude() || driversMap.get(uuid).getLatitude() != data.getLatitude() ))
            {
                driversMap.replace(uuid, data);
            }

            log.info("data : "+data);

            for (Map.Entry<UUID,Location> driversEntry : driversMap.entrySet()) {
                for (Map.Entry<UUID,Location> customersEntry : customersMap.entrySet()) {
                    if(driversEntry.getValue().getOrder() == customersEntry.getValue().getOrder()){
                        log.info("redirecting drivers location to customer ... ");
                        socketIOServer.
                                getClient(customersEntry.getKey()).
                                sendEvent(REDIRECT_LOCATION, driversEntry.getValue());
                    }
                }
            }



            log.info(clientIp + " ************ Client : " + data.toString());

        });

        // Start Services
        socketIOServer.start();
    }

    @Override
    public void stop() {
        if (socketIOServer != null) {
            log.info("here");
            socketIOServer.stop();
            socketIOServer = null;
        }
    }

    @Override
    public void pushMessageToUser(String userId, String msgContent) {
        SocketIOClient client = clientMap.get(userId);
        if (client != null) {
            client.sendEvent(PUSH_DATA_EVENT, msgContent);
        }
    }

    /**
     * Get the userId parameter in the client url (modified here to suit individual needs and client side)
     *
     * @param client: Client
     * @return: java.lang.String
     */
    private String getParamsByClient(SocketIOClient client) {
        // Get the client url parameter (where userId is the unique identity)
        Map<String, List<String>> params = client.getHandshakeData().getUrlParams();
        List<String> userIdList = params.get("userId");
        if (!CollectionUtils.isEmpty(userIdList)) {
            return userIdList.get(0);
        }
        return null;
    }

    /**
     * Get the connected client ip address
     *
     * @param client: Client
     * @return: java.lang.String
     */
    private String getIpByClient(SocketIOClient client) {
        String sa = client.getRemoteAddress().toString();
        String clientIp = sa.substring(1, sa.indexOf(":"));
        return clientIp;
    }

    private UUID getKeyFromLocation(Map<UUID, Location> map, Location location){

        return map.entrySet()
                .stream()
                .filter(entry -> location.getOrder().equals(entry.getValue().getOrder()))
                .map(Map.Entry::getKey)
                .findFirst().get();
    }


    private void saveUser(UUID uuid , Location data){
        if(data.getType() == 1){
            customersMap.put(uuid, data);
        }else {
            driversMap.put(uuid, data);
        }
    }

    private boolean userExists(UUID uuid){
        if(customersMap.containsKey(uuid) || driversMap.containsKey(uuid))
            return true;

        return false;
    }
}