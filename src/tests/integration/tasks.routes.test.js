const request = require('supertest');
const app = require('../../app');
const { Task } = require('../../models');
const { sequelize } = require('../../config/database');

let server;

beforeAll(async () => {
  await sequelize.sync({ force: true });
  server = app.listen(3001);
});

afterAll(async () => {
  await server.close();
  await sequelize.close();
});

describe('Tasks API', () => {
  let testTask;

  beforeEach(async () => {
    testTask = await Task.create({
      titulo: 'Tarea de prueba',
      descripcion: 'Descripción de prueba'
    });
  });

  afterEach(async () => {
    await Task.destroy({ where: {} });
  });

  test('GET /tasks - devolver todas las tareas', async () => {
    const response = await request(app).get('/tasks');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0].titulo).toBe('Tarea de prueba');
  });

  test('POST /tasks - crear una nueva tarea', async () => {
    const newTask = {
      titulo: 'Nueva tarea',
      descripcion: 'Nueva descripción'
    };

    const response = await request(app)
      .post('/tasks')
      .send(newTask);

    expect(response.status).toBe(201);
    expect(response.body.titulo).toBe(newTask.titulo);
    expect(response.body.status).toBe('pendiente');
  });

  test('PUT /tasks/:id - actualizar el estado de la tarea', async () => {
    const response = await request(app)
      .put(`/tasks/${testTask.id}`)
      .send({ status: 'completada' });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('completada');
  });

  test('DELETE /tasks/:id - eliminar una tarea', async () => {
    const response = await request(app)
      .delete(`/tasks/${testTask.id}`);

    expect(response.status).toBe(204);
    
    const deletedTask = await Task.findByPk(testTask.id);
    expect(deletedTask).toBeNull();
  });
});