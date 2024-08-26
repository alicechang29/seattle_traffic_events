Start server:
`bun run dev`

Start server in watch mode:
`bun --watch server.ts`

Setup DB:

1. Create DB: `createdb seattleEvents`
2. Run: `psql -f schema.sql seattleEvents`

## Reminders

Install Package:

```shell
# installs package
bun add express

# make the type errors go away for TS
bun add -d @types/express
```

Run a file:
`bun run parseNFLData.ts`
