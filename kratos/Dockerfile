FROM oryd/kratos:v0.5.3-alpha.1-sqlite
COPY kratos.yaml /home/ory/.kratos.yaml
COPY identity.traits.schema.json /home/ory/
CMD ["serve", "--dev"]