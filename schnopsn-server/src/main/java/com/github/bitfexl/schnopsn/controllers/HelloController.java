package com.github.bitfexl.schnopsn.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    @GetMapping("/hello.txt")
    public String hello() {
        return "Hello, World!";
    }
}
