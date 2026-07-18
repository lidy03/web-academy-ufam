import { prisma } from "../src/utils/prismaClient.js";
import { UserTypes } from "../src/resources/userType/userType.constants.js";

async function seed() {
    return prisma.userType.createMany({ 
        data: [
        {id: UserTypes.ADMIN, label: "admin"},
        {id: UserTypes.CLIENT, label: "client"}
        ],
        skipDuplicates:true, 
    });
}

seed()
  .then(() =>{
    prisma.$disconnect();
   })
  .catch((err) => {
    console.log(err)
    prisma.$disconnect();
  });