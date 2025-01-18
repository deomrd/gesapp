import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const afficherUnProduit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { idProduit } = req.params; 

  try {

    const produit = await prisma.produits.findUnique({
      where: { idProduit: parseInt(idProduit, 10) }, 
      include: {
        fournisseurs: true, 
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


export const ajouterProduit = async (req: Request, res: Response): Promise<void> => {
    const { nomProduit, prixProduit, dateExpiration, stock, id_fournisseur } = req.body;
  
    // Vérification des données requises
    if (!nomProduit || !prixProduit || !id_fournisseur) {
      res.status(400).json({ error: 'Les champs nomProduit, prixProduit, et id_fournisseur sont requis' });
      return;
    }
  
    try {
      
      const produit = await prisma.produits.create({
        data: {
          nomProduit,
          prixProduit,
          dateExpiration: dateExpiration ? new Date(dateExpiration) : null,
          stock,
          id_fournisseur,
        },
      });
  
      res.status(201).json({ message: 'Produit ajouté avec succès.', produit });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de l\'ajout du produit' });
    }
};
  

export const listerProduits = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const produits = await prisma.produits.findMany({
      where: {
        statut: 1, 
      },
      include: {
        fournisseurs: true, 
      },
    });

    res.status(200).json({
      message: 'Liste des produits et leurs fournisseurs associés',
      produits,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des produits.' });
  }
};

