FROM oryd/kratos:v0.5.3-alpha.1
ENV DSN "postgres://postgres:testpostgrespwd@kratos-db:5432/postgres?sslmode=disable&max_conns=20"
COPY kratos.yaml /home/ory/.kratos.yaml
COPY identity.traits.schema.json /home/ory/