package com.ape10.rover.lang;

import java.io.StringReader;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

public class RoverService {

    public CompileResult compile(String entrada) {
        try {
            List<TokenInfo> tokens = tokenize(entrada);

            RoverLexer lexer = new RoverLexer(new StringReader(entrada));
            RoverParser parser = new RoverParser(lexer);
            Node arbol = (Node) parser.parse().value;

            return new CompileResult(true, arbol, tokens, null);
        } catch (Exception e) {
            return new CompileResult(false, null, null, e.getMessage());
        }
    }

    public List<TokenInfo> tokenize(String entrada) throws Exception {
        List<TokenInfo> lista = new ArrayList<>();
        RoverLexer lexer = new RoverLexer(new StringReader(entrada));
        while (true) {
            java_cup.runtime.Symbol s = lexer.next_token();
            if (s.sym == sym.EOF) break;
            lista.add(new TokenInfo(nombreToken(s.sym), (String) s.value, s.left, s.right));
        }
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
