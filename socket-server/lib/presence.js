export const presenceStore = {
  users: [],

  addUser(socketId, userId, name) {
    // remove any previous record for this socketId
    this.users = this.users.filter((u) => u.socketId !== socketId);
    this.users.push({ socketId, userId, name });
  },

  removeUser(socketId) {
    this.users = this.users.filter((u) => u.socketId !== socketId);
  },

  getAll() {
    // return deduped list of { userId, name } (one entry per user)
    const map = new Map();
    for (const u of this.users) {
      // latest socket for a user wins
      map.set(u.userId, { userId: u.userId, name: u.name });
    }
    return Array.from(map.values());
  },
};
