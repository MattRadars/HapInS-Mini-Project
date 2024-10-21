import { Query, Resolver } from '@nestjs/graphql';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
class PersonalData {
  @Field()
  name: string;

  @Field()
  age: number;
}

@Resolver()
export class AppResolver {
  @Query(() => PersonalData)
  getdata(): PersonalData {
    return {
      name: 'Kienth Tan',
      age: 23,
    };
  }
}
