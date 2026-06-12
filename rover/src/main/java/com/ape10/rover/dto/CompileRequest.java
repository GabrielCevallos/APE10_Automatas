package com.ape10.rover.dto;

public class CompileRequest {

    private String code;

    public CompileRequest() {
    }

    public CompileRequest(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
