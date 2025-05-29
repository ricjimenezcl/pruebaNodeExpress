#Prueba Técnica: API de Gestión de Tareas (Node.js & Express)

#descargar proyecto zip o clonar proyecto

#al descomprimir proyecto, cargar dependencias ejecutando:

npm install

#ejecutar proyecto

npm start

#para probar de debe levantar postman

#para crear nueva tarea se ejecuta 

post / http://localhost:3000/tasks

#en el body se ingresas el siguiente json

{
    "titulo": "Nueva tarea",
    "descripcion": "30 minutos de cardio"
}

#para buscar tareas guardadas se ejecuta 

get / http://localhost:3000/tasks

#para buscar una tarea eb particular 

get / http://localhost:3000/tasks/{id}

#para editar una tarea eb particular 

put / http://localhost:3000/tasks/{id}


#para eliminar una tarea eb particular 

del / http://localhost:3000/tasks/{id}



#Ricardop Jimenez
