import { prisma } from '../prisma';
import { AdminAuditActionEnum, AdminAuditEntityTypeEnum } from '@prisma/client';

export class AdminAuditLogRepository {
  public static async logAction(params: {
    action: AdminAuditActionEnum;
    entityType?: AdminAuditEntityTypeEnum;
    entityId?: string;
    actor: string;
    ipAddress?: string;
    success?: boolean;
    details?: string;
  }): Promise<void> {
    try {
      await prisma.adminAuditLog.create({
        data: {
          action: params.action,
          entityType: params.entityType || AdminAuditEntityTypeEnum.none,
          entityId: params.entityId,
          actor: params.actor,
          ipAddress: params.ipAddress,
          success: params.success ?? true,
          details: params.details,
        },
      });
    } catch (error) {
      console.error('[AuditLog] Failed to log action:', error);
    }
  }
}
