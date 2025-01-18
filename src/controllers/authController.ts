import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Variables de JWT
const JWT_SECRET = "@testion@gest@";
const JWT_EXPIRES_IN = '1h';
const REFRESH_TOKEN_SECRET = '@test@gestion@';
const REFRESH_TOKEN_EXPIRES_IN = '30d';

// Inscription
export const signup = async (req: Request, res: Response): Promise<void> => {
  const { nomUtilisateur, username, password } = req.body;

  if (!nomUtilisateur || !username || !password) {
    res.status(400).json({ error: 'Tous les champs sont obligatoires' });
    return;
  }

  if (password.length <8) {
    res.status(400).json({ error: 'Le mot de passe doit avoir au moins 8 caractères, inclure une lettre et un chiffre.' });
    return;
  }

  const user = await prisma.utilisateurs.findUnique({ where: { username } });

    if (user) {
      res.status(401).json({ error: 'Ce nom d\'utilisateur est déjà dans le système.' });
      return;
    }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.utilisateurs.create({
      data: {
        nomUtilisateur,
        username,
        password: hashedPassword,
      },
    });
    res.status(201).json({ message: 'Inscription réussie avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Une erreur s'est produite" });
  }
};

// Connexion
export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: 'Nom d\'utilisateur et mot de passe sont requis' });
    return;
  }

  try {
    const user = await prisma.utilisateurs.findUnique({ where: { username } });

    if (!user) {
      res.status(401).json({ error: 'Utilisateur non trouvé' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Mot de passe incorrect' });
      return;
    }

    const accessToken = jwt.sign({ userId: user.idUtilisateur, username: user.username }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    const refreshToken = jwt.sign({ userId: user.idUtilisateur, username: user.username }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });

    await prisma.refreshToken.create({ data: { idUtilisateur: user.idUtilisateur, token: refreshToken } });

    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
