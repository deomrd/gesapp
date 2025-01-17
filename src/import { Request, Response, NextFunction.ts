import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const listerFournisseurs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {

    const fournisseurs = await prisma.fournisseurs.findMany({
      where: { statut: 1 }, 
    });


    if (fournisseurs.length === 0) {
      res.status(404).json({ message: 'Aucun fournisseur trouvé' });
      return;
    }

    res.status(200).json(fournisseurs);
  } catch (error) {
    console.error('Erreur lors de la récupération des fournisseurs :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des fournisseurs' });
  }
};
