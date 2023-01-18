import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Connect the client
  await prisma.$connect()
  const test = await prisma.july.findMany({
    where: {
      AND:   [{ Departure_station_name: { contains: 'Velodrominrinne' } }, 
            { Return_station_name: { contains: 'Venttiilikuja' } }],
    },
  })
  console.log(test);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })