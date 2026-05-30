# Doce Benção

Landing page institucional e cardápio online estático da Doce Benção.

O site funciona como vitrine digital para divulgação no Instagram e WhatsApp.
Ele não possui carrinho, checkout, pagamento online ou fluxo automático de pedido.
Os botões levam o cliente aos canais oficiais para consultar disponibilidade,
combinar retirada, encomendas ou valores de atacado e revenda.

## Estrutura

- `index.html`: apresentação da marca, texto institucional, cardápio, promoções, chamada de atacado, localizações e contato.
- `atacado.html`: tabela de referência para encomendas maiores e revendedores.
- `css/styles.css`: identidade visual e responsividade.
- `js/app.js`: produtos, filtros do cardápio, links oficiais e menu mobile.
- `assets/`: logos, fotos reais dos produtos e materiais recebidos.
- `netlify.toml`: configuração para publicação estática no Netlify.

## Marca

- Rosa: `#E91E63`
- Azul: `#1E88E5`
- Marrom: `#6D3C27`
- Bege: `#FFE6C7`
- Branco: `#FFFFFF`

## Como testar localmente

Rode:

```bash
node server.js 5500
```

Depois acesse `http://127.0.0.1:5500`.

## Publicação

O projeto está pronto para publicação estática pelo GitHub e Netlify.
No Netlify, use a raiz do repositório como diretório publicado. Não há comando de build.

## Logo

O cabeçalho, o rodapé, o favicon e a imagem de compartilhamento usam
`assets/logo-doce-bencao-header.png`. Quando a nova logo oficial for recebida,
substitua esse arquivo mantendo o fundo transparente e a proporção original.

## Contatos oficiais

- WhatsApp: `https://api.whatsapp.com/send/?phone=558187712609&text&type=phone_number&app_absent=0`
- Instagram: `https://www.instagram.com/docebencao.oficial/`
- Ponto Salgado: Rua Rocha Pombo, 386, Bairro Salgado. `https://maps.app.goo.gl/GDzpngrHon9zdK116`
- Ponto São João da Escócia: Rua Las Vegas, 15, Bairro São João da Escócia. `https://maps.app.goo.gl/7YLPYnbVzXdnDh7z8`

## Valores

- Dudu Gourmet: `R$ 4,00`
- Dudu Tradicional: `R$ 2,50`
- Sobremesas: `R$ 4,00`

## Promoções

- Dudu Gourmet: 3 por `R$ 10,00`
- Dudu Tradicional: 3 por `R$ 5,00`
- Sobremesas: 2 por `R$ 7,00`

## Atacado

- Dudu Gourmet: `R$ 3,00`
- Dudu Tradicional: `R$ 1,50`
- Sobremesas: `R$ 3,00`
