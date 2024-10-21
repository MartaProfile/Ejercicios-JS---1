// --------------------------------------------------------------------------------
/* EXERCISE 1 
Implementa una función llamada `generateCrossMatrix(n)` que recibe como parámetro un número entero `n`. Esta función debe generar y devolver un array de tamaño `n*n` que represente una cruz (X). 
Las líneas que conforman la cruz deben utilizar el carácter 'X'. Todas las demás posiciones del array deben contener el carácter _espacio en blanco_ (' ').

Además, si el tamaño `n` pasado a la función es par, la función debe lanzar un error con el mensaje "The size of the array must be an odd number".
*/
// --------------------------------------------------------------------------------


export function generateCrossMatrix(n) {

    if (n % 2 === 0) {
      throw new Error('The size of the array must be an odd number');
    }

  
  let array1 = [];

  for (let i = 0; i < n; i++) {
    array1[i] = [];

    for (let x = 0; x < n; x++) {
      array1[i][x] = ' ';
    }
      array1[i][i] = 'X';
      array1[i][n - 1 - i] = 'X'; 
  }

  return array1;
}


// --------------------------------------------------------------------------------
/* EXERCISE 2

Queremos dar forma a una pequeña estructura de clases para posteriormente poder instanciar objetos de las clases extendidas de una clase abstracta. En este ejercicio implementarás la clase abstracta, 
mientras que en los siguientes (ejercicios 4.1, 4.2 y 4.3) abordarás las clases que extienden de ella.

Implementa una clase `Sport` cuyo constructor debe aceptar los siguientes parámetros:

- `name`: Nombre del deporte.
- `playersByTeam`: Número de jugadores por equipo.
- `type`: Tipo de deporte. Este parámetro solo puede contener uno de los dos valores especificados en el objeto dado `SportTypes` que simula un objeto de tipo enumerado 
(recuerda que en Javascript no existe el tipo enumerado, pero es posible simularlo de este modo).

Encontrarás el objeto `SportTypes` en el fichero `src/pec2/pec2.js`. En concreto, este es el código:

```js
export const SportTypes = {
  Individual: Symbol('Individual'),
  Collective: Symbol('Collective'),
};
```

> **Nota:** Ten en cuenta que dentro de una clase, las _variables_ se suelen denominar _propiedades_ o _atributos_, mientras que las _funciones_ acostumbran a llamarse _métodos_. 
En los siguientes ejercicios utilizaremos esta terminología.

La clase `Sport` debe incorporar los siguientes métodos:

- `getName()`: Devuelve el nombre del deporte.
- `getPlayersByTeam()`: Devuelve un texto con el sigueinte formato: "Each team has X players.", siendo X el número de jugadores por equipo.
- `getType()`: Devuelve el tipo de deporte.
- `getScore()`: Método que debe lanzar el siguiente error: "The 'getScore' function must be implemented in child classes."
- `updateScore()`: Método que debe lanzar el siguiente error: "The 'updateScore' function must be implemented in child classes."
// --------------------------------------------------------------------------------
*/

export const SportTypes = {
  Individual: Symbol('Individual'),
  Collective: Symbol('Collective'),
};

export class Sport {
  constructor(name, playersByTeam, type) {
    this.name = name;
    this.playersByTeam = playersByTeam;
    this.type = type;

    if (this.type === SportTypes.Individual && this.playersByTeam > 1) {
      throw new Error(`Invalid configuration: ${this.name} is an individual sport but has ${this.playersByTeam} player(s).`)
    }

    if (this.type === SportTypes.Collective && this.playersByTeam < 2) {
      throw new Error(`Invalid configuration: ${this.name} is a collective sport but has ${this.playersByTeam} player(s).`)
    }
  }

  getName() {
    return this.name;
  };

  getPlayersByTeam() {
    return(`Each team has ${this.playersByTeam} players.`)
  };

  getType() {
    return this.type;
  };

  getScore() {
    throw new Error("The 'getScore' function must be implemented in child classes.");
  };

  updateScore() {
    throw new Error("The 'updateScore' function must be implemented in child classes.");
  };

}



