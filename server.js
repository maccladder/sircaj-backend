const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Configurer le serveur
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Données fictives avec empreintes digitales associées
const antecedents = [
    {
        id: 1,
        fingerprint: '12345',
        nom: "Doe",
        prenom: "John",
        telephone: "0123456789",
        cni: "AB1234567",
        dateNaissance: "1985-06-15",
        recherche: true, // Cet individu est recherché par la police
        delits: [
            { infraction: "Vol", date: "2023-01-16" },
            { infraction: "Fraude", date: "2022-05-10" },
            { infraction: "Agression", date: "2021-09-20" },
        ],
    },
    {
        id: 2,
        fingerprint: '67890',
        nom: "Smith",
        prenom: "Anna",
        telephone: "0987654321",
        cni: "CD9876543",
        dateNaissance: "1990-03-22",
        recherche: false, // Non recherché
        delits: [
            { infraction: "Fraude", date: "2022-05-10" },
        ],
    },
];

// Route API : Recherche des antécédents par empreinte
app.post('/search', (req, res) => {
    const { fingerprint } = req.body;
    const result = antecedents.find(a => a.fingerprint === fingerprint);
    if (result) {
        res.json({
            success: true,
            profile: {
                nom: result.nom,
                prenom: result.prenom,
                telephone: result.telephone,
                cni: result.cni,
                dateNaissance: result.dateNaissance,
                recherche: result.recherche,
            },
            judicialRecords: result.delits,
        });
    } else {
        res.json({ success: false, message: "Cette empreinte ne figure pas dans notre base de données." });
    }
});

// Route API : Validation de l'empreinte digitale
app.post('/validate-fingerprint', (req, res) => {
    const { fingerprint } = req.body;

    // Simuler une empreinte enregistrée
    const validFingerprints = antecedents.map(a => a.fingerprint); // Empreintes fictives
    if (validFingerprints.includes(fingerprint)) {
        res.json({ success: true, message: 'Empreinte validée' });
    } else {
        res.json({ success: false, message: 'Empreinte non reconnue' });
    }
});

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
