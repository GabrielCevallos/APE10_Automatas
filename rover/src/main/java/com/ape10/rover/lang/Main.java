package com.ape10.rover.lang;

public class Main {
    public static void main(String[] args) throws Exception {
        String[] entradas = {
            "MOVE 10 METERS;",
            "MOVE FORWARD 10;",
            "TURN LEFT",
            "TURN 90 DEGREES;",
            "TAKE SAMPLE FROM;",
            "MOVE FORWARD 10 METERS",
            "MOVE BACKWARD 10 METERS;\nTURN RIGHT 45 DEGREES;",
            "MOVE FORWARD 10 METERS;",
        };

        RoverService service = new RoverService();

        for (int i = 0; i < entradas.length; i++) {
            System.out.println("========== Test " + (i + 1) + " ==========");
            System.out.println("Entrada: " + entradas[i].replace("\n", "\\n"));
            CompileResult resultado = service.compile(entradas[i]);
            System.out.println("Valido: " + resultado.isValido());
            if (resultado.getError() != null) {
                System.out.println("Error: " + resultado.getError());
            }
            if (resultado.getArbol() != null) {
                System.out.println("--- Arbol ---");
                printArbol(resultado.getArbol(), "");
            }
            System.out.println();
        }
    }

    static void printArbol(Node node, String indent) {
        if (node == null) return;
        System.out.println(indent + node.getSimbolo()
            + (node.getLexema() != null ? " (\"" + node.getLexema() + "\")" : ""));
        if (node.getHijos() != null) {
            for (Node h : node.getHijos()) {
                printArbol(h, indent + "  ");
            }
        }
    }
}
