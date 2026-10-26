# Como ligar o jogo a uma planilha do Google

Leva uns dez minutos e só precisa ser feito uma vez. Depois disso, cada participante vira uma linha na planilha, atualizada em tempo real, de qualquer celular ou computador.

## 1. Criar a planilha

1. Entre em [sheets.google.com](https://sheets.google.com) com a conta que vai guardar os dados (de preferência a institucional).
2. Crie uma planilha em branco e dê um nome, por exemplo **Desafio de Genética — participantes**.

## 2. Colar o script

1. Na planilha, abra o menu **Extensões › Apps Script**.
2. Apague o que estiver no editor e cole todo o conteúdo do arquivo `apps-script.gs`.
3. **Defina a senha do relatório.** Troque `TROQUE-AQUI` na linha `const SENHA_RELATORIO = "TROQUE-AQUI";` por uma senha só da equipe. Não use 1217: esse código aparece no código-fonte do site, que é público, e esta senha é o que protege os nomes dos participantes.
4. Clique no ícone de disquete para salvar.
5. Opcional: no seletor de funções no topo, escolha `testar` e clique em **Executar**. Na primeira vez o Google pede autorização (veja o passo 3.4). Volte à planilha: deve aparecer a aba **Participantes** com uma linha de teste, que você pode apagar.

## 3. Publicar como App da Web

1. No editor do Apps Script, clique em **Implantar › Nova implantação**.
2. Na engrenagem ao lado de "Selecionar tipo", escolha **App da Web**.
3. Preencha:
   - **Executar como:** Eu (seu e-mail)
   - **Quem pode acessar:** Qualquer pessoa
4. Clique em **Implantar**. O Google pede autorização: escolha sua conta, clique em **Avançado › Acessar (não seguro)** e em **Permitir**. O aviso aparece porque o script é seu e não passou por revisão do Google; ele só mexe nesta planilha.
5. Copie o endereço que termina em **/exec**.

## 4. Colar o endereço no jogo

No `index.html`, procure estas linhas e preencha:

```js
const URL_PLANILHA  = "https://script.google.com/macros/s/....../exec";
const LINK_PLANILHA = "https://docs.google.com/spreadsheets/d/....../edit";
```

O `LINK_PLANILHA` é o endereço da própria planilha (o que aparece na barra do navegador quando ela está aberta). Ele é opcional e só serve para o botão "Abrir planilha" no relatório.

Suba o `index.html` de novo no GitHub.

## 5. Conferir

1. Abra o jogo, digite um nome, jogue e avalie.
2. Em alguns segundos a linha aparece na planilha.
3. Abra o relatório: endereço do jogo com `?relatorio` no final e a senha que você definiu no passo 2.3.

## Se mudar o script depois

Toda alteração no código do Apps Script — inclusive trocar a senha — exige **Implantar › Gerenciar implantações › editar (lápis) › Versão: Nova versão › Implantar**. O endereço /exec continua o mesmo.

## O que cada coluna guarda

| Coluna | Conteúdo |
|---|---|
| ID do participante | identificador único, gerado no aparelho |
| Início / Fim | data e hora de começo e de conclusão |
| Nome | só é gravado se a pessoa marcar a autorização |
| Autorizou uso na pesquisa | sim / não |
| Aparelho | celular, tablet ou computador |
| Modo | aparelho próprio ou computador do estande |
| Perguntas sorteadas | números das 3 perguntas (Q1 a Q30) |
| Acerto por pergunta | Q12=1; Q5=0; Q27=1 (1 = acertou) |
| Total de acertos | 0 a 3 — 3 significa que o código abre o cadeado |
| Código gerado | os três dígitos mostrados ao participante |
| Nota do jogo | 1 a 5 estrelas |
| Comentário | texto livre opcional (até 300 caracteres) |

O acerto de cada pergunta fica só na planilha e no relatório da equipe. O participante continua sem saber se acertou.

## Sem internet no estande

O jogo não perde registros: guarda tudo numa fila no próprio aparelho e envia sozinho quando a conexão volta. O relatório também mostra os registros locais do aparelho se não conseguir ler a planilha.
