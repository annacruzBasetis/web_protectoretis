# <p align=center> Protectoretis </p>

Creat per Anna Cruz Heredia i Cléo Le Tron

## 1. Descripció

Aquest projecte és un projecte pedagògic en el marc del bootcamp de Basetis per a la incorporació a l'equip D4P.

_**Protectoretis**_ és un projecte d'implementació d'una pàgina d'aterratge (*landing page*) per a una protectora de Castelldefels. És una aplicació que permet als administradors crear i gestionar la informació d’un llistat d’animals. L'administrador pot iniciar sessió, afegir fitxes d’animals de la protectora amb les seves dades, i visualitzar el perfil de l'animal. El sistema permet adjuntar fotos i informació biogràfica a cada animal. Els usuaris de la pàgina poden visualitzar tots els animals amb la seva informació, i poden contactar amb la protectora a través d’un formulari, en cas d'estar interessats a adoptar un animal.  

<br>

## 2. Instructions

Per executar el projecte, segueix aquests passos:  
1. **Assegura't de tenir instal·lats Docker i Git a la teva màquina** :package:
   
2. **Clona el repositori:** 

   `git clone (https://github.com/annacruzBasetis/web_protectoretis.git)`  

3. **Configura les variables d'entorn:**

   - Crea un fitxer `.env` al directori del backend, i emplena els valors requerits: `DATABASE_NAME`, `DATABASE_PASSWORD`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `ADMIN_EMAIL`.
     
   - Configura el teu correu d'administrador amb OAuth de Google.
   

4. **Configura la base de dades PostgreSQL:**
   Executa `docker compose -d` amb el següent fitxer de configuració per executar la base de dades:
```yaml
name: databases

services:
    postgres:
        image: postgres:18-alpine
        ports:
            - 5432:5432
        volumes:
            - postgres:/var/lib/postgresql/data
        environment:
            POSTGRES_USER: postgres
            POSTGRES_PASSWORD: postgres
            POSTGRES_DB: protectoretis
            PGDATA: /var/lib/postgresql/data

volumes:
    postgres: 
   
6. **Compila i executa el projecte:**


   A la carpeta clonada, executa `cd backend && ./gradlew build && ./gradlew bootRun` per executar el backend
   Executa `cd my-app && npm install && npm run dev` per executar el frontend
   
   

7. **Obre el teu navegador i navega a** `https://localhost:5173` 

<br>

## 3. Technical Stack

### Frontend
- **React 19** amb components funcionals i hooks
- **Vite** com a eina de compilació, 
- **Components MUI** per a un estil basat en utilitats (*utility-first*)

### Backend
- **SpringBoot** com a framework principal
- **OAuth de Google** per a l'inici de sessió

### Database
- **Postgres**
