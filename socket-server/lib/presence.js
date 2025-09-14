export const presenceStore = {
  users: [],

  addUser(socketId, userId, name) {
    this.users.push({ socketId, userId, name });
  },

  removeUser(socketId) {
    this.users = this.users.filter((u) => u.socketId !== socketId);
  },

  getAll() {
    return this.users.map(({ userId, name }) => ({ userId, name }));
  },
};
