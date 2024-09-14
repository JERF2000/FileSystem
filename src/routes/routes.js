import { Router } from "express";
const router = Router();

router.get('/', (req, res) => res.render('views/home', {title: 'File System'}));
router.get('/configOS', (req, res) => res.render('views/configOS'));
router.get('/configExt4', (req, res) => res.render('views/configExt4'));
router.get('/configFat32', (req, res) => res.render('views/configFat32'));
router.get('/configNtfs', (req, res) => res.render('views/configNtfs'));

export default router;