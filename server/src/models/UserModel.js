import pool from '../config/db.js';

//find By Email
export async function findByEmail(email) {
  const [[u]] = await pool.query(`SELECT * FROM usuario WHERE email=?`, [email.toLowerCase()]);
  return u || null;
}

//create User
export async function createUser({ nome, email, senhaHash }) {
  const [r] = await pool.query(
    `INSERT INTO usuario (nome, email, senha_hash) VALUES (?,?,?)`,
    [nome, email.toLowerCase(), senhaHash]
  );
  return { id: r.insertId, nome, email: email.toLowerCase() };
}

//get User By Id
export async function getUserById(id) {
  const [[u]] = await pool.query(`SELECT id, nome, email FROM usuario WHERE id=?`, [id]);
  return u || null;
}
