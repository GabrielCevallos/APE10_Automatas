package com.ape10.rover.lang;

import java_cup.runtime.Symbol;

%%

%class RoverLexer
%type Symbol
%unicode
%line
%column
%cup

%{
    private Symbol symbol(int id) {
        return new Symbol(id, yyline, yycolumn, yytext());
    }
%}

NUMERO = [0-9]+(\.[0-9]+)?
ESPACIO = [ \t\r\n]+

%%

"MOVE"              { return symbol(sym.MOVE); }
"FORWARD"           { return symbol(sym.FORWARD); }
"BACKWARD"          { return symbol(sym.BACKWARD); }
"TURN"              { return symbol(sym.TURN); }
"LEFT"              { return symbol(sym.LEFT); }
"RIGHT"             { return symbol(sym.RIGHT); }
"TAKE"              { return symbol(sym.TAKE); }
"SAMPLE"            { return symbol(sym.SAMPLE); }
"FROM"              { return symbol(sym.FROM); }
"METERS"            { return symbol(sym.METERS); }
"DEGREES"           { return symbol(sym.DEGREES); }
"SOIL"              { return symbol(sym.SOIL); }
"ROCK"              { return symbol(sym.ROCK); }
"GAS"               { return symbol(sym.GAS); }

{NUMERO}            { return symbol(sym.NUMERO); }
";"                 { return symbol(sym.PUNTOYCOMA); }
{ESPACIO}           { /* ignorar */ }

[A-Za-z]+[0-9]+[A-Za-z]+  { return symbol(sym.ERROR); }
[A-Za-z]+[0-9]+           { return symbol(sym.ERROR); }
[0-9]+[A-Za-z]+           { return symbol(sym.ERROR); }

[A-Za-z]+           { return symbol(sym.ERROR); }

[^]                 { return symbol(sym.ERROR); }
