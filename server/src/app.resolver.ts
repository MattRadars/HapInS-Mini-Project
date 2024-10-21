import { Query, Resolver } from '@nestjs/graphql';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
class User {
  @Field()
  name: string;

  @Field()
  email: string;
}

@Resolver()
export class AppResolver {
  @Query(() => User)
  getData(): User {
    return {
      name: 'Kienth Tan',
      email: 'mattkienth@gmail.com',
    };
  }
}
