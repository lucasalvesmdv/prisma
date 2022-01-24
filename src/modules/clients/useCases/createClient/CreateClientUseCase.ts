import { prisma } from "../../../../database/prismaClient";
import {hash} from "bcrypt"



interface ICreateClient {
  username: string,
  password: string;
}

export class CreateClientUseCase {
  async  execute({password, username}:ICreateClient) {

    const clientExit = await prisma.clients.findFirst({
      where: {
        username: {
          mode: "insensitive"
        }
      }
    })
    if(clientExit) {
      throw new Error("client already exists")
    }

    const hashPassword = await hash(password, 10)

    const client =  await prisma.clients.create({
      data: {
        username,
        password: hashPassword
      },
    });
    return client;

  }
}