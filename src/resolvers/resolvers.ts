import { PostResolvers } from '../modules/post/PostResolvers'
import { UserResolvers } from '../modules/users/user.resolvers'
import { NonEmptyArray } from 'type-graphql'

export const resolvers = [PostResolvers, UserResolvers] as NonEmptyArray<
  Function
>
