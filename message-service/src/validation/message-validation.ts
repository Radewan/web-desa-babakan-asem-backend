import z, { ZodType } from "zod";

export class MessageValidation {
  static create: ZodType = z.object({
    name: z.string(),
    email: z.string().email(),
    message: z.string(),
  });
}
