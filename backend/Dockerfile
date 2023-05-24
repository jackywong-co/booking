FROM python:3.8
USER root
COPY . /app
WORKDIR /app
ENV APP_ENV=uat
RUN pip3 install -r /app/requirements/uat.txt
RUN chmod +x /app/docker-entrypoint.sh
ENTRYPOINT ["/app/docker-entrypoint.sh"]