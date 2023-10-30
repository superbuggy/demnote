import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

//  Why not this?
// 
//  const client = new PrismaClient();
//  if (process.env.NODE_ENV !== 'production') global.prisma = client
//
// or...
// 
//  function getPrismaClient(): PrismaClient {
//  if (process.env.NODE_ENV !== 'production') global.prisma = client
//    return client
//  }
// 


export default prisma;