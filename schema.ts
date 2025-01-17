import { z } from "zod";

export const aiModelSchema = z.array(
  z.object({
    id: z.number(),
    documentId: z.string(),
    name: z.string(),
    aiModelName: z.string(),
    defaultPrompt: z.string(),
    isFeatured: z.boolean(),
    userImageUpload: z.null(),
    style: z.null(),
    avatar: z.null(),
    createdAt: z.string(),
    updatedAt: z.string(),
    publishedAt: z.string(),
    icon: z.object({
      id: z.number(),
      documentId: z.string(),
      name: z.string(),
      alternativeText: z.null(),
      caption: z.null(),
      width: z.number(),
      height: z.number(),
      formats: z.object({
        thumbnail: z.object({
          ext: z.string(),
          url: z.string(),
          hash: z.string(),
          mime: z.string(),
          name: z.string(),
          path: z.null(),
          size: z.number(),
          width: z.number(),
          height: z.number(),
          sizeInBytes: z.number(),
          provider_metadata: z.object({
            public_id: z.string(),
            resource_type: z.string(),
          }),
        }),
      }),
      hash: z.string(),
      ext: z.string(),
      mime: z.string(),
      size: z.number(),
      url: z.string(),
      previewUrl: z.null(),
      provider: z.string(),
      provider_metadata: z.object({
        public_id: z.string(),
        resource_type: z.string(),
      }),
      createdAt: z.string(),
      updatedAt: z.string(),
      publishedAt: z.string(),
    }),
    banner: z.object({
      id: z.number(),
      documentId: z.string(),
      name: z.string(),
      alternativeText: z.null(),
      caption: z.null(),
      width: z.number(),
      height: z.number(),
      formats: z.object({
        thumbnail: z.object({
          ext: z.string(),
          url: z.string(),
          hash: z.string(),
          mime: z.string(),
          name: z.string(),
          path: z.null(),
          size: z.number(),
          width: z.number(),
          height: z.number(),
          sizeInBytes: z.number(),
          provider_metadata: z.object({
            public_id: z.string(),
            resource_type: z.string(),
          }),
        }),
      }),
      hash: z.string(),
      ext: z.string(),
      mime: z.string(),
      size: z.number(),
      url: z.string(),
      previewUrl: z.null(),
      provider: z.string(),
      provider_metadata: z.object({
        public_id: z.string(),
        resource_type: z.string(),
      }),
      createdAt: z.string(),
      updatedAt: z.string(),
      publishedAt: z.string(),
    }),
  })
);

export type AiModel = z.infer<typeof aiModelSchema>;
