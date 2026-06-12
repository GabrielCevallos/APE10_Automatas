package com.ape10.rover.lang;

public class TokenInfo {

    private String tipo;
    private String lexema;
    private int linea;
    private int columna;

    public TokenInfo() {}

    public TokenInfo(String tipo, String lexema, int linea, int columna) {
        this.tipo = tipo;
        this.lexema = lexema;
        this.linea = linea;
        this.columna = columna;
    }

    public String getTipo() { return tipo; }
    public String getLexema() { return lexema; }
    public int getLinea() { return linea; }
    public int getColumna() { return columna; }

    public void setTipo(String tipo) { this.tipo = tipo; }
    public void setLexema(String lexema) { this.lexema = lexema; }
    public void setLinea(int linea) { this.linea = linea; }
    public void setColumna(int columna) { this.columna = columna; }
}
