
#-------------Build Stage ------------#
FROM node:20-alpine AS build

#Work directory
WORKDIR /app

#Copy dependency file 

COPY package*.json /app

#Install dependency 
RUN npm install

#  application code 
COPY . . 

#build next.js app 
RUN npm run build 



#---------production stage --------#
FROM node:20-alpine AS production

WORKDIR /app

#copy nessary build files
COPY --from=build /app/package*.json ./
COPY --from=build /app/.next/ ./.next/
COPY --from=build /app/app/ ./app/
COPY --from=build /app/public/ ./public
# COPY --from=build /app/node_modules ./node_modules

RUN npm install --omit=dev

# Expose port 
EXPOSE 3000


#start the app 
CMD ["npm", "start"]
