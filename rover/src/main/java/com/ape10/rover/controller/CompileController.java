package com.ape10.rover.controller;

import com.ape10.rover.lang.CompileResult;
import com.ape10.rover.lang.RoverService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api")
public class CompileController {

    private final RoverService service = new RoverService();

    @PostMapping("/compile")
    public CompileResult compile(@RequestBody String entrada) {
        return service.compile(entrada);
    }

    @PostMapping("/compile/file")
    public CompileResult compileFile(@RequestParam("file") MultipartFile file) throws IOException {
        String contenido = new String(file.getBytes(), StandardCharsets.UTF_8);
        return service.compile(contenido);
    }
}
