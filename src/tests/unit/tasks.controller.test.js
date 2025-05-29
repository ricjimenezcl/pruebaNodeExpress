const { 
    getAllTasks, 
    createTask, 
    updateTask, 
    deleteTask 
  } = require('../../controllers/tasks.controller');
  const { Task } = require('../../models');
  const { sequelize } = require('../../config/database');
  
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });
  
  afterAll(async () => {
    await sequelize.close();
  });
  
  describe('Tasks Controller', () => {
    let testTask;
    let mockReq, mockRes;
  
    beforeEach(async () => {
      testTask = await Task.create({
        titulo: 'Tarea de prueba',
        descripcion: 'Descripción de prueba'
      });
  
      mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        end: jest.fn()
      };
    });
  
    afterEach(async () => {
      await Task.destroy({ where: {} });
    });
  
    describe('getAllTasks', () => {
      it('should return all tasks', async () => {
        mockReq = {};
        
        await getAllTasks(mockReq, mockRes);
        
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(
          expect.arrayContaining([
            expect.objectContaining({
              titulo: 'Tarea de prueba'
            })
          ])
        );
      });
    });
  
    describe('createTask', () => {
      it('should create a new task', async () => {
        mockReq = {
          body: {
            titulo: 'Nueva tarea',
            descripcion: 'Nueva descripción'
          }
        };
  
        await createTask(mockReq, mockRes);
        
        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith(
          expect.objectContaining({
            titulo: 'Nueva tarea',
            status: 'pendiente'
          })
        );
      });
  
      it('should return 400 for invalid data', async () => {
        mockReq = {
          body: {
            titulo: '', 
            descripcion: 'Descripción'
          }
        };
  
        await createTask(mockReq, mockRes);
        
        expect(mockRes.status).toHaveBeenCalledWith(400);
      });
    });
  
  });