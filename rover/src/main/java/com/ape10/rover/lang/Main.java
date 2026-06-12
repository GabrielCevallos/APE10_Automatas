package com.ape10.rover.lang;

public class Main {
    public static void main(String[] args) throws Exception {
        String entrada = "MOVE FORWARD 10 METERS;\nTURN LEFT 90 DEGREES;\nTAKE SAMPLE FROM SOIL;";

        System.out.println("=== Entrada ===");
        System.out.println(entrada);

        RoverService service = new RoverService();
        CompileResult resultado = service.compile(entrada);

        System.out.println("=== Resultado ===");
        System.out.println("Valido: " + resultado.isValido());
        if (resultado.getError() != null) {
            System.out.println("Error: " + resultado.getError());
        }
        if (resultado.getArbol() != null) {
            printArbol(resultado.getArbol(), "");
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
