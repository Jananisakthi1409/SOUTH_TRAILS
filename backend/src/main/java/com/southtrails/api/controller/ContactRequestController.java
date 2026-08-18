package com.southtrails.api.controller;

import com.southtrails.api.entity.ContactRequest;
import com.southtrails.api.repository.ContactRequestRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contact-requests")
public class ContactRequestController {

    private final ContactRequestRepository contactRequests;

    public ContactRequestController(ContactRequestRepository contactRequests) {
        this.contactRequests = contactRequests;
    }

    @PostMapping
    ContactRequest create(@RequestBody ContactRequest payload) {
        return contactRequests.save(payload);
    }
}
