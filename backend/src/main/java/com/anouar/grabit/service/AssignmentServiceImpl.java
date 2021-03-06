package com.anouar.grabit.service;

import com.anouar.grabit.model.Courier;
import com.anouar.grabit.model.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.util.*;
import java.util.logging.Logger;

@Service
public class AssignmentServiceImpl implements AssignmentService {

    private static Logger log = Logger.getLogger(AssignmentServiceImpl.class.getName());

    @Autowired
    private OrderService orderService;

    @Autowired
    private CourierService courierService;

    @Autowired
    private CommunicationService communicationService;

    @Autowired
    private Environment env;

    Thread mainThread;
    Thread secondaryThread;
    List<Order> pendingOrders = new ArrayList<>();

    @PostConstruct
    @Override
    public void start() {
        assignOrdersToDrivers();
    }

    @PreDestroy
    @Override
    public void stop() {
        log.info("stopping main thread");
        secondaryThread.interrupt();
        log.info("stopping secondary thread");
        mainThread.interrupt();
    }


    @Override
    public void assignOrdersToDrivers() {


        mainThread = new Thread(() -> {
            log.info("Thread 1 started");
            try {
                List<Order> ordersToSet = new ArrayList<>();
                List<Courier> actifCouriers;

                while (true) {

                    for (Order order : orderService.getOrdersByStatus(null)) {
                        if (orderExists(ordersToSet, order.getId()))
                            continue;
                        else {
                            ordersToSet.add(order);
                        }
                    }


                    actifCouriers = courierService.findCouriersByStatus(true);
                    Random random = new Random();

                    for (Order order : ordersToSet) {


                        if (!actifCouriers.isEmpty() && !pendingOrders.contains(order)) {


                            int courierNumber = random.nextInt(actifCouriers.size());
                            order.setCourierId(actifCouriers.get(courierNumber));

                            orderService.saveOrder(order);
                            communicationService.pushMessageToUser(communicationService.getDriversUUID(order.getCourierId().getId()), env.getProperty("message.new_order"), env.getProperty("event.new_order"));
                            synchronized (pendingOrders) {
                                pendingOrders.add(order);
                            }
                            log.info("orders driver : " + order.getCourierId().toString());

                            // waiting for drivers approval (3 minutes)
                            countDownForDriversApproval(order);

                        } else {
                            log.info("no actif drivers, or order is being assigned to a driver");
                        }


                        log.info("Thread 1 : sleeping for 5 seconds");
                        Thread.sleep(5000);
                    }

                    if (ordersToSet.isEmpty())
                        log.info("empty orders list");

                    log.info("Thread 1 : sleeping for 3 seconds");
                    Thread.sleep(3000);
                }


            } catch (InterruptedException e) {
                e.printStackTrace();
            }

        });


        checkDriversApproval();


        mainThread.setDaemon(true);
        mainThread.start();

    }

    private void checkDriversApproval() {
        secondaryThread = new Thread(() -> {
            log.info("Thread 2 started");
            try {
                while (true) {
                    for (Order order : pendingOrders) {
                        Order checkedOrder = orderService.findOrderById(order.getId());
                        if (checkedOrder.getStatus() != null) {
                            log.info("a driver has accepted the order " + order.getId());
                            synchronized (pendingOrders) {
                                pendingOrders.remove(order);
                            }
                        }
                    }
                    log.info("Thread 2 :  sleeping for 5 seconds");
                    Thread.sleep(5000);
                }
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
        secondaryThread.setDaemon(true);
        secondaryThread.start();
    }


    private void countDownForDriversApproval(Order order) {
        Thread check = new Thread(() -> {

            try {
                log.info("waiting for drivers action (3 minutes)");
                Thread.sleep(180000);
                Order checkOrder = orderService.findOrderById(order.getId());
                if (checkOrder.getStatus() == null) {
                    log.info("the driver " + order.getCourierId().getFullName() + " didn't accept the order");
                    synchronized (order.getCourierId()) {
                        communicationService.pushMessageToUser(communicationService.getDriversUUID(order.getCourierId().getId()), env.getProperty("message.rejected_order"), env.getProperty("event.rejected_order"));
                        order.setCourierId(null);
                        orderService.saveOrder(order);
                        synchronized (pendingOrders) {
                            pendingOrders.remove(order);
                        }

                    }
                }

            } catch (InterruptedException e) {
                e.printStackTrace();
            }

        });

        check.setDaemon(true);
        check.start();
    }

    public boolean orderExists(List<Order> orders, Integer id) {
        return orders.stream().filter(order -> order.getId() == id).findFirst().isPresent();
    }


}
