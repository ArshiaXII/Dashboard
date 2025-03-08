const { createUser } = require('../lib/auth');

async function main() {
  try {
    const adminUser = {
      name: 'Admin User',
      email: 'admin@turqaestate.com',
      password: 'admin123', // Change this to a secure password
      role: 'admin'
    };
    
    await createUser(adminUser);
    console.log('Admin user created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Failed to create admin user:', error);
    process.exit(1);
  }
}

main(); 