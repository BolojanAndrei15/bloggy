import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const useUserPost = async (postId, userId) => {
  const post = await prisma.blogPost.findUnique({
    where: {
      authorId: userId,
      id: postId,
    },
  });
  if (post) {
    return true;
  } else {
    return false;
  }
};
