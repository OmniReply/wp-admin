FROM node:20-bookworm-slim

# 安装 Puppeteer / Chrome 依赖（关键）

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npx puppeteer browsers install chrome

RUN npx puppeteer browsers install chrome-headless-shell

COPY . .

# 构建 Next.js
RUN npm run build
 

EXPOSE 3000

CMD ["npm", "start"]