// controllers/achatsController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const ajouterAchat = async (req: Request, res: Response): Promise<void> => {
  const { idProduit, quantiteAchat, statut } = req.body;

  try {

    const produit = await prisma.produits.findUnique({
      where: { idProduit },
    });

    if (!produit) {
        res.status(404).json({ message: 'Produit non trouvé.' });
        return;
      
    }
    const dateAchat = new Date();
    const achat = await prisma.achats.create({
      data: {
        idProduit,
        quantiteAchat,
        statut: statut !== undefined ? statut : 1, 
      },
    });

    // Mettre à jour le stock du produit
    await prisma.produits.update({
      where: { idProduit },
      data: {
        stock: produit.stock + quantiteAchat, 
      },
    });

    res.status(201).json({
      message: 'Le stock est mis à jour.',
      achat,
      nouveauStock: produit.stock + quantiteAchat,
    });
    return;
    
  } catch (error: any) {
    console.error('Erreur lors de l\'ajout de l\'achat:', error); // Afficher l'erreur complète
    res.status(500).json({
      message: 'Une erreur est survenue lors de l\'ajout de l\'achat.',
      error: error.message,  
      stack: error.stack    
    });
    return;
  }
};
