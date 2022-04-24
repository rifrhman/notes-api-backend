/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  // membuat user baru
  pgm.sql("INSERT INTO users(id, username, password, fullname) VALUES('old_notes', 'old_notes', 'old_notes', 'old_notes')");

  // mengubah nilai owner pada note yang owner-nya bernilai null
  pgm.sql("UPDATE notes SET owner = 'old_notes' WHERE owner = NULL");

  // memberikan constraint foreign key pada owner terhadap kolom id dari table users
  pgm.addConstraint('notes', 'fk_notes.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  // MENGHAPUS constraint fk_notes.owner_users.id pada table notes
  pgm.dropConstraint('notes', 'fk_notes.owner_users.id');

  // mengubah nilai owner old_notes pada note menjadi NULL
  pgm.sql("UPDATE notes SET owner = NULL WHERE owner = 'old_notes'");

  // menghapus user baru
  pgm.sql("DELETE FROM users WHERE id = 'old_notes'");
};
