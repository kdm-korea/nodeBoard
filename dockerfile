# specify the node base image with your desired version node:<version>
FROM node:14.0.0-alpine

# replace this with your application's default port
EXPOSE 8080

# Manager
MAINTAINER DongMin Kim <kdm_korea@naver.com>

# /app Directory create
RUN mkdir -p /app

# /app directory를 WORKDIR로 설정
WORKDIR /app

# 현제 디렉터리에 있는 파일들을 이미지 내부 /app 디렉터리에 추가
ADD . /app

# 노드 패키지 실행할 파일
RUN yarn install

#환경변수 
ENV NODE_ENV development

#Container에서 실행될 명령
CMD ["yarn", "start"]
