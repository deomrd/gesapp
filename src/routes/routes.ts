import express, { Router } from 'express';
import { afficherUnProduit, ajouterProduit, listerProduits } from '../controllers/produitsController';
import { ajouterFournisseur, listerFournisseurs } from '../controllers/fournisseursController';
import { signup, login } from '../controllers/authController';
import { ajouterAchat } from '../controllers/achatsController';

export const router = Router();

router.post('/gesapp/signup', signup); // route pour inscription
router.post('/gesapp/login', login); // route pour login
router.post('/gesapp/fournisseur', ajouterFournisseur); // route pour ajouter un fournisseur
router.get('/gesapp/fournisseurs', listerFournisseurs); // route pour afficher tous les fournisseurs
router.post('/gesapp/produit', ajouterProduit); // route pour ajouter un produit
router.get('/gesapp/produits', listerProduits); // route pour afficher tous les produits
router.get('/gesapp/produits/:idProduit', afficherUnProduit); // route pour afficher un seul produit
router.post('/gesapp/achats', ajouterAchat); // route pour ravitailler le stock

