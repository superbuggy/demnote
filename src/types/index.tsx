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

export type AudioFile = Prisma.AudioFileGetPayload<typeof audioFileWithRelations>
export type Comment = Prisma.CommentGetPayload<typeof commentWithRelations>
export type User = Prisma.UserGetPayload<typeof userWithRelations>
