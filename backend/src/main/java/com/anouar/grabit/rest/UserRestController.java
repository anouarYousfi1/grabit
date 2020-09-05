package com.anouar.grabit.rest;

import com.anouar.grabit.model.User;
import com.anouar.grabit.service.UserService;
import com.anouar.grabit.config.SameSiteInjector;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

@RestController
@CrossOrigin(exposedHeaders = "errors, content-type ", allowCredentials ="true")
@RequestMapping("api/users")
public class UserRestController {

    @Autowired
    private UserService userService;


    @Autowired
    private SameSiteInjector sameSiteInjector;

    private static String KEY = "CUSTOMERS";

    private Logger LOG = Logger.getLogger(this.getClass().getName());


    @GetMapping("/")
    public @ResponseBody ResponseEntity<User> getMessage(HttpServletRequest request, HttpServletResponse response) {


       // response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=None");

        List emails = (List) request.getSession().getAttribute("GREETING_MESSAGES");
        User user = null;
        if(emails == null) {
            LOG.info("emails is null");
            emails = new ArrayList<>();
        }

        if(!emails.isEmpty()){
             LOG.info("finding user");
             LOG.info(emails.get(0).toString());
             user = userService.findUser((String) emails.get(0));
        }

        if(user == null){
            LOG.info("user is null");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        }


        return new ResponseEntity<User>(user,HttpStatus.OK);
    }

    @PostMapping("/login")
    public @ResponseBody ResponseEntity<List> login(@RequestBody User user ,HttpServletRequest request, HttpServletResponse response)
    {

       // response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=None");
        if(userService.findUser(user.getEmail()) != null) {
            List emails = (List) request.getSession().getAttribute("GREETING_MESSAGES");
            if (emails == null) {
                emails = new ArrayList<>();
                request.getSession().setAttribute("GREETING_MESSAGES", emails);
            }

            if (!emails.contains(user.getEmail())){
                emails.add(user.getEmail());
                LOG.info("adding email to emails");
                LOG.info("printing out session : "+ request.getSession(false).getAttribute("GREETING_MESSAGES").toString());
            }



            return new ResponseEntity<List>(emails, HttpStatus.OK);
        }

        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }



    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {

        request.getSession().invalidate();

        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {
            cookie.setMaxAge(0);
            cookie.setValue(null);
            cookie.setPath("/");
            response.addCookie(cookie);

        }
        return new ResponseEntity<String>("logged out", HttpStatus.OK);
    }   


}
