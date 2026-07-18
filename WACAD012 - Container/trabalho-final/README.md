# Trabalho final - Containers


Instruções para execução:
Subir containers:
    docker compose up --build -d

Para parar o container;
    docker compose down

Para subir novamente:
    docker compose up -d
    
Para visualizar os logs:
    docker compose logs -f

Para acessar:
Frontend: http://localhost:8000
Backend API: http://localhost:4444/api
phpMyAdmin: http://localhost:8081
Usuário: root
   Senha: senhasegura
MySQLlocalhost:3306

Arquivos configurados:
docker-compose.yml
env.example -> .env