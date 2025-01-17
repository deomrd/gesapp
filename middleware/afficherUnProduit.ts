import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const afficherUnProduit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { idProduit } = req.params; 

  try {

    const produit = await prisma.produits.findUnique({
      where: { idProduit: parseInt(idProduit, 10) }, // Assurez-vous que l'ID est un entier
      include: {
        fournisseurs: true, // Inclure les données du fournisseur associé
      },
    });

    if (!produit) {
      res.status(404).json({ error: "Produit introuvable." });
      return;
    }

    // Retourner le produit avec les informations du fournisseur
    res.status(200).json({
      message: "Détails du produit et du fournisseur associé.",
      produit,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération du produit." });
  }
};

export default afficherUnProduit;
