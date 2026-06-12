package com.ape10.rover.lang;

import java.io.StringReader;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

public class RoverService {

    public CompileResult compile(String entrada) {
        List<TokenInfo> tokens = tokenize(entrada);

        RoverLexer lexer = new RoverLexer(new StringReader(entrada));
        RoverParser parser = new RoverParser(lexer);
        try {
            Node arbol = (Node) parser.parse().value;
            return new CompileResult(true, arbol, tokens, null);
        } catch (Exception e) {
            String error = diagnosticarError(tokens);
            if (error == null) {
                String parserError = parser.getUltimoError();
                error = (parserError != null && !parserError.isBlank())
                        ? parserError : e.getMessage();
            }

            // Calcular posicion desde los tokens (mas precisa que el parser con EOF)
            int linea = 0, columna = 0;
            if (!tokens.isEmpty()) {
                TokenInfo last = tokens.get(tokens.size() - 1);
                linea = last.getLinea();
                columna = last.getColumna() + last.getLexema().length();
            }

            String detalle = "Linea " + (linea + 1) + ", columna " + (columna + 1) + ": " + error;
            return new CompileResult(false, null, tokens, detalle);
        }
    }

    private String diagnosticarError(List<TokenInfo> tokens) {
        for (int i = 0; i < tokens.size(); i++) {
            TokenInfo t = tokens.get(i);
            String tipo = t.getTipo();

            if ("ERROR".equals(tipo)) {
                return "Token no reconocido: '" + t.getLexema() + "'";
            }

            switch (tipo) {
                case "MOVE":
                    String msg = diagnosticarMove(tokens, i);
                    if (msg != null) return msg;
                    break;
                case "TURN":
                    msg = diagnosticarTurn(tokens, i);
                    if (msg != null) return msg;
                    break;
                case "TAKE":
                    msg = diagnosticarTakeSample(tokens, i);
                    if (msg != null) return msg;
                    break;
            }
        }
        if (!tokens.isEmpty()) {
            return "Error de sintaxis cerca de '" + tokens.get(tokens.size() - 1).getLexema() + "'";
        }
        return null;
    }

    private String diagnosticarMove(List<TokenInfo> tokens, int i) {
        if (i + 1 >= tokens.size())
            return "Comando incompleto: falta FORWARD o BACKWARD después de MOVE";
        String sig = tokens.get(i + 1).getTipo();
        if (!"FORWARD".equals(sig) && !"BACKWARD".equals(sig)) {
            return "Se esperaba FORWARD o BACKWARD después de MOVE, pero se encontró " + sig;
        }
        if (i + 2 >= tokens.size())
            return "Comando incompleto: falta un número después de " + sig;
        if (!"NUMERO".equals(tokens.get(i + 2).getTipo())) {
            return "Se esperaba un número después de " + sig + ", pero se encontró " + tokens.get(i + 2).getTipo();
        }
        if (i + 3 >= tokens.size())
            return "Comando incompleto: falta METERS después del número";
        if (!"METERS".equals(tokens.get(i + 3).getTipo())) {
            return "Se esperaba METERS después del número, pero se encontró " + tokens.get(i + 3).getTipo();
        }
        if (i + 4 >= tokens.size())
            return "Falta punto y coma (;) al final del comando MOVE";
        if (!"PUNTOYCOMA".equals(tokens.get(i + 4).getTipo())) {
            return "Se esperaba ; pero se encontró " + tokens.get(i + 4).getTipo();
        }
        return null;
    }

    private String diagnosticarTurn(List<TokenInfo> tokens, int i) {
        if (i + 1 >= tokens.size())
            return "Comando incompleto: falta LEFT o RIGHT después de TURN";
        String sig = tokens.get(i + 1).getTipo();
        if (!"LEFT".equals(sig) && !"RIGHT".equals(sig)) {
            return "Se esperaba LEFT o RIGHT después de TURN, pero se encontró " + sig;
        }
        if (i + 2 >= tokens.size())
            return "Comando incompleto: falta un número después de " + sig;
        if (!"NUMERO".equals(tokens.get(i + 2).getTipo())) {
            return "Se esperaba un número después de " + sig + ", pero se encontró " + tokens.get(i + 2).getTipo();
        }
        if (i + 3 >= tokens.size())
            return "Comando incompleto: falta DEGREES después del número";
        if (!"DEGREES".equals(tokens.get(i + 3).getTipo())) {
            return "Se esperaba DEGREES después del número, pero se encontró " + tokens.get(i + 3).getTipo();
        }
        if (i + 4 >= tokens.size())
            return "Falta punto y coma (;) al final del comando TURN";
        if (!"PUNTOYCOMA".equals(tokens.get(i + 4).getTipo())) {
            return "Se esperaba ; pero se encontró " + tokens.get(i + 4).getTipo();
        }
        return null;
    }

    private String diagnosticarTakeSample(List<TokenInfo> tokens, int i) {
        if (i + 1 >= tokens.size() || !"SAMPLE".equals(tokens.get(i + 1).getTipo())) {
            return "Se esperaba SAMPLE después de TAKE";
        }
        if (i + 2 >= tokens.size() || !"FROM".equals(tokens.get(i + 2).getTipo())) {
            String sig = (i + 1 < tokens.size()) ? tokens.get(i + 1).getTipo() : "?";
            return "Se esperaba FROM después de SAMPLE, pero se encontró " + sig;
        }
        if (i + 3 >= tokens.size())
            return "Comando incompleto: falta SOIL, ROCK o GAS después de FROM";
        String terreno = tokens.get(i + 3).getTipo();
        if (!"SOIL".equals(terreno) && !"ROCK".equals(terreno) && !"GAS".equals(terreno)) {
            return "Se esperaba SOIL, ROCK o GAS después de FROM, pero se encontró " + terreno;
        }
        if (i + 4 >= tokens.size())
            return "Falta punto y coma (;) al final del comando TAKE SAMPLE";
        if (!"PUNTOYCOMA".equals(tokens.get(i + 4).getTipo())) {
            return "Se esperaba ; pero se encontró " + tokens.get(i + 4).getTipo();
        }
        return null;
    }

    public List<TokenInfo> tokenize(String entrada) {
        List<TokenInfo> lista = new ArrayList<>();
        try {
            RoverLexer lexer = new RoverLexer(new StringReader(entrada));
            while (true) {
                java_cup.runtime.Symbol s = lexer.next_token();
                if (s.sym == sym.EOF) break;
                lista.add(new TokenInfo(nombreToken(s.sym), (String) s.value, s.left, s.right));
            }
        } catch (Exception ignored) {}
        return lista;
    }

    private String nombreToken(int id) {
        for (Field f : sym.class.getFields()) {
            try {
                if (f.getType() == int.class && f.getInt(null) == id) {
                    return f.getName();
                }
            } catch (Exception ignored) {}
        }
        return "DESCONOCIDO";
    }
}
