/**

Implementa la función `ex1(matrix,callback)` que recibe los siguientes argumentos:
- `matrix` es un valor no nulo, de tipo _Array_. Los valores que contiene pueden ser números enteros o nulos.
- `callback` es un valor no nulo de tipo _Function_. Esta función acepta un único argumento de tipo _Array_.

La función implementada deberá cumplir las siguientes condiciones:
- Creará una nueva matriz a partir de la información de `matrix`. Esta nueva matriz no deberá contener elementos nulos, y por cada item de la matriz original tendrá un _array_ con solo dos valores: el item original y el item original cambiado de signo. Ejemplos:
  - si `matrix = [10,20,null,-30]`, la nueva matriz sería `[[10,-10],[20,-20],[-30,30]]`.
  - si `matrix = [null,-1,null,-2]`, la nueva matriz sería `[[-1,1],[-2,2]]`.
- La función invocará la función `callback` usando como argumento de entrada la nueva matríz construida.
- La función retornará el valor obtenido como resultado de la ejecución de la función `callback`.


 * Exercise 1, 1pt
 * @param {Array} matrix An array containing numbers
 * @param {Function} callback A function to be called with the result
 * @returns The result returned from the callback function
 */


export function ex1(matrix, callback){

    if (matrix == null || !Array.isArray(matrix)) {
        throw new Error('matrix tiene que ser un array no nulo');
    }

    if (callback == null || typeof callback !== 'function') {
        throw new Error('callback no puede ser nulo y tiene que ser una función');
    }

    const nuevaMatrix = [];
   
    matrix.forEach(item => {

        if (item !== null) {
            const nuevoItem = [item, -item];
            
            nuevaMatrix.push(nuevoItem);
        }
    });

    const resultado = callback(nuevaMatrix);

    return resultado;
}



/**

Implementa la función `ex2(callback)` que recibe un único argumento:
- `callback`: es un valor no nulo de tipo _Function_. Esta función no toma ningún argumento.

La función implementada deberá cumplir las siguientes condiciones:
- Debe retornar una **promesa**.
- Dentro del cuerpo de la promesa se ejecutará la función `callback` y se obtendrá su valor de respuesta.
- En caso de que no haya habido ningún error, se resolverá usando el valor retornado por la función `callback`.
- En caso de error, se rechazará usando como argumento el error obtenido.


 * Exercise 2, 1pt
 * @param {Function} callback A function that returns an arbitrary value
 * @returns {Promise} A promise with the required value.
 */


export function ex2(callback){
    
    if (callback == null || typeof callback !== 'function') {
        throw new Error('callback no puede ser nulo y tiene que ser una función');
    }

    const promesa = new Promise(function(resolve, reject) {

            try {
                const resultado = callback();
                resolve(resultado);

            } catch (error) {
                reject(error);
            }
    })

    return promesa;
}




/**

Implementa la función `ex3(acquireInputData,validateInputData,processInputData)` que recibe tres argumentos:
- `acquireInputData` es un valor no nulo, de tipo _Function_, que no toma ningún argumento. Esta función **devuelve una promesa** que en caso de éxito se resuelve con un valor arbitrario. En caso de fallo, se rechaza con un mensaje de error.
- `validateInputData` es un valor no nulo de tipo _Function_. Esta función toma un único argumento y **devuelve una promesa**. Esta, en caso de éxito se resuelve con un valor arbitrario. En caso de fallo, se rechaza con un mensaje de error.
- `processInputData` es un valor no nulo de tipo _Function_. Esta función toma un único argumento y **devuelve una promesa**. Esta, en caso de éxito se resuelve con un valor arbitrario. En caso de fallo, se rechaza con un mensaje de error.

La función implementada deberá cumplir las siguientes condiciones:
- Debe devolver una **promesa**.
- Debe invocar la función `acquireInputData` y almacenar su salida.
- Debe invocar la función `validateInputData` usando como argumento la salida de la función `acquireInputData` y almacenar su salida.
- Debe invocar la función `processInputData` usando como argumento la salida de la función `validateInputData` y almacenar su salida.
- En caso de éxito, la promesa debe resolverse con el valor devuelto por `processInputData`.
- En caso de error, la promesa debe rechazarse con el valor `Error: errorCode`, donde `errorCode` es el mensaje de error capturado.


 * Exercise 3, 1pt
 * @param {Function} acquireInputData A function that takes no arguments and returns an arbitrary value
 * @param {Function} validateInputData A function that takes one argument and returns an arbitrary value
 * @param {Function} processInputData A function that takes one argument and returns an arbitrary value
 * @returns A promise with the result of the function.
 */


export function ex3(acquireInputData,validateInputData,processInputData){

    if (acquireInputData == null || typeof acquireInputData !== 'function' ||
        validateInputData == null || typeof validateInputData !== 'function' ||
        processInputData == null || typeof processInputData !== 'function') {
        throw new Error('Todos los argumentos no pueden ser nulos y deben ser funciones');
    }
  
    return new Promise((resolve, reject) => {

        acquireInputData()
            .then(inputDataOk => {
                return validateInputData(inputDataOk);
            })
            .then(validatedDataOk => {
                return processInputData(validatedDataOk);
            })
            .then(promesaResuelta => {
                resolve(promesaResuelta);
            })
            .catch(error => {
                reject(`Error: ${error}`);
            });
    });

}



