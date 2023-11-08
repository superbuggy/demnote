import prisma from "../../../../lib/prisma-client-service";

export default async function handle(req, res) {
  let comment;
  switch (req.method) {
    case "GET":
      comment = await prisma.comment.findUnique({
        where: { id: req.query.id },
      });
      break;
    case "PUT":
      comment = await prisma.comment.update({
        where: { id: req.query.id },
        data: req.body,
      });
      break;
    case "DELETE":
      comment = await prisma.comment.delete({
        where: { id: req.query.id },
      });
      break;
  }
  return res.json({ comment });
}
