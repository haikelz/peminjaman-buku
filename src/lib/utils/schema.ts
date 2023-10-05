import { z } from "zod";

export const schema = z.object({
  username: z.string().min(1, { message: "Username is required!" }),
  password: z.string().min(1, { message: "Password is required!" }).regex(/[\w]/gi, {
    message: "The characters must be alphabet or number",
  }),
});
