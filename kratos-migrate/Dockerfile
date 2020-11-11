FROM oryd/kratos:v0.5.3-alpha.1-sqlite
CMD ["migrate", "sql", "postgres://postgres:testpostgrespwd@kratos-db:5432/postgres?sslmode=disable&max_conns=20", "--yes"]