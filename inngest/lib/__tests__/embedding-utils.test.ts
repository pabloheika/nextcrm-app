describe("embedding utilities without an OpenAI API key", () => {
  const originalApiKey = process.env.OPENAI_API_KEY;

  afterEach(() => {
    if (originalApiKey === undefined) {
      delete process.env.OPENAI_API_KEY;
    } else {
      process.env.OPENAI_API_KEY = originalApiKey;
    }
  });

  it("can be imported for non-AI operations and reports the missing key when embedding", async () => {
    delete process.env.OPENAI_API_KEY;
    let utilities!: typeof import("../embedding-utils");

    jest.isolateModules(() => {
      utilities = require("../embedding-utils");
    });

    expect(utilities.buildEmbeddingText(["Account", null])).toBe("Account");
    await expect(utilities.generateEmbedding("Account")).rejects.toThrow(
      "OPENAI_API_KEY is required for embeddings and document enrichment."
    );
  });
});
