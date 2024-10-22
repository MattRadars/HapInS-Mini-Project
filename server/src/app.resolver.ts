import { Query, Resolver } from '@nestjs/graphql';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
class User {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;
}

@Resolver()
export class AppResolver {
  private users: User[] = [
    { id: 1, name: 'Matt Tan', email: 'mattkienth@gmail.com' },
    { id: 2, name: 'Bethany', email: 'bethany@gmail.com' },
  ];

  @Query(() => [User])
  getUsers(): User[] {
    return this.users;
  }
}
