FROM openjdk:8-jdk-stretch
# set the base image to Debian
# https://hub.docker.com/_/debian/

RUN mkdir /usr/share/elasticsearch
RUN groupadd -g 1000 elasticsearch && \
    useradd -u 1000 -g 1000 -G 0 -d /usr/share/elasticsearch elasticsearch && \
    chmod 0775 /usr/share/elasticsearch
 
RUN chown elasticsearch:elasticsearch /usr/share/elasticsearch/


USER elasticsearch
WORKDIR /usr/share/elasticsearch

RUN git clone https://github.com/richbai90/kibana kibana
WORKDIR /usr/share/elasticsearch/kibana

USER root

RUN groupadd --gid 1001 node \
  && useradd --uid 1001 --gid node --shell /bin/bash --create-home node

RUN ARCH= && dpkgArch="$(dpkg --print-architecture)" \
  && case "${dpkgArch##*-}" in \
    amd64) ARCH='x64';; \
    ppc64el) ARCH='ppc64le';; \
    s390x) ARCH='s390x';; \
    arm64) ARCH='arm64';; \
    armhf) ARCH='armv7l';; \
    i386) ARCH='x86';; \
    *) echo "unsupported architecture"; exit 1 ;; \
  esac \
  # gpg keys listed at https://github.com/nodejs/node#release-keys
  && set -ex \
  && for key in \
    94AE36675C464D64BAFA68DD7434390BDBE9B9C5 \
    FD3A5288F042B6850C66B31F09FE44734EB7990E \
    71DCFD284A79C3B38668286BC97EC7A07EDE3FC1 \
    DD8F2338BAE7501E3DD5AC78C273792F7D83545D \
    C4F0DFFF4E8C1A8236409D08E73BC641CC11F4C8 \
    B9AE9905FFD7803F25714661B63B535A4C206CA9 \
    77984A986EBC2AA786BC0F66B01FBB92821C587A \
    8FCCA13FEF1D0C2E91008E09770F7A9A5AE15600 \
    4ED778F539E3634C779C87C6D7062848A1AB005C \
    A48C2BEE680E841632CD4E44F07496B3EB3C1762 \
    B9E2F5981AA6E0CD28160D9FF13993A75599653C \
  ; do \
    gpg --batch --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys "$key" || \
    gpg --batch --keyserver hkp://ipv4.pool.sks-keyservers.net --recv-keys "$key" || \
    gpg --batch --keyserver hkp://pgp.mit.edu:80 --recv-keys "$key" ; \
  done \
  && curl -fsSLO --compressed "https://nodejs.org/dist/v$(cat .node-version)/node-v$(cat .node-version)-linux-$ARCH.tar.xz" \
  && curl -fsSLO --compressed "https://nodejs.org/dist/v$(cat .node-version)/SHASUMS256.txt.asc" \
  && gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc \
  && grep " node-v$(cat .node-version)-linux-$ARCH.tar.xz\$" SHASUMS256.txt | sha256sum -c - \
  && tar -xJf "node-v$(cat .node-version)-linux-$ARCH.tar.xz" -C /usr/local --strip-components=1 --no-same-owner \
  && rm "node-v$(cat .node-version)-linux-$ARCH.tar.xz" SHASUMS256.txt.asc SHASUMS256.txt \
  && ln -s /usr/local/bin/node /usr/local/bin/nodejs

ENV YARN_VERSION 1.15.2
ENV KIBANA_TARGET 6.7
ENV NODE_OPTIONS "--max-old-space-size=4096"

RUN set -ex \
  && for key in \
    6A010C5166006599AA17F08146C2130DFD2497F5 \
  ; do \
    gpg --batch --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys "$key" || \
    gpg --batch --keyserver hkp://ipv4.pool.sks-keyservers.net --recv-keys "$key" || \
    gpg --batch --keyserver hkp://pgp.mit.edu:80 --recv-keys "$key" ; \
  done \
  && curl -fsSLO --compressed "https://yarnpkg.com/downloads/$YARN_VERSION/yarn-v$YARN_VERSION.tar.gz" \
  && curl -fsSLO --compressed "https://yarnpkg.com/downloads/$YARN_VERSION/yarn-v$YARN_VERSION.tar.gz.asc" \
  && gpg --batch --verify yarn-v$YARN_VERSION.tar.gz.asc yarn-v$YARN_VERSION.tar.gz \
  && mkdir -p /opt \
  && tar -xzf yarn-v$YARN_VERSION.tar.gz -C /opt/ \
  && ln -s /opt/yarn-v$YARN_VERSION/bin/yarn /usr/local/bin/yarn \
  && ln -s /opt/yarn-v$YARN_VERSION/bin/yarnpkg /usr/local/bin/yarnpkg \
  && rm yarn-v$YARN_VERSION.tar.gz.asc yarn-v$YARN_VERSION.tar.gz

USER elasticsearch

# update the yarn version to the latest
RUN yarn policies set-version
RUN git checkout $KIBANA_TARGET
RUN git remote add upstream https://github.com/elastic/kibana.git
# keep the repo up to date
RUN git fetch upstream && git pull upstream $KIBANA_TARGET
RUN yarn kbn bootstrap

WORKDIR /usr/share/elasticsearch/
USER root
COPY ./plugins/ /usr/share/elasticsearch/plugins
RUN chown -R elasticsearch:elasticsearch /usr/share/elasticsearch/plugins/ && chmod 0775 -R /usr/share/elasticsearch/plugins/
RUN chmod +x /usr/share/elasticsearch/plugins/init.sh

USER elasticsearch

RUN /usr/share/elasticsearch/plugins/init.sh

# RUN yarn es source --license oss
# RUN node scripts/makelogs


#bootstrap
#ENTRYPOINT "./entrypoint.sh"


# FROM docker.elastic.co/kibana/kibana-oss:6.7.1
# RUN /usr/share/kibana/bin/kibana-plugin install https://github.com/wtakase/kibana-own-home/releases/download/v6.7.1/own_home-6.7.1.zip

