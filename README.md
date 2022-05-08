# url-shortster
express, shortster, moving world

## routes
- GET: `/api/<shortcode>`: if shortcode is existing, redirect to original url
- GET: `/api/<shortcode>/stats`: if shortcode is existing, return the detail of that

- POST: `/api/url/register`: register new shortcode with original url

## frontend build

```bash
cd client
cp .env.example .env
pnpm install
pnpm build
```

## run

```bash
pnpm install
pnpm start
```