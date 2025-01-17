import express, { Request, Response } from 'express'; // Import correct des types
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import ajouterFournisseur from './../middleware/ajouterFournisseur';
import { listerFournisseurs } from './../middleware/listerFournisseurs';
import ajouterProduit from './../middleware/ajouterProduit';
import listerProduits from './../middleware/listerProduits';
import afficherUnProduit from './../middleware/afficherUnProduit';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('API is running!');
});


app.post('/signup', async (req: Request, res: Response) : Promise<void> => {
  const { nomUtilisateur, username, password } = req.body;

  if (!nomUtilisateur || !username || !password) {
    res.status(400).json({ error: 'Tous les champs sont obligatoires' });
    return;
  }

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({ error: 'Le mot de passe doit avoir au moins 8 caractères' });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.utilisateurs.create({
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
});

const JWT_SECRET = "@testion@gest@"
const JWT_EXPIRES_IN = '1h'; 
const REFRESH_TOKEN_SECRET = '@test@gestion@';
const REFRESH_TOKEN_EXPIRES_IN = '30d';

app.post('/login', async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: 'Nom d\'utilisateur et mot de passe sont requis' });
    return;
  }

  try {
    // Vérification de l'utilisateur dans la base de données
    const user = await prisma.utilisateurs.findUnique({
      where: { username },
    });

    if (!user) {
      res.status(401).json({ error: 'Utilisateur non trouvé' });
      return;
    }

    // Vérification du mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Mot de passe incorrect' });
      return;
    }

    // Création de l'Access token
    const accessToken = jwt.sign(
      { userId: user.idUtilisateur, username: user.username },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Création du Refresh token
    const refreshToken = jwt.sign(
      { userId: user.idUtilisateur, username: user.username },
      REFRESH_TOKEN_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
    );

    // Sauvegarde du refresh token dans la base de données
    await prisma.refreshToken.create({
      data: {
        idUtilisateur: user.idUtilisateur,
        token: refreshToken,
      },
    });

    // Réponse avec les tokens
    res.json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);  // Affichage de l'erreur dans les logs
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ajouter fournisseur
app.post('/fournisseur', ajouterFournisseur, async (req: Request, res: Response): Promise<void> => {
  const { fournisseur } = req.body; 
  res.status(201).json({
    message: 'Fournisseur ajouté avec succès',
    fournisseur,
  });
});

// lister les fournisseurs
app.get('/fournisseurs', listerFournisseurs);
// ajouter produit
app.post('/produit', ajouterProduit, async (req: Request, res: Response) => {
  try {
    const produit = req.body.produit;
    
    res.status(201).json({
      message: 'Produit ajouté avec succès.',
      produit,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de l'ajout du produit." });
  }
});
// liste des produits et fournisseurs associes
app.get('/produits', listerProduits);

// afficher un seul produit
app.get('/produits/:idProduit', afficherUnProduit);





// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
