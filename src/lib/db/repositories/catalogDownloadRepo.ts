import prisma from '../prisma';
import { CatalogDownload } from '@prisma/client';

export const catalogDownloadRepo = {
  /**
   * Create a new catalog download record
   * The userId is optional to allow anonymous downloads
   */
  createDownloadRecord: async (data: {
    userId?: number;
    catalogType: string;
    ipAddress?: string;
  }): Promise<CatalogDownload> => {
    return prisma.catalogDownload.create({
      data: {
        userId: data.userId ?? null, // Explicitly set to null if undefined
        catalogType: data.catalogType,
        ipAddress: data.ipAddress,
        downloadedAt: new Date(),
      },
    });
  },

  /**
   * Get download history for a user (if there is one)
   */
  getUserDownloads: async (userId: number): Promise<CatalogDownload[]> => {
    return prisma.catalogDownload.findMany({
      where: { userId },
      orderBy: { downloadedAt: 'desc' },
    });
  },

  /**
   * Get total download count for a catalog type
   */
  getCatalogDownloadCount: async (catalogType: string): Promise<number> => {
    return prisma.catalogDownload.count({
      where: { catalogType },
    });
  },
};

export default catalogDownloadRepo;