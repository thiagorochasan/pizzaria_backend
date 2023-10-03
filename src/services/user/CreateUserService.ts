import prismaClient from '../../prisma/'
import { hash} from 'bcryptjs'

interface UserRequest{
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({name, email, password}: UserRequest){
        
        //Verifica se informou o e-mail
        if(!email){
            throw new Error("Email não informado!")
        }

        //Verificar se esse email ja esta cadastrado
        const userIsExists = await prismaClient.user.findFirst({
            where:{
                email:email
            }
        })

        if(userIsExists){
            throw new Error ("Usuário já existe")
        }

        const passwordHash = await hash(password, 8)
        
        const user = await prismaClient.user.create({
            data:{
                name:name,
                email:email,
                password:passwordHash
            },
            select:{
                id:true,
                name:true,
                email:true,
            }
        })

        return user;

        

        return {name: name}
    }
}

export { CreateUserService }
