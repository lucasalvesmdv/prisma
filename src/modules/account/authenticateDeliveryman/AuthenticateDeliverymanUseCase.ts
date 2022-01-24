import { prisma } from "../../../database/prismaClient";
import {compare} from "bcrypt"
import {sign} from "jsonwebtoken"


interface IAuthenticateDeliveryman {
  username: string,
  password: string 
}

export class AuthenticateDeliverymanUseCase {
  async execute({username, password}: IAuthenticateDeliveryman) {

    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username
      }
    });
    if(!deliveryman) {
      throw Error("Username or password invalid!")
    }

    const passwordMatch = await compare(password, deliveryman.password);

    if(!passwordMatch) {
      throw Error("Username or password invalid!")
    }
    const token = sign({username}, "019acc25a4e242bb77ad489832ada12d", {
      subject:deliveryman.id,
      expiresIn: "1d"
    })
    return token;
    
  }
}