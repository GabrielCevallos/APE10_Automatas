package com.ape10.rover.controller;

import com.ape10.rover.dto.CompileRequest;
import com.ape10.rover.lang.CompileResult;
import com.ape10.rover.lang.RoverService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api")
public class CompileController {

    private final RoverService service = new RoverService();

    @PostMapping(value = "/compile", consumes = MediaType.TEXT_PLAIN_VALUE)
    public CompileResult compileText(@RequestBody String entrada) {
        return service.compile(entrada);
    }

    @PostMapping(value = "/compile", consumes = MediaType.APPLICATION_JSON_VALUE)
    public CompileResult compileJson(@RequestBody CompileRequest request) {
        return service.compile(request.getCode());
    }

    @PostMapping("/compile/file")
    public CompileResult compileFile(@RequestParam("file") MultipartFile file) throws IOException {
        String contenido = new String(file.getBytes(), StandardCharsets.UTF_8);
        return service.compile(contenido);
    }
}
