import prisma from "../../../../lib/prisma-client-service";

export default async function handle(req, res) {
  const audioFiles = await prisma.audioFile.findMany({
    include: {
      comments: {
        include: {
          author: { select: { name: true } },
        },
      },
    },
  });
  res.json(audioFiles);
}