// --------------------------------------------------------------------------------
/* EXERCISE 3

Para cada una de las clases que implementarás en este ejercicio, se pide:
- Cada clase ha de extender de la clase `Sport`.
- Debes implementar los métodos que se piden (y especialmente sus constructores) del modo más eficiente y lógico.
- Debes ingeniártelas para reutilizar código, siempre que sea posible. Para ello, puedes implementar métodos auxiliares.
    
// --------------------------------------------------------------------------------
// Exercise 3.1

    Implementa una clase `Football`, cuyo constructor debe aceptar los siguientes parámetros:

- `name`: Nombre del deporte.
- `playersByTeam`: Número de jugadores por equipo.
- `type`: Tipo de deporte. Este parámetro solo puede contener uno de los dos valores especificados en el objeto dado `SportTypes`.
- `surface`: String que indica la superficie del terreno de juego.

Esta clase debe incorporar los siguientes métodos:

- `getSurface()`: Devuelve la superficie.
- `getScore()`: Devuelve un objeto con la puntuación actual de un partido. Por ejemplo, si el equipo que juega en casa ha marcado 2 goles, y el equipo visitante ha marcado 1 gol, el objeto que devuelve `getScore` 
debería seguir el siguiente formato:

  ```js
  {
    "homeScore": 2,
    "awayScore": 1
  }
  ```

- `updateScore(who)`: Debe admitir un parámetro `who` con el valor `home` o `away` que indica el equipo que ha anotado el punto (gol), incrementando de esta manera su número de goles. 
Este método debe actualizar el marcador, es decir, las propiedades que utilices para contar los goles de cada equipo.
// --------------------------------------------------------------------------------
*/

export class Football extends Sport {
  constructor(name, playersByTeam, type, surface){
    super(name, playersByTeam, type)
    this.surface = surface;
    this.homeScore = 0;
    this.awayScore = 0;
  }

  getSurface(){
    return this.surface;
  };

  getScore(){
    return {
      "homeScore": this.homeScore,
      "awayScore": this.awayScore,
    };
  };
      
  updateScore (who) {
    if (who === 'home') {
          this.homeScore++;

    } else if (who === 'away') {
          this.awayScore++;
    }
  }
}

// --------------------------------------------------------------------------------
/* Exercise 3.2

Implementa una clase `Basketball` cuyo constructor debe aceptar los siguientes parámetros:

- `name`: Nombre del deporte.
- `playersByTeam`: Número de jugadores por equipo.
- `type`: Tipo de deporte. Este parámetro solo puede contener uno de los dos valores especificados en el objeto dado `SportTypes`.

Esta clase debe incorporar los siguientes métodos:

- `getPlayersByMatch()`: Devuelve un texto con el siguiente formato: "Each team has X players. In total Y players participate in each match.", siendo X el número de jugadores por equipo y Y el total de jugadores en el 
terreno de juego.
- `getScore()`: Devuelve un objeto con la puntuación actual de un partido. Por ejemplo, si el equipo que juega en casa ha marcado 7 puntos, y el equipo visitante ha marcado 8 puntos, el objeto que devuelve `getScore`
debería seguir el siguiente formato:

  ```js
  {
    "homeScore": 7,
    "awayScore": 8
  }
  ```

- `updateScore(who, points)`: Debe admitir un primer parámetro `who` con el valor `home` o `away` que indica quien ha anotado, y un segundo parámetro `points` que indica el número de puntos, 
incrementando de esta manera su puntuación. Este método debe actualizar el marcador. Además, se debe lanzar el mensaje de error "Between 1 and 3 points!" en caso que la puntuación recibida como parámetro esté fuera de rango (recuerda que en baloncesto la puntuación es entre 1 y 3).

// --------------------------------------------------------------------------------
*/

export class Basketball extends Sport {
  constructor(name, playersByTeam, type){
    super(name, playersByTeam, type)
    this.homeScore = 0;
    this.awayScore = 0;
  }

  getPlayersByMatch () {
    let totalJugadores = this.playersByTeam * 2;
    return (`Each team has ${this.playersByTeam} players. In total ${totalJugadores} players participate in each match.`)
  };


  getScore () {
    return {
      "homeScore": this.homeScore,
      "awayScore": this.awayScore,
    };
  }


  updateScore (who, points) {

    if (points < 1 || points > 3) {
      throw new Error('Between 1 and 3 points!');
    }

    if (who === 'home') {
      this.homeScore += points;

    } else if (who === 'away') {
      this.awayScore += points;
    }
  }
}