/**
Implementa la función asíncrona `ex4(matrix,asyncCallback)` que recibe dos argumentos:
- `matrix` es un valor no nulo, de tipo _Array_, cuyos elementos pueden ser de cualquier tipo.
- `asyncCallback` es un valor no nulo, de tipo _Function_. Esta función es **asíncrona**, acepta dos argumentos (`index` e `item`) y devuelve un valor de tipo arbitrario.

La función implementada deberá cumplir las siguientes condiciones:
- Debe devolver un objeto de tipo _Array_
- Debe recorrer la matriz `matrix` e invocar el callback `asyncCallback` por cada elemento encontrado, usando como argumentos el índice en `matrix` y el valor de cada uno.
- Cada vez que se invoque `asyncCallback` y se obtenga su resultado, este será añadido a la matriz a devolver por la función. Los resultados serán añadidos por orden de ejecución, en cada posición _i_ de la matriz devuelta deberá estar el resultado de la invocación _i-ésima_ del callback.

Finalmente, la función tendrá que devolver un _Array_ con el resultado de cada invocación al callback, en el orden en el que fueron ejecutados.


 * Exercise 4, 1pt
 * @param {Array} matrix An array of arbitrary values
 * @param {Function} asyncCallback An asynchronous function that takes two arguments
 * @returns {Array} A new matrix with the result of the operation
 */



export async function ex4(matrix, asyncCallback){
    
    if (matrix == null || !Array.isArray(matrix)) {
        throw new Error('matrix tiene que ser un array no nulo');
    }

    if (asyncCallback == null || typeof asyncCallback !== 'function') {
        throw new Error('asyncCallback no puede ser nulo y tiene que ser una función');
    }

    const resultados = [];

    for (let i = 0; i < matrix.length; i++) {
        const resultAsync = await asyncCallback(i, matrix[i]);
        resultados.push(resultAsync);
    }

    return resultados;
}



/**
Implementa la función `ex5(timeout,callback)` que recibe dos argumentos:
- `timeout`, un valor no nulo, de tipo entero. Indica el valor en milisegundos que la promesa habrá de esperar antes de rechazar o resolver.
- `callback`, un valor no nulo, de tipo _Function_. Esta función es **asíncrona** y no toma argumentos. En caso de éxito, devuelve un valor arbitrario, mientras que, en caso de error, lanzará una excepción.

La función implementada deberá cumplir las siguientes condiciones:
- El valor devuelto será una promesa.
- La función ejecutará la función asíncrona `callback` transcurridos `timeout` milisegundos.
- En caso de éxito, la promesa se resolverá con el valor devuelto por la función `callback`.
- En caso de error, la promesa se rechazará con la excepción capturada.


 * Exercise 5, 2.5pt
 * @param {number} timeout A number that indicates how long should the promise wait
 * @param {Function} callback A function that should be called in the promise's body
 * @returns {Promise} A promise that will be resolved or rejected in the future.
 */


export function ex5(timeout,callback){
    
    if (typeof timeout !== 'number' || !Number.isInteger(timeout) || timeout <= 0) {
        throw new Error('timeout tiene que ser un número entero positivo');
    }

    if (callback == null || typeof callback !== 'function') {
        throw new Error('callback no puede ser nulo y tiene que ser una función');
    }

    const promise = new Promise((resolve, reject) => {

        setTimeout(async() => {

            try {
                const result = await callback();
                resolve(result);
            } catch (error) {
                reject(error);
            }

        }, timeout);
    });

    return promise;
}




/**
Implementa la función `ex6(taskgenerator)` que recibe un único argumento:
- `taskgenerator`, un valor no nulo, de tipo _Function_. Esta función es **asíncrona** y no toma ningún argumento. Esta función devuelve en cada llamada una función **asíncrona** que ejecuta el código asociado a una tarea concreta o `NULL` si no quedan tareas pendientes.

La función implementada deberá ejecutar un proceso en segundo plano y devolver al usuario información sobre el estado de la aplicación. Para ello deberá cumplir las siguientes condiciones:
- Devolverá un objeto que refleje el estado de la aplicación, que tendrá los siguientes atributos:
  - `done`: un valor numérico que indica cuantas tareas se han ejecutado con éxito.
  - `errors`: un valor numérico que indica cuantas tareas han fallado.
  - `finished`: un valor booleano que indica si el proceso en segundo plano ha terminado o no.
- Ejecutará un proceso en segundo plano con las siguientes características:
  - Será una función que no habrá de ejecutarse inmediatamente. En su lugar, se planificará para ser ejecutada en diferido tan pronto como sea posible. De ahí que se denomine **proceso en segundo plano**.
  - El proceso deberá invocar iterativamente la función `taskgenerator`.
    - Si el valor es diferente de `NULL`, entonces es una función que habrá que ejecutar. En caso de éxito o de error habrá que actualizar las variables de estado apropiadas.
    - Si el valor devuelto es `NULL`, entonces dará por terminado el proceso y actualizará el estado para indicar este hecho.

    
 * Exercise 6, 2.5pt
 * @param {Function} taskgenerator A function that once invoked may return a new function or NULL.
 * @return {Object} An object that depicts the application state
 */



export function ex6(taskgenerator){
    
    if (taskgenerator == null || typeof taskgenerator !== 'function') {
        throw new Error('taskgenerator no puede ser nulo y tiene que ser una función');
    }
    
    let estadoApp = {
        done: 0,
        errors: 0,
        finished: false
    }


    async function segundoPlano() {

        while (true) {
            let proceso = await taskgenerator();

            if (proceso == null) {
                estadoApp.finished = true;
                break;
            } 

            try {
                await proceso();
                estadoApp.done +=1;

            } catch (error) {
                estadoApp.errors +=1;
            }
        }
    }

    setTimeout(segundoPlano, 0);
    
    return estadoApp;
}

