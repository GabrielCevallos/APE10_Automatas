package com.ape10.rover.lang;

import java.io.StringReader;

public class RoverCompiler {

    private final String input;
    private boolean valid;
    private String errorMessage;

    public RoverCompiler(String input) {
        this.input = input;
    }

    public boolean compile() {
        try {
            RoverLexer lexer = new RoverLexer(new StringReader(input));
            RoverParser parser = new RoverParser(lexer);
            parser.parse();
            valid = true;
            errorMessage = null;
            return true;
        } catch (Exception e) {
            valid = false;
            errorMessage = e.getMessage();
            return false;
        }
    }

    public boolean isValid() {
        return valid;
    }

    public String getErrorMessage() {
        return errorMessage;
    }
}
