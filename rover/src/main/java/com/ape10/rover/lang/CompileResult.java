package com.ape10.rover.lang;

import java.util.List;

public class CompileResult {

    private boolean valido;
    private Node arbol;
    private List<TokenInfo> tokens;
    private String error;

    public CompileResult() {}

    public CompileResult(boolean valido, Node arbol, List<TokenInfo> tokens, String error) {
        this.valido = valido;
        this.arbol = arbol;
        this.tokens = tokens;
        this.error = error;
    }

    public boolean isValido() { return valido; }
    public Node getArbol() { return arbol; }
    public List<TokenInfo> getTokens() { return tokens; }
    public String getError() { return error; }

    public void setValido(boolean valido) { this.valido = valido; }
    public void setArbol(Node arbol) { this.arbol = arbol; }
    public void setTokens(List<TokenInfo> tokens) { this.tokens = tokens; }
    public void setError(String error) { this.error = error; }
}
