# Pruebas de la API Rover

## Endpoints

- `POST /api/compile` — entrada como texto plano (`Content-Type: text/plain`)
- `POST /api/compile/file` — subida de archivo `.txt` (multipart, campo `file`)

---

### Test 1 — Válido: tres comandos

**Entrada:**
```
MOVE FORWARD 10 METERS; TURN LEFT 90 DEGREES; TAKE SAMPLE FROM SOIL;
```

**Esperado:** `valido: true`, árbol con 3 comandos, 18 tokens, `error: null`

**Recibido:**
```json
{"valido":true,"arbol":{"simbolo":"programa","hijos":[{"simbolo":"lista_comandos","hijos":[{"simbolo":"comando","hijos":[{"simbolo":"comando_move","hijos":[{"simbolo":"MOVE","lexema":"MOVE","hijos":[]},{"simbolo":"dir_move","hijos":[{"simbolo":"FORWARD","lexema":"FORWARD","hijos":[]}]},{"simbolo":"NUMERO","lexema":"10","hijos":[]},{"simbolo":"METERS","lexema":"METERS","hijos":[]}]}]},{"simbolo":"PUNTOYCOMA","lexema":";","hijos":[]},{"simbolo":"lista_comandos","hijos":[{"simbolo":"comando","hijos":[{"simbolo":"comando_turn","hijos":[{"simbolo":"TURN","lexema":"TURN","hijos":[]},{"simbolo":"dir_turn","hijos":[{"simbolo":"LEFT","lexema":"LEFT","hijos":[]}]},{"simbolo":"NUMERO","lexema":"90","hijos":[]},{"simbolo":"DEGREES","lexema":"DEGREES","hijos":[]}]}]},{"simbolo":"PUNTOYCOMA","lexema":";","hijos":[]},{"simbolo":"lista_comandos","hijos":[{"simbolo":"comando","hijos":[{"simbolo":"comando_sample","hijos":[{"simbolo":"TAKE","lexema":"TAKE","hijos":[]},{"simbolo":"SAMPLE","lexema":"SAMPLE","hijos":[]},{"simbolo":"FROM","lexema":"FROM","hijos":[]},{"simbolo":"terreno","hijos":[{"simbolo":"SOIL","lexema":"SOIL","hijos":[]}]}]}]},{"simbolo":"PUNTOYCOMA","lexema":";","hijos":[]}]}]}]}],"tokens":[{"tipo":"MOVE","lexema":"MOVE","linea":0,"columna":0},{"tipo":"FORWARD","lexema":"FORWARD","linea":0,"columna":5},{"tipo":"NUMERO","lexema":"10","linea":0,"columna":13},{"tipo":"METERS","lexema":"METERS","linea":0,"columna":16},{"tipo":"PUNTOYCOMA","lexema":";","linea":0,"columna":22},{"tipo":"TURN","lexema":"TURN","linea":0,"columna":24},{"tipo":"LEFT","lexema":"LEFT","linea":0,"columna":29},{"tipo":"NUMERO","lexema":"90","linea":0,"columna":34},{"tipo":"DEGREES","lexema":"DEGREES","linea":0,"columna":37},{"tipo":"PUNTOYCOMA","lexema":";","linea":0,"columna":44},{"tipo":"TAKE","lexema":"TAKE","linea":0,"columna":46},{"tipo":"SAMPLE","lexema":"SAMPLE","linea":0,"columna":51},{"tipo":"FROM","lexema":"FROM","linea":0,"columna":58},{"tipo":"SOIL","lexema":"SOIL","linea":0,"columna":63},{"tipo":"PUNTOYCOMA","lexema":";","linea":0,"columna":67}],"error":null}
```

**Resultado:** ✅ OK

---

### Test 2 — MOVE sin dirección

**Entrada:**
```
MOVE 10 METERS;
```

**Esperado:** `valido: false`, error indicando que falta FORWARD o BACKWARD

**Recibido:**
```json
{"valido":false,"arbol":null,"tokens":[{"tipo":"MOVE","lexema":"MOVE","linea":0,"columna":0},{"tipo":"NUMERO","lexema":"10","linea":0,"columna":5},{"tipo":"METERS","lexema":"METERS","linea":0,"columna":8},{"tipo":"PUNTOYCOMA","lexema":";","linea":0,"columna":14}],"error":"Linea 1, columna 16: Se esperaba FORWARD o BACKWARD después de MOVE, pero se encontró NUMERO"}
```

