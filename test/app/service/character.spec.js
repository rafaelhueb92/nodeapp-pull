  const Datastore = require('nedb-promises');
  const Characters = require('../../../src/app/service/characters');
  
  describe('Characters Service with mocked nedb-promises', () => {
    const mockInsert = Datastore._mockInsert;
    const mockFind = Datastore._mockFind;
  
    beforeEach(() => {
      jest.clearAllMocks(); // Reset mock call history
    });
  
    test('should save a character to the database', async () => {
      const mockCharacter = { name: 'Link', nickname: 'Hero of Time', game: 'Zelda' };
      mockInsert.mockResolvedValue(mockCharacter); // Mock the insert method
  
      const character = new Characters(mockCharacter);
      const result = await character.save();
  
      //expect(mockInsert).toHaveBeenCalledWith(mockCharacter); // Check the correct call
      expect(result).toEqual(mockCharacter); // Check the result
    });
  
    test('should retrieve all characters from the database', async () => {
      const mockCharacters = [
        { name: 'Link', nickname: 'Hero of Time', game: 'Zelda' },
        { name: 'Mario', nickname: 'Super Mario', game: 'Mario' },
      ];
      mockFind.mockResolvedValue(mockCharacters); // Mock the find method
  
      const result = await Characters.findAll();
  
      expect(mockFind).toHaveBeenCalledWith({}); // Assert the empty filter
      expect(result).toEqual(mockCharacters); // Assert the returned value
    });
  
    test('should find characters by game', async () => {
      const mockGame = 'Zelda';
      const mockCharacters = [
        { name: 'Link', nickname: 'Hero of Time', game: 'Zelda' },
        { name: 'Zelda', nickname: 'Princess', game: 'Zelda' },
      ];
      mockFind.mockResolvedValue(mockCharacters); // Mock the find method
  
      const result = await Characters.findByGame(mockGame);
  
      expect(mockFind).toHaveBeenCalledWith({ game: mockGame }); // Check the filter
      expect(result).toEqual(mockCharacters); // Check the result
    });
  
    test('should handle error when saving invalid data', async () => {
      mockInsert.mockRejectedValue(new Error('Invalid character data')); // Mock rejection
  
      const character = new Characters({}); // Missing required fields
      await expect(character.save()).rejects.toThrow('Invalid character data');
  
      expect(mockInsert).toHaveBeenCalled(); // Ensure insert was called
    });
  });
  