# PLANO DE CORREÇÃO - FUNÇÕES DUPLICADAS

## Análise Realizada

### 1. `buscarLinkPastaDriveCampanha` (3 definições) 🔴

**Linha 3310:** `(idCampanha)` → Busca link raiz, retorna `{success, message}`
**Linha 4298:** `(idCampanha, nomeSubpasta)` → Busca subpasta, retorna `string` (URL)
**Linha 8536:** `(idCampanha, nomeSubpasta)` → Busca com/sem subpasta, retorna `{success, url/message}`

**AÇÃO:**
- ✂️ DELETAR linha 3310-3387 (função redundante, funcionalidade coberta pela 8536)
- ✂️ DELETAR linha 4298-4328 (função redundante, retorno inconsistente)
- ✅ MANTER linha 8536 (implementação mais completa e consistente)

### 2. `getChecklistCompletoComAndamento` (2 definições)

**Linha 3876:** Versão básica
**Linha 4473:** Versão melhorada com logging detalhado

**AÇÃO:**
- ✂️ DELETAR linha 3876-3933
- ✅ MANTER linha 4473 (versão melhorada)

### 3. `setupChecklistSheetComplete` (2 definições)

**Linha 386:** Primeira definição
**Linha 3490:** Segunda definição

**AÇÃO:**
- ✂️ DELETAR linha 386-423 (provavelmente versão antiga)
- ✅ MANTER linha 3490 (versão mais recente)

### 4. `configurarCalendarId` (2 definições)

**Linha 6003:** Primeira versão
**Linha 6122:** Segunda versão

**AÇÃO:**
- ✂️ DELETAR linha 6003-6026
- ✅ MANTER linha 6122

### 5. `atualizarEventoCalendar` (2 definições)

**Linha 6315:** Primeira versão
**Linha 8976:** Segunda versão

**AÇÃO:**
- ✂️ DELETAR linha 6315-6374
- ✅ MANTER linha 8976

### 6. `testarIntegracoes` (2 definições)

**Linha 6074:** Primeira versão
**Linha 8004:** Segunda versão (mais completa)

**AÇÃO:**
- ✂️ DELETAR linha 6074-6090
- ✅ MANTER linha 8004

### 7. `gerarRelatorioMensalAutomatico` (2 definições)

**Linha 6092:** Primeira versão
**Linha 7526:** Segunda versão

**AÇÃO:**
- ✂️ DELETAR linha 6092-6101
- ✅ MANTER linha 7526

### 8. `verificarPrazosVencidos` (2 definições)

**Linha 6103:** Primeira versão
**Linha 7649:** Segunda versão

**AÇÃO:**
- ✂️ DELETAR linha 6103-6120
- ✅ MANTER linha 7649

### 9. `diagnosticarProblemaChecklist` (2 definições)

**Linha 6136:** Primeira versão
**Linha 8135:** Segunda versão

**AÇÃO:**
- ✂️ DELETAR linha 6136-6206
- ✅ MANTER linha 8135

### 10. `testarCriarEventoEtapa` (2 definições)

**Linha 6028:** Primeira versão
**Linha 8300:** Segunda versão

**AÇÃO:**
- ✂️ DELETAR linha 6028-6072
- ✅ MANTER linha 8300

### 11. `recalcularValoresRepasse` (2 definições)

**Linha 4342:** Primeira versão
**Linha 9047:** Segunda versão

**AÇÃO:**
- ✂️ DELETAR linha 4342-4390
- ✅ MANTER linha 9047

---

## RESUMO DE AÇÕES

**Total de linhas a deletar:** ~600 linhas
**Funções a manter:** 11 (uma versão de cada)
**Funções a deletar:** 13 (definições duplicadas)

## ORDEM DE EXECUÇÃO

Deletar em ordem DECRESCENTE de linha para não alterar numeração:

1. ✂️ Linha 9047 - MANTER (última do arquivo)
2. ✂️ Linha 8976 - MANTER
3. ✂️ Linha 8536 - MANTER
4. ✂️ Linha 8300 - MANTER
5. ✂️ Linha 8135 - MANTER
6. ✂️ Linha 8004 - MANTER
7. ✂️ Linha 7649 - MANTER
8. ✂️ Linha 7526 - MANTER
9. ✂️ Deletar 6315-6374 (atualizarEventoCalendar)
10. ✂️ Deletar 6136-6206 (diagnosticarProblemaChecklist)
11. ✂️ Deletar 6103-6120 (verificarPrazosVencidos)
12. ✂️ Deletar 6092-6101 (gerarRelatorioMensalAutomatico)
13. ✂️ Deletar 6074-6090 (testarIntegracoes)
14. ✂️ Deletar 6028-6072 (testarCriarEventoEtapa)
15. ✂️ Deletar 6003-6026 (configurarCalendarId)
16. ✂️ Linha 4473 - MANTER
17. ✂️ Deletar 4342-4390 (recalcularValoresRepasse)
18. ✂️ Deletar 4298-4328 (buscarLinkPastaDriveCampanha)
19. ✂️ Deletar 3876-3933 (getChecklistCompletoComAndamento)
20. ✂️ Linha 3490 - MANTER
21. ✂️ Deletar 3310-3387 (buscarLinkPastaDriveCampanha)
22. ✂️ Deletar 386-423 (setupChecklistSheetComplete)

---

## IMPACTO NO FRONTEND

**Nenhuma alteração necessária no Html!** ✅

Todas as funções mantidas são chamadas corretamente pelo frontend. As funções deletadas eram:
- Duplicatas não utilizadas
- Versões antigas sobrescritas
- Código morto

## VALIDAÇÃO PÓS-CORREÇÃO

Após as deleções, verificar:
- [ ] Nenhuma função duplicada restante
- [ ] Todas as 43 funções chamadas pelo frontend ainda existem
- [ ] Code.gs compila sem erros
- [ ] Arquivo reduzido em ~600 linhas (~6%)
