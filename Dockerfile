# Use a imagem oficial do Node.js como base
FROM node:14

# Diretório de trabalho na imagem Docker
WORKDIR /usr/src/app

# Copiar o package.json e package-lock.json (ou yarn.lock) para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências do Node.js
RUN npm install

# Copiar o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Expor a porta que o aplicativo Node.js está escutando (se aplicável)
EXPOSE 3000

# Comando para iniciar o aplicativo Node.js
CMD ["node", "src/Application/main.js"]