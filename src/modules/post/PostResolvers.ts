import { Resolver, Query } from 'type-graphql'

@Resolver()
export class PostResolvers {
  @Query(() => String)
  posts() {
    return 'POst on page One'
  }
}
