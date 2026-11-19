"use server";
import { getSession } from "@/lib/auth-server";
import { prismadb } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { fromPrismaLanguage, toPrismaLanguage } from "@/lib/language";

export const setLanguage = async (data: {
  userId: string;
  language: string;
}) => {
  const session = await getSession({ partner: true });
  if (!session) return { error: "Unauthorized" };

  const { userId, language } = data;

  if (!userId) return { error: "userId is required" };
  if (!language) return { error: "language is required" };

  const prismaLanguage = toPrismaLanguage(language);
  if (!prismaLanguage) return { error: "Unsupported language" };

  // Ensure user can only update their own language unless admin
  if (session.user.id !== userId && session.user.role !== "admin") {
    return { error: "Forbidden" };
  }

  try {
    await prismadb.users.update({
      data: { userLanguage: prismaLanguage },
      where: { id: userId },
    });
    revalidatePath("/[locale]/(routes)/profile", "page");
    return { language: fromPrismaLanguage(prismaLanguage) };
  } catch (error) {
    console.log("[SET_LANGUAGE]", error);
    return { error: "Failed to set language" };
  }
};
