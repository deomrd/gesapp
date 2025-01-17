import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const listerProduits = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Récupérer tous les produits avec leurs fournisseurs associés
    const produits = await prisma.produits.findMany({
      where: {
        statut: 1, 
      },
      include: {
        fournisseurs: true, // Inclure les informations sur les fournisseurs
      },
    });

    // Retourner les produits dans la réponse
    res.status(200).json({
      message: 'Liste des produits et leurs fournisseurs associés',
      produits,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des produits.' });
  }
};

export default listerProduits;
