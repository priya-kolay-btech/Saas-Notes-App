// //import { PrismaClient } from '@prisma/client'
// import { PrismaClient } from '../generated/prisma/index.js'

// const prisma = new PrismaClient()

// async function main() {
//   // Create a tenant
//  const tenant = await prisma.tenant.upsert({
//   where: { slug: 'acme' },   // ✅ unique field
//   update: {},
//   create: {
//     name: 'Acme Corp',
//     slug: 'acme',
//   },
// })


//   // Create users
//   const users = [
//     { email: 'admin@acme.test', name: 'Admin User', tenantId: tenant.id },
//     { email: 'user@acme.test', name: 'Regular User', tenantId: tenant.id },
//     { email: 'manager@acme.test', name: 'Manager User', tenantId: tenant.id },
//     { email: 'guest@acme.test', name: 'Guest User', tenantId: tenant.id },
//   ]

//   for (const u of users) {
//     await prisma.user.upsert({
//       where: { email: u.email },
//       update: {},
//       create: u,
//     })
//   }

//   console.log('🌱 Seed data inserted successfully')
// }

// main()
//   .then(() => prisma.$disconnect())
//   .catch((e) => {
//     console.error(e)
//     prisma.$disconnect()
//     process.exit(1)
//   })



import { PrismaClient } from '../generated/prisma/index.js'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  //const hashedPassword = await bcrypt.hash('password', 10)
const hashedPassword = await bcrypt.hash('Admin@123', 10)

  // Tenants
  const acme = await prisma.tenant.upsert({
    where: { slug: 'acme' },
    update: {},
    create: {
      name: 'Acme Corp',
      slug: 'acme',
      plan: 'Free',
    },
  })

  const globex = await prisma.tenant.upsert({
    where: { slug: 'globex' },
    update: {},
    create: {
      name: 'Globex Corp',
      slug: 'globex',
      plan: 'Free',
    },
  })

  // Users
  const users = [
    { email: 'admin@acme.test', name: 'Acme Admin', role: 'Admin', tenantId: acme.id },
    { email: 'user@acme.test', name: 'Acme User', role: 'Member', tenantId: acme.id },
    { email: 'admin@globex.test', name: 'Globex Admin', role: 'Admin', tenantId: globex.id },
    { email: 'user@globex.test', name: 'Globex User', role: 'Member', tenantId: globex.id },
  ]

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        email: u.email,
        password: hashedPassword, // ✅ required
        role: u.role,
        tenantId: u.tenantId,
      },
    })
  }

  console.log('🌱 Seed data inserted successfully')
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
  })


  