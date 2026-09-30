import { prisma } from "../config/database.js";
import type {
  CreateOrganizationInput,
  UpdateOrganizationInput,
} from "../validators/organization.validator.js";

function createSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function createUniqueSlug(name: string) {
  const baseSlug = createSlug(name) || "organization";

  let slug = baseSlug;
  let counter = 1;

  while (await prisma.organization.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}

export async function createOrganization(
  userId: string,
  input: CreateOrganizationInput
) {
  const slug = await createUniqueSlug(input.name);

  return prisma.$transaction(async (tx) => {
    const organization = await tx.organization.create({
      data: {
        name: input.name,
        slug,
      },
    });

    await tx.organizationMember.create({
      data: {
        organizationId: organization.id,
        userId,
        role: "ORG_ADMIN",
      },
    });

    return tx.organization.findUniqueOrThrow({
      where: {
        id: organization.id,
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
              },
            },
          },
        },
      },
    });
  });
}

export async function getUserOrganizations(userId: string) {
  return prisma.organization.findMany({
    where: {
      members: {
        some: {
          userId,
        },
      },
    },
    include: {
      members: {
        where: {
          userId,
        },
        select: {
          role: true,
        },
      },
      _count: {
        select: {
          members: true,
          projects: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function getOrganization(
  userId: string,
  organizationId: string
) {
  return prisma.organization.findFirst({
    where: {
      id: organizationId,
      members: {
        some: {
          userId,
        },
      },
    },
    include: {
      members: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
              status: true,
            },
          },
        },
      },
      _count: {
        select: {
          members: true,
          projects: true,
        },
      },
    },
  });
}

export async function updateOrganization(
  userId: string,
  organizationId: string,
  input: UpdateOrganizationInput
) {
  const membership = await prisma.organizationMember.findFirst({
    where: {
      organizationId,
      userId,
      role: "ORG_ADMIN",
    },
  });

  if (!membership) {
    throw new Error("Only organization admins can update the organization");
  }

  const existing = await prisma.organization.findUnique({
    where: {
      id: organizationId,
    },
  });

  if (!existing) {
    throw new Error("Organization not found");
  }

  return prisma.organization.update({
    where: {
      id: organizationId,
    },
    data: {
      name: input.name,
    },
  });
}

export async function deleteOrganization(
  userId: string,
  organizationId: string
) {
  const membership = await prisma.organizationMember.findFirst({
    where: {
      organizationId,
      userId,
      role: "ORG_ADMIN",
    },
  });

  if (!membership) {
    throw new Error("Only organization admins can delete the organization");
  }

  const organization = await prisma.organization.findUnique({
    where: {
      id: organizationId,
    },
  });

  if (!organization) {
    throw new Error("Organization not found");
  }

  await prisma.organization.delete({
    where: {
      id: organizationId,
    },
  });
}