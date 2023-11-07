import { Prisma } from "@prisma/client";

const audioFileWithRelations = Prisma.validator<Prisma.AudioFileDefaultArgs>()({
  include: { comments: true },
});

const commentWithRelations = Prisma.validator<Prisma.CommentDefaultArgs>()({
  include: { subject: true, author: true },
});

const userWithRelations = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: { comments: true },
});

export type { AudioFile, Comment, User } from "@prisma/client"
export type AudioFileWithRelations = Prisma.AudioFileGetPayload<typeof audioFileWithRelations>
export type CommentWithRelations = Prisma.CommentGetPayload<typeof commentWithRelations>
export type UserWithRelations = Prisma.UserGetPayload<typeof userWithRelations>
