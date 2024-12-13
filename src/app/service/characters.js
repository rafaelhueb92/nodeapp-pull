const db = require('./db');

class Characters {
  constructor({name, nickname, game} = { }) {
    this.name = name;
    this.nickname = nickname;
    this.game = game;
  }

  // Save the character to the database
  async save() {
    const character = {
      name: this.name,
      nickname: this.nickname,
      game: this.game,
    };
    return await db.insert(character);
  }

  // Find all characters
  static async findAll() {
    return await db.find({});
  }

  // Find characters by game
  static async findByGame(game) {
    return await db.find({ game });
  }

}

let instance = null;

module.exports = ({ name, nickname, game } = {}) => {
  if (!instance) {
    instance = new Characters({ name, nickname, game });
  }
  return instance;
};