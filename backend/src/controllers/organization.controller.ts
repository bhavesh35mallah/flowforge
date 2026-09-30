import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";

import {
  createOrganizationSchema,
  updateOrganizationSchema,
} from "../validators/organization.validator.js";

import {
  createOrganization,
  deleteOrganization,
  getOrganization,
  getUserOrganizations,
  updateOrganization,
} from "../services/organization.service.js";

export async function create(req: AuthRequest, res: Response) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const input = createOrganizationSchema.parse(req.body);

    const organization = await createOrganization(
      req.userId,
      input
    );

    return res.status(201).json({
      success: true,
      organization,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error?.message || "Unable to create organization",
    });
  }
}

export async function list(req: AuthRequest, res: Response) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const organizations = await getUserOrganizations(req.userId);

    return res.json({
      success: true,
      organizations,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Unable to fetch organizations",
    });
  }
}

export async function getOne(req: AuthRequest, res: Response) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const organization = await getOrganization(
      req.userId,
      req.params.id
    );

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }

    return res.json({
      success: true,
      organization,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Unable to fetch organization",
    });
  }
}

export async function update(req: AuthRequest, res: Response) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const input = updateOrganizationSchema.parse(req.body);

    const organization = await updateOrganization(
      req.userId,
      req.params.id,
      input
    );

    return res.json({
      success: true,
      organization,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error?.message || "Unable to update organization",
    });
  }
}

export async function remove(req: AuthRequest, res: Response) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    await deleteOrganization(
      req.userId,
      req.params.id
    );

    return res.json({
      success: true,
      message: "Organization deleted successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error?.message || "Unable to delete organization",
    });
  }
}