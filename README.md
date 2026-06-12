# Rover Lang — Compilador

Compilador para lenguaje de comandos Rover con analizador léxico (JFlex) y sintáctico (CUP).

## Rápido

```bash
make build        # Build Docker
make run          # Compila y corre servidor (Spring Boot en :8080)
make test         # Prueba interna del pipeline
```

## Endpoints

```bash
# Compilar texto directo
curl -X POST http://localhost:8080/api/compile \
  -H "Content-Type: text/plain" \
  -d "MOVE FORWARD 10 METERS;"

# Compilar archivo .txt
curl -X POST http://localhost:8080/api/compile/file \
  -F "file=@comandos.txt"
```

## Respuesta

```json
{
  "valido": true,
  "arbol": { "simbolo": "programa", "hijos": [...] },
  "tokens": [
    { "tipo": "MOVE", "lexema": "MOVE", "linea": 0, "columna": 0 },
    ...
  ],
  "error": null
}
```

## Gramática

```
programa    → lista_comandos
lista_comandos → comando ; | comando ; lista_comandos
comando     → comando_move | comando_turn | comando_sample
comando_move → MOVE (FORWARD|BACKWARD) NUMERO METERS
comando_turn → TURN (LEFT|RIGHT) NUMERO DEGREES
comando_sample → TAKE SAMPLE FROM (SOIL|ROCK|GAS)
```

## Stack

- JFlex 1.9.1 — analizador léxico
- CUP 0.11b — analizador sintáctico LALR(1)
- Spring Boot 4.1 — servidor REST
- Java 21
