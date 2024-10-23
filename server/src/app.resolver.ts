import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import { ObjectType, Field } from '@nestjs/graphql';
import { PrismaClient, User as PrismaUser } from '@prisma/client';

@ObjectType()
class User {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;
}

@Resolver(() => User)
export class AppResolver {
  private prisma = new PrismaClient();

  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    const users: PrismaUser[] = await this.prisma.user.findMany();
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }));
  }

  @Mutation(() => User)
  async addUser(
    @Args('name') name: string,
    @Args('email') email: string,
  ): Promise<User> {
    const newUser: PrismaUser = await this.prisma.user.create({
      data: {
        name,
        email,
      },
    });
    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }
}
