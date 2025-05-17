// Mengimpor Joi untuk validasi skema
const Joi = require('joi');

// Skema validasi untuk payload registrasi pengguna
const registerUserPayloadSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required()
    .messages({
      'string.base': 'Username harus berupa teks',
      'string.alphanum': 'Username hanya boleh berisi karakter alfanumerik',
      'string.min': 'Username minimal harus {#limit} karakter',
      'string.max': 'Username maksimal harus {#limit} karakter',
      'any.required': 'Username tidak boleh kosong',
    }),
  email: Joi.string().email({ tlds: { allow: false } }).required() // tlds: { allow: false } untuk email lokal jika diperlukan, atau sesuaikan
    .messages({
      'string.base': 'Email harus berupa teks',
      'string.email': 'Format email tidak valid',
      'any.required': 'Email tidak boleh kosong',
    }),
  password: Joi.string().min(8).required()
    // Opsional: tambahkan validasi kompleksitas password jika diinginkan
    // .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})'))
    .messages({
      'string.base': 'Password harus berupa teks',
      'string.min': 'Password minimal harus {#limit} karakter',
      // 'string.pattern.base': 'Password harus mengandung huruf besar, huruf kecil, angka, dan simbol',
      'any.required': 'Password tidak boleh kosong',
    }),
  // fullName: Joi.string().min(3).max(100).optional(), // Contoh field opsional
});

// Skema validasi untuk payload login pengguna
const loginUserPayloadSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required()
    .messages({
      'string.base': 'Email harus berupa teks',
      'string.email': 'Format email tidak valid',
      'any.required': 'Email tidak boleh kosong',
    }),
  password: Joi.string().required()
    .messages({
      'string.base': 'Password harus berupa teks',
      'any.required': 'Password tidak boleh kosong',
    }),
});

// Mengekspor skema agar bisa digunakan di rute
module.exports = {
  registerUserPayloadSchema,
  loginUserPayloadSchema,
};

