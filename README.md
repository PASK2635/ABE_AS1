# Hvordan man starter

1. Sørg for at Docker og Docker-Compose er installeret og kører på forhånd
2. Når du er inde i roden af projekt-mappen skriver du "docker-compose up"
3. Når kommandoen er færdig med at køre, kan du gå ind på "http://localhost:80/swagger" for at se swagger dokumentationen
4. Hvis du skal teste nogle af endpoints med Postman eller lignende, kan du fx bruge endpoints som "http://localhost:80/api/hotel"

# Mangler

- Admin kan kun opdatere roller for brugere, dvs. at admin kan fx ikke oprette et nyt hotel eller reservere et værelse osv.
- Man kan ikke authenticate direkte igennem Swagger docs, dette skal gøres via postman. Swagger docs dokumenterer kun de diverse endpoints.
