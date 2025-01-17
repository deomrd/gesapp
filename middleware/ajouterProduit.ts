import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ajouterProduit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { nomProduit, prixProduit, dateExpiration, stock, id_fournisseur } = req.body;
  
    // Validation des données
    if (!nomProduit || !prixProduit || !id_fournisseur) {
      res.status(400).json({ error: 'Les champs nomProduit, prixProduit, et id_fournisseur sont requis' });
      return;  // Retourne immédiatement après la réponse
    }
  
    try {
      // Insertion du produit
      const produit = await prisma.produits.create({
        data: {
          nomProduit,
          prixProduit,
          dateExpiration : dateExpiration ? new Date(dateExpiration) : null,
          stock,
          id_fournisseur,
        },
      });
  
      // Si tout va bien, passer au middleware suivant
      req.body.produit = produit;  // Ajouter le produit aux données de la requête pour l'utiliser dans la route suivante
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de l\'ajout du produit' });
    }
  };
  

export default ajouterProduit;
