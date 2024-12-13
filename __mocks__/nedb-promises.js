const mockInsert = jest.fn();
const mockFind = jest.fn();

module.exports = {
  create: jest.fn(() => ({
    insert: mockInsert,
    find: mockFind,
  })),
  _mockInsert: mockInsert,
  _mockFind: mockFind,
};