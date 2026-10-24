-- =============================================================================
--                               DB SEEDING
-- =============================================================================
-- users
INSERT INTO "user" (name, email, password, created_at) VALUES
    ('Admin General', 'admin@example.com', 'scrypt_hashed_password_1', '2024-01-15 10:30:00'),
    ('Carlos Blé', 'carlos@example.com', 'scrypt_hashed_password_2', '2024-02-01 14:15:00'),
    ('Ana Martínez', 'ana.martinez@example.com', 'scrypt_hashed_password_3', '2024-03-10 09:00:00'),
    ('Laura Gómez', 'laura.gomez@example.com', 'scrypt_hashed_password_4', CURRENT_TIMESTAMP)
ON CONFLICT (email) DO NOTHING;


-- Animals en adopció
INSERT INTO adoptAnimal (nom, descripcio, dataNaixament, ubicacio, especie, esterilitzat, adoptat) VALUES
    ('Luna', 'Perra mestiza muy juguetona y cariñosa con niños.', '2021-05-14', 'Casa de acogida - Barcelona', 'Perro', TRUE, FALSE),
    ('Dónut', 'Gata tranquila, le encanta dormir al sol.', '2019-11-02', 'Colonia Estación', 'Gato', TRUE, FALSE),
    ('Felix', 'Macho joven con mucha energía, necesita espacio.', '2023-01-20', 'Casa de acogida - Viladecans', 'Perro', FALSE, FALSE),
    ('Simba', 'Gato mestizo muy sociable y ronroneador.', '2022-08-10', 'Casa de acogida - Girona', 'Gato', TRUE, TRUE),
    ('Nala', 'Coneja enana muy tranquila y acostumbrada a personas.', '2023-03-15', 'Colonia Canyars', 'Conejo', FALSE, FALSE)
ON CONFLICT DO NOTHING;


-- Animals perduts
INSERT INTO missingAnimal (nom, descripcio, zona, especie, xip, telContacte, mailContacte, trobat) VALUES
    ('Toby', 'Perro Beagle con collar rojo. Se asustó con petardos.', 'Parc de la Ciutadella', 'Perro', TRUE, '+34611223344', 'contacto.bobi@email.com', FALSE),
    ('Kira', 'Gata persa blanca con ojos azules, muy asustadiza.', 'Zona Centro, Valencia', 'Gato', TRUE, '+34655443322', 'maria.loss@email.com', FALSE),
    ('Todd', 'Pastor Alemán de 5 años. Responde a su nombre.', 'Barrio de Gràcia, Barcelona', 'Perro', FALSE, '+34699887766', 'albert.gracia@email.com', TRUE)
ON CONFLICT DO NOTHING;


-- Catáleg de Vacunes
INSERT INTO vaccine (nomVacuna) VALUES
    ('Rabia'),
    ('Polivalente canina (DHPPi)'),
    ('Trivalente felina'),
    ('Leucemia felina (FeLV)'),
    ('Mixomatosis')
ON CONFLICT DO NOTHING;


-- Catáleg de Medicaments
INSERT INTO medication (nomMedicament) VALUES
    ('Condroprotector articular'),
    ('Antibiótico Amoxicilina'),
    ('Insulina felina'),
    ('Desparasitante interno'),
    ('Antiinflamatorio Gotas')
ON CONFLICT DO NOTHING;


-- Asignació de Vacunes a Animals en Adopció
INSERT INTO animal_vaccine (idAnimal, idVaccine) VALUES
    (1, 1),
    (1, 2),
    (2, 3),
    (2, 4),
    (3, 1),
    (4, 3),
    (4, 4),
    (5, 5)
ON CONFLICT DO NOTHING;


-- Asignació de Medicaments a Animals en Adopció
INSERT INTO animal_medication (idAnimal, idMedication, cronic) VALUES
    (1, 1, TRUE),
    (1, 4, TRUE),
    (2, 5, FALSE),
    (3, 2, FALSE),
    (3, 4, FALSE)
ON CONFLICT DO NOTHING;