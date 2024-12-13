const express = require('express');
const router = express.Router();
const CharactersService = require('../../app/service/characters');

// Create a new character
router.post('/characters', async (req, res) => {
  const { name, nickname, game } = req.body;
  const newCharacter = new CharactersService({name, nickname, game});

  try {
    const savedCharacter = await newCharacter.save();
    res.status(201).json(savedCharacter);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save character', details: err.message });
  }
});

// Get all characters
router.get('/characters', async (req, res) => {
  try {
    const characters = await CharactersService.findAll();
    res.status(200).json(characters);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve characters', details: err.message });
  }
});

// Get characters by game
router.get('/characters/game/:game', async (req, res) => {
  const { game } = req.params;

  try {
    const characters = await CharactersService.findByGame(game);
    res.status(200).json(characters);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve characters by game', details: err.message });
  }
});

module.exports = router;