# Quick Start

```bash
pnpm install
pnpm start
```

# Deploy

build

```bash
pnpm build
```

nginx conf

```
server {
  listen 3000;
  gzip on;
  gzip_comp_level 5;
  gzip_types text/plain application/javascript text/css;

  location / {
    root build;
    try_files $uri $uri/ /index.html;
  }
}
```