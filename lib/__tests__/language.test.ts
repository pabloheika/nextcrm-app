import { fromPrismaLanguage, toPrismaLanguage } from "@/lib/language";

describe("language helpers", () => {
  it("maps application locales to Prisma Language enum values", () => {
    expect(toPrismaLanguage("en")).toBe("en");
    expect(toPrismaLanguage("cz")).toBe("cz");
    expect(toPrismaLanguage("de")).toBe("de");
    expect(toPrismaLanguage("uk")).toBe("uk");
    expect(toPrismaLanguage("pt-BR")).toBe("pt_BR");
    expect(toPrismaLanguage("pt_BR")).toBe("pt_BR");
    expect(toPrismaLanguage("pt-br")).toBeNull();
    expect(toPrismaLanguage("")).toBeNull();
    expect(toPrismaLanguage(null)).toBeNull();
  });

  it("maps Prisma Language enum values to application locales", () => {
    expect(fromPrismaLanguage("en")).toBe("en");
    expect(fromPrismaLanguage("cz")).toBe("cz");
    expect(fromPrismaLanguage("de")).toBe("de");
    expect(fromPrismaLanguage("uk")).toBe("uk");
    expect(fromPrismaLanguage("pt_BR")).toBe("pt-BR");
    expect(fromPrismaLanguage(null)).toBe("en");
    expect(fromPrismaLanguage(undefined)).toBe("en");
  });
});