**Resultado:** ✅ OK

---

### Test 3 — Falta punto y coma

**Entrada:**
```
MOVE FORWARD 10 METERS
```

**Esperado:** `valido: false`, error indicando que falta `;`

**Recibido:**
```json
{"valido":false,"arbol":null,"tokens":[{"tipo":"MOVE","lexema":"MOVE","linea":0,"columna":0},{"tipo":"FORWARD","lexema":"FORWARD","linea":0,"columna":5},{"tipo":"NUMERO","lexema":"10","linea":0,"columna":13},{"tipo":"METERS","lexema":"METERS","linea":0,"columna":16}],"error":"Linea 1, columna 23: Falta punto y coma (;) al final del comando MOVE"}
```

**Resultado:** ✅ OK

---

### Test 4 — TURN sin LEFT/RIGHT

**Entrada:**
```
TURN 90 DEGREES;
```

**Esperado:** `valido: false`, error indicando que falta LEFT o RIGHT

**Recibido:**
```json
{"valido":false,"arbol":null,"tokens":[{"tipo":"TURN","lexema":"TURN","linea":0,"columna":0},{"tipo":"NUMERO","lexema":"90","linea":0,"columna":5},{"tipo":"DEGREES","lexema":"DEGREES","linea":0,"columna":8},{"tipo":"PUNTOYCOMA","lexema":";","linea":0,"columna":15}],"error":"Linea 1, columna 17: Se esperaba LEFT o RIGHT después de TURN, pero se encontró NUMERO"}
```

**Resultado:** ✅ OK

---

### Test 5 — TAKE SAMPLE incompleto

**Entrada:**
```
TAKE SAMPLE FROM;
```

**Esperado:** `valido: false`, error indicando que falta SOIL, ROCK o GAS

**Recibido:**
```json
{"valido":false,"arbol":null,"tokens":[{"tipo":"TAKE","lexema":"TAKE","linea":0,"columna":0},{"tipo":"SAMPLE","lexema":"SAMPLE","linea":0,"columna":5},{"tipo":"FROM","lexema":"FROM","linea":0,"columna":12},{"tipo":"PUNTOYCOMA","lexema":";","linea":0,"columna":16}],"error":"Linea 1, columna 18: Se esperaba SOIL, ROCK o GAS después de FROM, pero se encontró PUNTOYCOMA"}
```

**Resultado:** ✅ OK

---

### Test 6 — Archivo válido

**Entrada:** archivo `test_rover.txt` con `MOVE BACKWARD 5 METERS;`

**Esperado:** `valido: true`, árbol con MOVE BACKWARD, tokens, `error: null`

**Recibido:**
```json
{"valido":true,"arbol":{"simbolo":"programa","hijos":[{"simbolo":"lista_comandos","hijos":[{"simbolo":"comando","hijos":[{"simbolo":"comando_move","hijos":[{"simbolo":"MOVE","lexema":"MOVE","hijos":[]},{"simbolo":"dir_move","hijos":[{"simbolo":"BACKWARD","lexema":"BACKWARD","hijos":[]}]},{"simbolo":"NUMERO","lexema":"5","hijos":[]},{"simbolo":"METERS","lexema":"METERS","hijos":[]}]}]},{"simbolo":"PUNTOYCOMA","lexema":";","hijos":[]}]}]}],"tokens":[{"tipo":"MOVE","lexema":"MOVE","linea":0,"columna":0},{"tipo":"BACKWARD","lexema":"BACKWARD","linea":0,"columna":5},{"tipo":"NUMERO","lexema":"5","linea":0,"columna":13},{"tipo":"METERS","lexema":"METERS","linea":0,"columna":15},{"tipo":"PUNTOYCOMA","lexema":";","linea":0,"columna":21}],"error":null}
```

**Resultado:** ✅ OK

---

## Resumen

| # | Caso | Esperado | Resultado |
|---|------|----------|-----------|
| 1 | Tres comandos válidos | `valido: true` | ✅ |
| 2 | MOVE sin FORWARD/BACKWARD | Error descriptivo | ✅ |
| 3 | Falta `;` | Error descriptivo | ✅ |
| 4 | TURN sin LEFT/RIGHT | Error descriptivo | ✅ |
| 5 | TAKE SAMPLE sin terreno | Error descriptivo | ✅ |
| 6 | Archivo .txt válido | `valido: true` | ✅ |
