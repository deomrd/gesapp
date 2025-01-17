import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Middleware pour l'ajout d'un fournisseur
const ajouterFournisseur = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { nomFournisseur, phoneFournisseur, adresseFournisseur, email, type } = req.body;

  // Vérification des données requises
  if (!nomFournisseur || !type ) {
    res.status(400).json({ error: 'Le nom et le type du fournisseur sont requis' });
    return;
  }

  const existFournisseur = await prisma.fournisseurs.findFirst({
    where: { email },
  });
  if(existFournisseur){
    res.status(400).json({ error: 'Cette adresse mail est déjà associée à un fournisseur' });
    return;
  }

  try {
    // Insertion du fournisseur dans la base de données
    const fournisseur = await prisma.fournisseurs.create({
      data: {
        nomFournisseur,
        phoneFournisseur,
        adresseFournisseur,
        email,
        type
      },
    });

    // Ajout du fournisseur aux objets de la requête pour une utilisation future
    req.body.fournisseur = fournisseur;  // Vous pouvez utiliser cette valeur plus tard si nécessaire
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de l\'insertion du fournisseur' });
  }
};

export default ajouterFournisseur;
