
const request = require('supertest');
const app = require('./app');
  
describe('POST /items should add a new item', () => {
    it('should create an item', async () => {
      let itemId;
      const response = await request('http://localhost:3000').post('/items').send({ name: 'TestItem' });
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('TestItem');
  
      itemId = response.body.id;

    });

  });

describe('GET /items should return a list of all items', () => {
    it('should return a list of items', async () => {
      const response = await request('http://localhost:3000').get('/items');
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });

  });

  describe('GET /items/:id should return 200 for existing item', () => {
    let firstItemId;
  
    // Before the tests, fetch the list of items and collect the ID of the first item
    beforeAll(async () => {
      const response = await request('http://localhost:3000').get('/items');
      if (response.body.length > 0) {
        firstItemId = response.body[0].id;
      }
    });
  
    it('should fetch the item by ID', async () => {
      if (firstItemId) {
        const response = await request('http://localhost:3000').get(`/items/${firstItemId}`);
        expect(response.status).toBe(200);
      } else {
        console.log('No items found to test fetching by ID.');
        expect(true).toBe(true);
      }
    });
  });


  describe('GET /items/:id should return 404 for non-existing item', () => {

    const nonExistentIdEndPoint = '/items/ls96mylk8odju84sc2j';
    it('should not return a item', async () => {
      const response = await request('http://localhost:3000').get(nonExistentIdEndPoint);
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Item not found for fetching item by id');
    });

  });


  describe('PUT /items/:id should return 200 for existing item', () => {
    let firstItemId;
  
    // Before the tests, fetch the list of items and collect the ID of the first item
    beforeAll(async () => {
      const response = await request('http://localhost:3000').get('/items');
      if (response.body.length > 0) {
        firstItemId = response.body[0].id;
      }
    });
  
    it('should return 200 for updating existing item', async () => {
      if (firstItemId) {
        const response = await request('http://localhost:3000')
          .put(`/items/${firstItemId}`)
          .send({ name: 'UpdatedItem' });
        expect(response.status).toBe(200);
      } else {
        console.log('No items found to test updating by ID.');
        expect(true).toBe(true);
      }
    });
  });


  describe('PUT /items/:id should return 404 for updating non-existing item', () => {

    const nonExistentIdEndPoint = '/items/ls96mylk8odju84sc2j';
    it('should not update a non existing item', async () => {
      const response = await request('http://localhost:3000').put(nonExistentIdEndPoint);
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Item not found for updating item by id');
    });

  });



  describe('DELETE /items/:id should return 200 for deleting existing item', () => {
    let firstItemId;
  
    // Before the tests, fetch the list of items and collect the ID of the first item
    beforeAll(async () => {
      const response = await request('http://localhost:3000').get('/items');
      if (response.body.length > 0) {
        firstItemId = response.body[0].id;
      }
    });
  
    it('should return 200 for deleting an existing item', async () => {
      if (firstItemId) {
        const response = await request('http://localhost:3000').delete(`/items/${firstItemId}`);
        expect(response.status).toBe(200);
      } else {
        console.log('No items found to test deleting by ID.');
        expect(true).toBe(true);
      }
    });
  });
  
  describe('DELETE /items/:id should return 404 for deleting non-existing item', () => {

    const nonExistentIdEndPoint = '/items/ls96mylk8odju84sc2j';
    it('should not delete a non existing item', async () => {
      const response = await request('http://localhost:3000').delete(nonExistentIdEndPoint);
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Item not found for deleting item by id');
    });

  });