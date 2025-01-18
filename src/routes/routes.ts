import express, { Router } from 'express';
import { afficherUnProduit, ajouterProduit, listerProduits } from '../controllers/produitsController';
import { ajouterFournisseur, listerFournisseurs } from '../controllers/fournisseursController';
import { signup, login } from '../controllers/authController';
import { ajouterAchat } from '../controllers/achatsController';

export const router = Router();

router.post('/signup', signup); // route pour inscription
router.post('/login', login); // route pour login
router.post('/fournisseur', ajouterFournisseur); // route pour ajouter un fournisseur
router.get('/fournisseurs', listerFournisseurs); // route pour afficher tous les fournisseurs
router.post('/produit', ajouterProduit); // route pour ajouter un produit
router.get('/produits', listerProduits); // route pour afficher tous les produits
router.get('/produits/:idProduit', afficherUnProduit); // route pour afficher un seul produit
router.post('/achats', ajouterAchat); // route pour ravitailler le stock

