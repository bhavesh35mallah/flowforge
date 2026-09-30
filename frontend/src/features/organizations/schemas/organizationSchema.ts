import { z } from "zod";

export const organizationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Organization name must be at least 2 characters")
    .max(100, "Organization name is too long"),
});

export type OrganizationFormData =
  z.infer<typeof organizationSchema>;