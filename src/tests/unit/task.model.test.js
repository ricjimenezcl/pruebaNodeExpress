const { Task } = require('../../models');
const { sequelize } = require('../../config/database');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Task Model', () => {
  test('should create a task with default status', async () => {
    const task = await Task.create({
      titulo: 'Tarea modelo',
      descripcion: 'Prueba del modelo'
    });

    expect(task.status).toBe('pendiente');
    expect(task.fechaCreacion).toBeDefined();
  });

  test('should validate title length', async () => {
    await expect(Task.create({
      titulo: 'a'.repeat(101),
      descripcion: 'Descripción'
    })).rejects.toThrow();
  });

  test('should validate status options', async () => {
    await expect(Task.create({
      titulo: 'Tarea inválida',
      descripcion: 'Descripción',
      status: 'estado-inválido'
    })).rejects.toThrow();
  });
});