// --------------------------------------------------------------------------------
/* Exercise 3.3

Implementa una clase `Tennis` cuyo constructor debe aceptar los siguientes parámetros:

- `name`: Nombre del deporte.
- `playersByTeam`: Número de jugadores por equipo.
- `type`: Tipo de deporte. Este parámetro solo puede contener uno de los dos valores especificados en el objeto dado `SportTypes`.
- `totalSets`: Número entero que indica el total de sets del partido. No es necesario realizar ningún control sobre este parámetro ya que se presupone que siempre tendrá un valor correcto.

Esta clase debe incorporar los siguientes métodos:

- `getTotalSets()`: Devuelve el número total de sets del partido.
- `getScore()`: Devuelve un objeto con la puntuación actual de un partido. Por ejemplo, si el jugador que juega en casa ha ganado 0 sets, 1 juego y 15 puntos, y el jugador visitante ha ganado 0 sets, 
0 juegos y 30 puntos, el objeto que devuelve `getScore` debería seguir el siguiente formato:

  ```js
  {
    homeScore: {
      sets: 0,
      games: 1,
      points: 15
    },
    awayScore: {
      sets: 0,
      games: 0,
      points: 30
    }
  }
  ```

- `updateScore(who)`: Debe admitir un parámetro `who` con el valor `home` o `away` que indica quien ha anotado el punto, incrementado de esta manera la puntuación. Este método debe actualizar el marcador. 
Recuerda que el tennis se compone de puntos, juegos y sets, por lo que deberás crear un algoritmo que incluya toda la lógica de puntuación relativa a estos tres niveles.

> **Nota:** Para simplificar la implementación, no se debe considerar el estado de "deuce" (iguales), que se produce cuando dos jugadores están 40 a 40 en un mismo juego. Del mismo modo, tampoco se aplica 
la regla de dos juegos de diferencia para ganar un set. Es decir, el primer jugador que anota 4 puntos en un mismo juego, se lleva el juego y el primer jugador que gana 6 juegos, se lleva el set.

// --------------------------------------------------------------------------------
*/

export class Tennis extends Sport {
  constructor(name, playersByTeam, type, totalSets){
    super(name, playersByTeam, type)
    this.totalSets = totalSets;
    this.setsAGanar = Math.ceil(this.totalSets / 2);
    this.homeScore = {
      sets: 0,
      games: 0,
      points: 0
    };
    this.awayScore = {
      sets: 0,
      games: 0,
      points: 0
    };
    this.matchFinished = false;
  }

  getTotalSets() {
     return this.totalSets;
  }

  getScore() {
    return {
      homeScore: this.homeScore,
      awayScore: this.awayScore,
    };
  }

  updateScore (who) {
    
    let currentScore = (who === 'home') ? this.homeScore : this.awayScore;
    let otherScore = (who === 'home') ? this.awayScore : this.homeScore;

    if (this.matchFinished) {
      throw new Error("Match finished");
    }

    if (currentScore.points === 40) {
        currentScore.games++;
        currentScore.points = 0;
        otherScore.points = 0; 

        if (currentScore.games === 6) {
            currentScore.sets++;
            currentScore.games = 0;
            otherScore.games = 0;   
        }

        if (currentScore.sets >= this.setsAGanar) {
          this.matchFinished = true;
        }

    } else {
      currentScore.points += (currentScore.points === 30) ? 10 : 15;
    } 
  }
}




