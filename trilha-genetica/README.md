# Trilha Genética — guia rápido

Seis estações com QR Code, do início da faculdade até a **sala 219F**. Em cada uma, o aluno lê o QR com a câmera do celular, vê uma estrutura em realidade aumentada (DNA, cromossomo, CRISPR…), **toca na resposta certa que flutua à frente** e recebe a pista da próxima estação. Não precisa instalar aplicativo.

| Estação | Tema | Pergunta |
|---|---|---|
| 1 | A molécula da vida (DNA) | Com qual base a adenina forma par? |
| 2 | Os cromossomos | Quantos cromossomos tem uma célula somática humana? |
| 3 | Do DNA à proteína | Qual molécula leva a mensagem do DNA ao ribossomo? |
| 4 | Quando o código muda | Como se chama a troca de uma única base? |
| 5 | A tesoura molecular (CRISPR) | Qual componente do CRISPR-Cas9 corta o DNA? |
| 6 | Você chegou! | Sem pergunta: comemoração em AR na porta da sala 219F |

## 1. Antes de imprimir: troque os textos de caminho

Abra o `index.html`, procure `const ESTACOES = [` e, em cada estação, troque:

- **`caminho`**: a pista de como chegar à *próxima* estação. Hoje está genérica ("Siga a sinalização da Trilha Genética…"). Escreva as direções reais, por exemplo "Suba a escada à direita da recepção e procure o cartaz no 2º andar".
- **`onde`**: onde fica o QR desta estação. Aparece quando um aluno chega a uma estação fora de ordem.

As perguntas e respostas também ficam ali e podem ser trocadas (`certa` é o índice da alternativa correta: 0, 1 ou 2).

## 2. Publicar

Suba o `index.html` e a pasta `assets` para o GitHub (pode ser numa pasta `trilha` do repositório do jogo). Ative o GitHub Pages como no jogo. A câmera só funciona em **HTTPS**, e o GitHub Pages já oferece isso.

## 3. Imprimir os cartazes

Com o site publicado, abra o endereço dele com `?cartazes` no final e clique em **Imprimir os 6 cartazes (A4)**. Saem seis páginas, uma por estação, com o QR Code, as logos, a hélice de DNA nas bordas e o mapa da trilha. Os QR Codes apontam para o endereço de onde a página foi aberta, então **abra os cartazes pelo endereço público**, não pelo computador local.

Dicas de afixação: cartaz em altura dos olhos, boa iluminação, sem reflexo; deixe a margem branca em volta do QR; imprima em papel fosco. Cole o da Estação 1 na entrada e o da 6 na porta da 219F.

## 4. Como funciona para o aluno

1. Lê o QR; abre a página; toca em **Abrir câmera (realidade aumentada)**.
2. Vê a estrutura flutuando e três alternativas 3D. Ao girar o celular, a cena fica no lugar (giroscópio). **Recentralizar** traz a cena de volta à frente.
3. Toca na resposta. Errou: a alternativa some e ele tenta outra; depois de dois erros aparece uma dica. Acertou: a estrutura reage e aparece a explicação e a pista da próxima estação.
4. O progresso fica salvo no celular. Se chegar a uma estação fora de ordem, a página avisa e mostra como chegar à que falta, mas **não bloqueia**.

Sem câmera ou sem permissão: continua em modo 3D com fundo claro. Sem 3D: as alternativas aparecem como botões. Nada é gravado nem enviado.

## 5. Testar antes do evento

- `?e=3` abre a Estação 3 direto. `?reset` apaga o progresso do aparelho.
- **Teste em pelo menos um iPhone e um Android reais.** No iPhone, o navegador pede permissão para o giroscópio e depois para a câmera; aceite as duas.
- Abra o QR com a câmera nativa do celular. Se o link abrir dentro do WhatsApp ou Instagram, a câmera pode ser bloqueada: toque em "Abrir no navegador".
- Teste em cada ponto da trilha com a iluminação real do corredor.

## Observações

- A AR é "em torno do aluno" (câmera + 3D ancorado pelo giroscópio), não presa ao cartaz. Isso funciona em iPhone e Android e com pouca luz. Prender a cena ao cartaz exigiria reconhecimento de imagem, que é mais frágil em corredores.
- Uma pessoa pode abrir qualquer estação sem ler o QR (o endereço é público). Como a trilha não tem prêmio, isso não é um problema; se quiser registrar quem completou, dá para ligar à mesma planilha do Desafio de Genética.
