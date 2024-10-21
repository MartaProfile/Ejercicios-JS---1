/**
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

