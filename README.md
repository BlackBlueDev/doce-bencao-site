# Doce Benção

Site institucional e cardápio online estático da Doce Benção.

O projeto funciona como vitrine digital para divulgação no Instagram e WhatsApp.
Ele não possui carrinho, checkout, pagamento online ou fluxo automático de pedido.

## Estrutura

```txt
/
├── index.html
├── atacado.html
├── netlify.toml
├── README.md
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── assets/
│   ├── logos/
│   │   └── logo-doce-bencao.png
│   └── produtos/
│       ├── produto-dudu-gourmet-real.png
│       ├── produto-dudu-tradicional-real.png
│       └── produto-sobremesas-reais.png
└── docs/
    ├── manual-marca-doce-bencao.pdf
    ├── cardapios-legados/
    └── previews/
```

## Como abrir localmente

Abra `index.html` diretamente no navegador.

Um servidor local é opcional. Caso utilize uma extensão de editor ou outra ferramenta
de servidor estático, publique a raiz do projeto.

## Deploy

O site está preparado para publicação pelo GitHub e Netlify.
O arquivo `netlify.toml` publica diretamente a raiz do projeto e não executa build.

## Atualizações

- Logo oficial: `assets/logos/logo-doce-bencao.png`
- Fotos dos produtos: `assets/produtos/`
- Links oficiais e produtos do cardápio: `js/app.js`
- Documentação visual e materiais antigos: `docs/`

Ao substituir uma imagem, preserve o nome do arquivo ou atualize todas as referências
relativas no HTML e no JavaScript.

## Contatos oficiais

- WhatsApp: `https://api.whatsapp.com/send/?phone=558187712609&text&type=phone_number&app_absent=0`
- Instagram: `https://www.instagram.com/docebencao.oficial/`
- Ponto Salgado: Rua Rocha Pombo, 386, Bairro Salgado. `https://maps.app.goo.gl/GDzpngrHon9zdK116`
- Ponto São João da Escócia: Rua Las Vegas, 15, Bairro São João da Escócia. `https://maps.app.goo.gl/7YLPYnbVzXdnDh7z8`
