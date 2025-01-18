import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const ajouterFournisseur = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { nomFournisseur, phoneFournisseur, adresseFournisseur, email, type } = req.body;

  
  if (!nomFournisseur || !type) {
    res.status(400).json({ error: 'Le nom et le type du fournisseur sont requis' });
    return;
  }

 
  const existFournisseur = await prisma.fournisseurs.findFirst({
    where: { email },
  });

  if (existFournisseur) {
    res.status(400).json({ error: 'Cette adresse mail est déjà associée à un fournisseur' });
    return;
  }

  try {
     
    const fournisseur = await prisma.fournisseurs.create({
      data: {
        nomFournisseur,
        phoneFournisseur,
        adresseFournisseur,
        email,
        type,
      },
    });
 
    res.status(201).json({
      message: 'Fournisseur ajouté avec succès',
      fournisseur,
    });

  } catch (error: unknown) {
   
    if (error instanceof Error) {
      console.error('Erreur lors de l\'insertion du fournisseur:', error.message);
      res.status(500).json({ error: 'Erreur lors de l\'insertion du fournisseur', details: error.message });
    } else {
 
      console.error('Erreur inconnue:', error);
      res.status(500).json({ error: 'Erreur serveur inconnue' });
    }
  }
};



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