// --------------------------------------------------------------------------------
/* EXERCISE 4

Este ejercicio está pensado para entender que hay otra forma de crear objetos. Esta forma se considera _legacy_ pero es una técnica que se sigue utilizando y es importante entender que las clases son _syntax sugar_ de 
dicha técnica. Además, este ejercicio te servirá para practicar y entender los prototipos y el uso de `this` en JavaScript.

Imagina que estás desarrollando un sistema de gestión de clases de baile para una escuela de danza. Necesitas modelar la información sobre diferentes tipos de clases de baile: algunas pueden ser clases regulares y 
otras pueden ser clases especiales que tienen un costo adicional debido a ciertas características especiales.

Realiza las siguientes tareas:

- Crea una **función constructora** llamada `Dance` que reciba los siguientes parámetros:
  - `name`: String que contiene el nombre de la clase.
  - `style`: String que contiene el estilo del baile.
  - `level`: String que contiene el nivel de dificultad. Puede haber solo tres niveles: `Easy`, `Intermediate` y `Advanced`.
  - `duration`: Número que contiene la duración de una clase.

- Implementa el método `isStyle(style)`, el cual recibe como parámetro `style`, que representa un estilo de baile; y devuelve un valor booleado, indicando si el estilo recibido coincide con el estilo actual.
- Implementa el método `getInfo()`, el cual devuelve un objeto con toda la información de la clase de baile, incluyendo su nombre, estilo, nivel y duración.

  Por ejemplo, si llamamos a la función constructora `Dance` con los siguientes parámetros:

  ```js	
  new Dance('Salsa Night', 'Salsa', 'Intermediate', 1.5)
  ```

  el método `getInfo()` debería devolver el siguiente objeto:

  ```js
  {
    Name: 'Salsa Night',
    Style: 'Salsa',
    Level: 'Intermediate',
    Duration: 1.5
  }
  ```

- Implementa el método `setLevel(newLevel)`, el cual recibe `newLevel` como parámetro que representa un nuevo nivel de dificultad, actualizando dicho valor en el objeto. 
No es necesario realizar ningún control sobre el valor del parámetro 'newLevel', ya que se considera que siempre llegará un valor correcto.

Además, ten en cuenta que:
- El método `isStyle(style)` debe implementarse de manera que cada instancia de `Dance` tenga su propia copia de esta función.
- Los métodos `getInfo()` y `setLevel(newLevel)` deben implementarse de manera que se compartan a través del prototype.

// --------------------------------------------------------------------------------
*/

export function Dance(name, style, level, duration) {
    this.name = name;
    this.style = style;
    this.level = ['Easy', 'Intermediate', 'Advanced'].includes(level) ? level : 'Intermediate';
    this.duration = duration;

    this.isStyle = function(style) {
        return this.style === style;
    };
};


Dance.prototype.getInfo = function() {
  return {
    Name: this.name,
    Style: this.style,
    Level: this.level,
    Duration: this.duration,
  }
};


Dance.prototype.setLevel = function(newLevel) {
    return this.level = newLevel;
};




// --------------------------------------------------------------------------------
/* EXERCISE 5 (OPTIONAL)

Este ejercicio es opcional y te permitirá explorar el uso de expresiones regulares en JavaScript. Las expresiones regulares son una herramienta muy potente que se utiliza en los lenguajes de programación para buscar 
y manipular texto basado en patrones.

Puedes informarte de cómo definir expresiones regulares en la web de [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions) y hacer pruebas en la web
[regex101.com](https://regex101.com/).

Como continuación del ejercicio 5, deberás implementar el método `calculateCost(rateText)`, implementado de manera que se comparta a través del prototype. Este método recibe `rateText` como parámetro, 
que es un texto que describe la tarifa por hora de la clase y que contiene el importe de la misma. Un ejemplo del formato de este texto es "The rate is 9.5 eur per hour", del cual deberás extraer el valor númerico 
(en este ejemplo, el valor 9.5). Este método debe calcular el coste total de la clase de baile.

Debes tener en cuenta las siguientes consideraciones:

- "Si la tarifa de texto no contiene importe, se deberá lanzar el mensaje de error "Failed to extract rate from provided text".
- En función del nivel, se deben aplicar los siguientes multiplicadores al precio total:
  - `Easy`: 1
  - `Intermediate`: 1.5
  - `Advanced`: 2

  Por ejemplo: Una tarifa a 10€/h con 2 horas de clase a nivel `Intermediate`, se facturaría a 10 * 2 * 1.5 = 30 euros.

// --------------------------------------------------------------------------------
*/


Dance.prototype.calculateCost = function (rateText) {

    const extraerPrecio = rateText.match(/\b\d+(\.\d+)?\b/g);

    if (!extraerPrecio) {
      throw new Error("Failed to extract rate from provided text");
    }

    const precioClase = parseFloat(extraerPrecio[0]);

    let expectedCost;

    switch (this.level) {
      case 'Easy':
        expectedCost = (precioClase * this.duration) * 1;
        break;

      case 'Intermediate':
        expectedCost = (precioClase * this.duration) * 1.5;
        break;

      case 'Advanced':
        expectedCost = (precioClase * this.duration) * 2;
        break;
    }

    return expectedCost;
}
