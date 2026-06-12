package com.ape10.rover.lang;

import java.util.ArrayList;
import java.util.List;

public class Node {

    private final String simbolo;
    private final String lexema;
    private final List<Node> hijos;

    // Constructor para no terminal (con hijos)
    public Node(String simbolo) {
        this.simbolo = simbolo;
        this.lexema = null;
        this.hijos = new ArrayList<>();
    }

    // Constructor para terminal (hoja)
    public Node(String simbolo, String lexema) {
        this.simbolo = simbolo;
        this.lexema = lexema;
        this.hijos = null;
    }

    public void add(Node hijo) {
        if (hijos != null) {
            hijos.add(hijo);
        }
    }

    public String getSimbolo() {
        return simbolo;
    }

    public String getLexema() {
        return lexema;
    }

    public List<Node> getHijos() {
        return hijos;
    }

    public boolean esHoja() {
        return hijos == null || hijos.isEmpty();
    }
}
