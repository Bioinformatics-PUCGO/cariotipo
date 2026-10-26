/**
 * DESAFIO DE GENÉTICA — receptor de registros (Google Apps Script)
 * Cole este código em: Planilha do Google › Extensões › Apps Script.
 * Instruções completas em COMO-CONFIGURAR-PLANILHA.md.
 *
 * O site envia três eventos por participante (início, fim e avaliação).
 * Todos têm o mesmo "id": a primeira chegada cria a linha, as seguintes
 * completam essa mesma linha. Assim, cada participante ocupa uma linha só.
 */

// SENHA DO RELATÓRIO — troque antes de implantar.
// Ela protege os nomes dos participantes e fica só aqui, fora do site público.
// Use uma senha diferente do código 1217, que aparece no código-fonte do site.
const SENHA_RELATORIO = "TROQUE-AQUI";

const ABA = "Participantes";
const COLUNAS = [
  "id", "inicio", "fim", "nome", "consentimento", "dispositivo", "modo",
  "perguntas", "acertos_detalhe", "acertos", "codigo", "nota", "comentario", "atualizado_em"
];
const TITULOS = [
  "ID do participante", "Início", "Fim", "Nome", "Autorizou uso na pesquisa", "Aparelho", "Modo",
  "Perguntas sorteadas", "Acerto por pergunta (1 = acertou)", "Total de acertos (0 a 3)",
  "Código gerado", "Nota do jogo (1 a 5)", "Comentário", "Atualizado em"
];
const CAMPOS_DATA = ["inicio", "fim"];
const LIMITE_TEXTO = 300;

/** Recebe um registro do site e cria ou completa a linha do participante. */
function doPost(e) {
  const trava = LockService.getScriptLock();
  trava.waitLock(15000);                       // evita duas gravações ao mesmo tempo
  try {
    const dados = JSON.parse(e.postData.contents || "{}");
    const id = String(dados.id || "").slice(0, 40);
    if (!/^P[\w-]+$/.test(id)) return resposta({ ok: false, erro: "id inválido" });

    const aba = abaParticipantes();
    const ultima = aba.getLastRow();
    const ids = ultima > 1 ? aba.getRange(2, 1, ultima - 1, 1).getValues().map(r => String(r[0])) : [];
    const pos = ids.indexOf(id);
    const linha = pos >= 0 ? pos + 2 : ultima + 1;
    const valores = pos >= 0
      ? aba.getRange(linha, 1, 1, COLUNAS.length).getValues()[0]
      : new Array(COLUNAS.length).fill("");

    COLUNAS.forEach((col, i) => {
      if (col === "atualizado_em" || !(col in dados)) return;
      let v = dados[col];
      if (v === null || v === undefined || v === "") return;
      if (CAMPOS_DATA.includes(col)) { const d = new Date(v); v = isNaN(d) ? "" : d; }
      else if (typeof v === "string") v = limpar(v);
      valores[i] = v;
    });
    valores[0] = id;
    valores[COLUNAS.indexOf("atualizado_em")] = new Date();
    aba.getRange(linha, 1, 1, COLUNAS.length).setValues([valores]);
    return resposta({ ok: true });
  } catch (erro) {
    return resposta({ ok: false, erro: String(erro) });
  } finally {
    trava.releaseLock();
  }
}

/** Devolve todos os registros para o relatório do site (exige a senha do relatório). */
function doGet(e) {
  if (SENHA_RELATORIO === "TROQUE-AQUI") return resposta({ ok: false, erro: "senha não configurada" });
  if (String((e.parameter || {}).codigo || "") !== SENHA_RELATORIO) {
    Utilities.sleep(800);                      // atrasa tentativas repetidas de adivinhar
    return resposta({ ok: false, erro: "código" });
  }
  const aba = abaParticipantes();
  const ultima = aba.getLastRow();
  if (ultima < 2) return resposta({ ok: true, linhas: [] });
  const dados = aba.getRange(2, 1, ultima - 1, COLUNAS.length).getValues();
  const linhas = dados.map(r => {
    const o = {};
    COLUNAS.forEach((c, i) => { o[c] = r[i] instanceof Date ? r[i].toISOString() : r[i]; });
    return o;
  });
  return resposta({ ok: true, linhas });
}

/** Cria a aba com cabeçalho na primeira vez. */
function abaParticipantes() {
  const planilha = SpreadsheetApp.getActiveSpreadsheet();
  let aba = planilha.getSheetByName(ABA);
  if (!aba) {
    aba = planilha.insertSheet(ABA);
    aba.getRange(1, 1, 1, TITULOS.length).setValues([TITULOS]).setFontWeight("bold");
    aba.setFrozenRows(1);
    aba.getRange("B:C").setNumberFormat("dd/mm/yyyy hh:mm");
    aba.getRange("N:N").setNumberFormat("dd/mm/yyyy hh:mm");
  }
  return aba;
}

/** Remove quebras de linha e impede que um texto vire fórmula na planilha. */
function limpar(t) {
  let s = String(t).replace(/[\r\n\t]+/g, " ").trim().slice(0, LIMITE_TEXTO);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function resposta(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** Opcional: rode uma vez pelo editor para criar a aba e testar a gravação. */
function testar() {
  const r = doPost({ postData: { contents: JSON.stringify({
    id: "P000000-0000-TEST", inicio: new Date().toISOString(), nome: "Teste", consentimento: "sim",
    dispositivo: "computador", modo: "teste"
  }) } });
  Logger.log(r.getContent());
}
