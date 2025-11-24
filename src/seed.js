const sequelize = require('./config/database');
const { User, Category, Product } = require('./models');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida');

    await sequelize.sync({ force: true });
    console.log('Base de datos reiniciada');

    // Crear usuarios
    const admin = await User.create({
      email: 'admin@marketplace.com',
      password: 'admin123',
      role: 'ADMIN'
    });

    const customer = await User.create({
      email: 'cliente@marketplace.com',
      password: 'cliente123',
      role: 'CUSTOMER'
    });

    console.log('Usuarios creados');

    // Crear categorías
    const categorias = await Category.bulkCreate([
      { nombre: 'Electrónica', descripcion: 'Productos electrónicos y tecnología' },
      { nombre: 'Ropa', descripcion: 'Vestimenta y accesorios' },
      { nombre: 'Hogar', descripcion: 'Artículos para el hogar' },
      { nombre: 'Deportes', descripcion: 'Equipamiento deportivo' },
      { nombre: 'Libros', descripcion: 'Libros y material de lectura' }
    ]);

    console.log('Categorías creadas');

    // Crear productos
    await Product.bulkCreate([
      {
        nombre: 'Laptop Dell XPS 13',
        precio: 1299.99,
        descripcion: 'Laptop ultradelgada con procesador Intel i7',
        imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400',
        categoryId: categorias[0].id
      },
      {
        nombre: 'iPhone 15 Pro',
        precio: 999.99,
        descripcion: 'Último modelo de iPhone con chip A17 Pro',
        imageUrl: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400',
        categoryId: categorias[0].id
      },
      {
        nombre: 'Camiseta Nike',
        precio: 29.99,
        descripcion: 'Camiseta deportiva de algodón',
        imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
        categoryId: categorias[1].id
      },
      {
        nombre: 'Jeans Levis 501',
        precio: 79.99,
        descripcion: 'Jeans clásicos de mezclilla',
        imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
        categoryId: categorias[1].id
      },
      {
        nombre: 'Sofá Moderno',
        precio: 599.99,
        descripcion: 'Sofá de 3 plazas estilo minimalista',
        imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
        categoryId: categorias[2].id
      },
      {
        nombre: 'Lámpara LED',
        precio: 39.99,
        descripcion: 'Lámpara de escritorio con regulador',
        imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400',
        categoryId: categorias[2].id
      },
      {
        nombre: 'Bicicleta de Montaña',
        precio: 499.99,
        descripcion: 'Bicicleta 21 velocidades',
        imageUrl: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400',
        categoryId: categorias[3].id
      },
      {
        nombre: 'Balón de Fútbol',
        precio: 24.99,
        descripcion: 'Balón oficial tamaño 5',
        imageUrl: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=400',
        categoryId: categorias[3].id
      },
      {
        nombre: 'Harry Potter - Colección',
        precio: 89.99,
        descripcion: 'Set completo de 7 libros',
        imageUrl: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400',
        categoryId: categorias[4].id
      },
      {
        nombre: 'El Principito',
        precio: 12.99,
        descripcion: 'Clásico de la literatura',
        imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
        categoryId: categorias[4].id
      }
    ]);

    console.log('Productos creados');
    console.log('\n=== CREDENCIALES ===');
    console.log('ADMIN:');
    console.log('  Email: admin@marketplace.com');
    console.log('  Password: admin123');
    console.log('\nCUSTOMER:');
    console.log('  Email: cliente@marketplace.com');
    console.log('  Password: cliente123');

    process.exit(0);
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    process.exit(1);
  }
};

seedDatabase();
