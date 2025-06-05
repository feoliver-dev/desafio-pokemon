# Usar imagem base do Node.js
FROM node:18

# Criar diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código
COPY . .

# Build da aplicação React
RUN npm run build

# Instalar pacote serve para servir app React
RUN npm install -g serve

# Expor porta 3000
EXPOSE 3000

# Comando padrão
CMD ["serve", "-s", "build", "-l", "3000"]
