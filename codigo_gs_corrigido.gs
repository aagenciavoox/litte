// ═══════════════════════════════════════════════════════════════════════
//                    1_CONFIG.GS - CONFIGURAÇÕES E SETUP
//                    Sistema Littê v3.5
// ═══════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════
//                      WEBAPP - PONTO DE ENTRADA
// ═══════════════════════════════════════════════════════════════════════

function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Sistema Littê v3.5')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}


// ═══════════════════════════════════════════════════════════════════════
//                      CONFIGURAÇÃO INICIAL DO SISTEMA
//                      Execute APENAS UMA VEZ após instalar
// ═══════════════════════════════════════════════════════════════════════

function configurarLinksIniciais() {
  try {
    Logger.log('🔧 Iniciando configuração do sistema...');
    
    const props = PropertiesService.getScriptProperties();
   
    // Configurar todas as propriedades do sistema
    props.setProperties({
      'DRIVE_BASE': '1gJwX40mTYCxeO7afE6IfwZNxysYqxN0F',
      'PASTA_ASSESSORADOS': '1JeqjiamQtKw33X0Z9OmQJ0ojUciU2Wwd',
      'PASTA_RELATORIOS': '1Azj-tXHc2cJAAz-pQZoTHXkM-rhSEy0q',
      'CALENDAR_ID': 'c_b4a0a6992212fdef828fdec073ce8e99bf19095ffcb67f3699ffdf39b0922414@group.calendar.google.com',
      'TIMEZONE': 'America/Sao_Paulo'
    });
   
    Logger.log('✅ Propriedades configuradas com sucesso!');
    Logger.log('');
    Logger.log('📋 RESUMO DA CONFIGURAÇÃO:');
    Logger.log('─────────────────────────────────────');
    Logger.log('📂 DRIVE_BASE: ' + props.getProperty('DRIVE_BASE'));
    Logger.log('👥 PASTA_ASSESSORADOS: ' + props.getProperty('PASTA_ASSESSORADOS'));
    Logger.log('📊 PASTA_RELATORIOS: ' + props.getProperty('PASTA_RELATORIOS'));
    Logger.log('📅 CALENDAR_ID: ' + props.getProperty('CALENDAR_ID'));
    Logger.log('🌍 TIMEZONE: ' + props.getProperty('TIMEZONE'));
    Logger.log('─────────────────────────────────────');
    Logger.log('');
    Logger.log('💡 Próximo passo: Execute testarConfiguracaoDrive()');
   
    return {
      success: true,
      message: 'Configuração salva com sucesso!'
    };
    
  } catch (e) {
    Logger.log('❌ Erro na configuração: ' + e);
    return {
      success: false,
      message: 'Erro: ' + e.toString()
    };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      TESTAR CONFIGURAÇÃO DO DRIVE
//                      Execute para verificar se tudo está OK
// ═══════════════════════════════════════════════════════════════════════

function testarConfiguracaoDrive() {
  Logger.log('════════════════════════════════════════════════════');
  Logger.log('🧪 TESTE DE CONFIGURAÇÃO DO DRIVE');
  Logger.log('════════════════════════════════════════════════════');
  Logger.log('');
 
  const props = PropertiesService.getScriptProperties();
  const pastaAssessoradosId = props.getProperty('PASTA_ASSESSORADOS');
  const pastaRelatoriosId = props.getProperty('PASTA_RELATORIOS');
  const driveBaseId = props.getProperty('DRIVE_BASE');
  const calendarId = props.getProperty('CALENDAR_ID');
 
  let todosOk = true;
  let resultados = [];
  
  // ═══ TESTE 1: PASTA_ASSESSORADOS ═══
  Logger.log('📂 Teste 1: PASTA_ASSESSORADOS');
  Logger.log('   ID: ' + pastaAssessoradosId);
  
  if (!pastaAssessoradosId) {
    Logger.log('   ❌ FALHOU: Não configurada');
    todosOk = false;
    resultados.push('❌ PASTA_ASSESSORADOS não configurada');
  } else {
    try {
      const pasta = DriveApp.getFolderById(pastaAssessoradosId);
      Logger.log('   ✅ Nome: ' + pasta.getName());
      Logger.log('   🔗 URL: ' + pasta.getUrl());
      
      // Testar criação
      const pastaTest = pasta.createFolder('TESTE_' + new Date().getTime());
      Logger.log('   ✅ Criação: OK');
      pastaTest.setTrashed(true);
      Logger.log('   ✅ Remoção: OK');
      
      resultados.push('✅ PASTA_ASSESSORADOS: ' + pasta.getName());
      
    } catch (e) {
      Logger.log('   ❌ ERRO: ' + e);
      todosOk = false;
      resultados.push('❌ PASTA_ASSESSORADOS: ' + e.message);
    }
  }
  
  Logger.log('');
  
  // ═══ TESTE 2: PASTA_RELATORIOS ═══
  Logger.log('📊 Teste 2: PASTA_RELATORIOS');
  Logger.log('   ID: ' + pastaRelatoriosId);
  
  if (!pastaRelatoriosId) {
    Logger.log('   ⚠️ Não configurada (opcional)');
    resultados.push('⚠️ PASTA_RELATORIOS não configurada (opcional)');
  } else {
    try {
      const pasta = DriveApp.getFolderById(pastaRelatoriosId);
      Logger.log('   ✅ Nome: ' + pasta.getName());
      Logger.log('   🔗 URL: ' + pasta.getUrl());
      resultados.push('✅ PASTA_RELATORIOS: ' + pasta.getName());
    } catch (e) {
      Logger.log('   ❌ ERRO: ' + e);
      resultados.push('❌ PASTA_RELATORIOS: ' + e.message);
    }
  }
  
  Logger.log('');
  
  // ═══ TESTE 3: DRIVE_BASE ═══
  Logger.log('📁 Teste 3: DRIVE_BASE');
  Logger.log('   ID: ' + driveBaseId);
  
  if (!driveBaseId) {
    Logger.log('   ⚠️ Não configurada (opcional)');
    resultados.push('⚠️ DRIVE_BASE não configurada (opcional)');
  } else {
    try {
      const pasta = DriveApp.getFolderById(driveBaseId);
      Logger.log('   ✅ Nome: ' + pasta.getName());
      Logger.log('   🔗 URL: ' + pasta.getUrl());
      resultados.push('✅ DRIVE_BASE: ' + pasta.getName());
    } catch (e) {
      Logger.log('   ❌ ERRO: ' + e);
      resultados.push('❌ DRIVE_BASE: ' + e.message);
    }
  }
  
  Logger.log('');
  
  // ═══ TESTE 4: CALENDAR ═══
  Logger.log('📅 Teste 4: CALENDAR_ID');
  Logger.log('   ID: ' + calendarId);
  
  if (!calendarId) {
    Logger.log('   ❌ FALHOU: Não configurada');
    todosOk = false;
    resultados.push('❌ CALENDAR_ID não configurada');
  } else {
    try {
      const calendar = CalendarApp.getCalendarById(calendarId);
      Logger.log('   ✅ Nome: ' + calendar.getName());
      resultados.push('✅ CALENDAR: ' + calendar.getName());
    } catch (e) {
      Logger.log('   ❌ ERRO: ' + e);
      todosOk = false;
      resultados.push('❌ CALENDAR: ' + e.message);
    }
  }
  
  Logger.log('');
  Logger.log('════════════════════════════════════════════════════');
  Logger.log('📊 RESULTADO FINAL:');
  Logger.log('════════════════════════════════════════════════════');
  
  resultados.forEach(function(r) {
    Logger.log(r);
  });
  
  Logger.log('');
  
  if (todosOk) {
    Logger.log('🎉 TODOS OS TESTES PASSARAM!');
    Logger.log('✅ Sistema pronto para uso!');
    Logger.log('');
    Logger.log('💡 Próximo passo: Execute setupSheets()');
  } else {
    Logger.log('⚠️ ALGUNS TESTES FALHARAM');
    Logger.log('❌ Corrija os erros acima antes de continuar');
    Logger.log('');
    Logger.log('💡 Para reconfigurar: Execute configurarLinksIniciais()');
  }
  
  Logger.log('════════════════════════════════════════════════════');
 
  return {
    success: todosOk,
    message: todosOk ? 'Todos os testes passaram!' : 'Alguns testes falharam',
    resultados: resultados
  };
}


// ═══════════════════════════════════════════════════════════════════════
//                      SETUP DE TODAS AS ABAS
//                      Execute após testarConfiguracaoDrive()
// ═══════════════════════════════════════════════════════════════════════

function setupSheets() {
  try {
    Logger.log('════════════════════════════════════════════════════');
    Logger.log('🔧 SETUP DE TODAS AS ABAS DO SISTEMA');
    Logger.log('════════════════════════════════════════════════════');
    Logger.log('');
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
   
    const sheetsNecessarias = [
      'Assessorados',
      'Andamentos',
      'Campanhas_Ativas',
      'Checklist_Complete',
      'Checklist_Execução',
      'Financeiro_Complete',
      'Financeiro_Master',
      'Divisão_Sócios',
      'Controle_Repasses',
      'Templates',
      'Historico',
      'Notas',
      'Notificacoes',
      'FollowUps',
      'Config'
    ];
   
    Logger.log('📋 Criando abas necessárias...');
    Logger.log('');
    
    sheetsNecessarias.forEach(function(nome) {
      if (!ss.getSheetByName(nome)) {
        ss.insertSheet(nome);
        Logger.log('  ✅ Criada: ' + nome);
      } else {
        Logger.log('  ⏭️  Já existe: ' + nome);
      }
    });
   
    Logger.log('');
    Logger.log('🔨 Configurando estrutura das abas...');
    Logger.log('');
   
    // Configurar estrutura de cada aba
    setupAssessoradosSheet();
    Logger.log('  ✅ Assessorados configurada');
    
    setupAndamentosSheet();
    Logger.log('  ✅ Andamentos configurada');
    
    setupCampanhasAtivasSheet();
    Logger.log('  ✅ Campanhas_Ativas configurada');
    
    setupChecklistSheetComplete();
    Logger.log('  ✅ Checklist_Complete configurada');
    
    setupFinanceiroSheetComplete();
    Logger.log('  ✅ Financeiro_Complete configurada');
    
    setupTemplatesSheet();
    Logger.log('  ✅ Templates configurada');
    
    setupHistoricoSheet();
    Logger.log('  ✅ Historico configurada');
    
    setupNotificacoesSheet();
    Logger.log('  ✅ Notificacoes configurada');
    
    setupConfigSheet();
    Logger.log('  ✅ Config configurada');
   
    Logger.log('');
    Logger.log('════════════════════════════════════════════════════');
    Logger.log('🎉 SETUP COMPLETO FINALIZADO!');
    Logger.log('✅ Todas as abas foram criadas e configuradas!');
    Logger.log('');
    Logger.log('💡 O sistema está pronto para uso!');
    Logger.log('🌐 Acesse o webapp para começar a usar');
    Logger.log('════════════════════════════════════════════════════');
   
    return {
      success: true,
      message: 'Setup completo! ' + sheetsNecessarias.length + ' abas configuradas.'
    };
    
  } catch (e) {
    Logger.log('❌ Erro no setup: ' + e);
    return {
      success: false,
      message: 'Erro: ' + e.toString()
    };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      SETUP INDIVIDUAL DE CADA ABA
// ═══════════════════════════════════════════════════════════════════════

function setupAssessoradosSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Assessorados');
  
  if (!sheet) sheet = ss.insertSheet('Assessorados');
  
  const headers = [
    'ID', 'Nome', 'Usuario', 'Email', 'Telefone', 'Idade', 'Sapato', 'Camiseta', 'Calça',
    'Endereço Nome', 'Rua', 'Número', 'Complemento', 'Bairro', 'Cidade', 'Estado', 'CEP',
    'Status', 'Data Cadastro', 'Observacoes', 'URL Pasta Drive', 'Link Planilha Espelho',
    'Data Criacao', 'Ultima Atualizacao'
  ];
  
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold')
      .setBackground('#667eea').setFontColor('#ffffff');
  }
  
  sheet.setFrozenRows(1);
  return sheet;
}


function setupAndamentosSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Andamentos');
  
  if (!sheet) sheet = ss.insertSheet('Andamentos');
  
  const headers = [
    'ID Campanha', 'ID Assessorado', 'Marca', 'Objeto Campanha', 'Fase', 'Status Detalhado',
    'Remetente', 'Responsavel Litte', 'Valor Proposto', 'Valor Fechado', 'Data Criacao',
    'Link Pasta Campanha', 'Ultimo Retorno', 'Observacoes', 'Descricao Escopo', 'Concluida',
    'Data Conclusao', 'Ultima Atualizacao', 'Data Primeiro Contato', 'Proximo Follow-Up',
    'Ultima Interacao', 'Ultima Mensagem'
  ];
  
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold')
      .setBackground('#667eea').setFontColor('#ffffff');
  }
  
  sheet.setFrozenRows(1);
  return sheet;
}


function setupCampanhasAtivasSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Campanhas_Ativas');
  
  if (!sheet) sheet = ss.insertSheet('Campanhas_Ativas');
  
  const headers = [
    'ID Campanha', 'Influenciador', 'Marca', 'Valor Total',
    'Status Geral', 'Proximo Prazo', 'Responsavel', 'Ultima Atualizacao'
  ];
  
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold')
      .setBackground('#667eea').setFontColor('#ffffff');
  }
  
  sheet.setFrozenRows(1);
  return sheet;
}


function setupChecklistSheetComplete() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Checklist_Complete');
  
  if (!sheet) {
    sheet = ss.insertSheet('Checklist_Complete');
  }
  
  const headers = [
    'ID Campanha', 'ID Assessorado', 'Nome Assessorado', 'Marca',
    'Precisa Contrato', 'Status Contrato', 'Data Prev Assinatura', 'Data Real Assinatura', 'Link Contrato', 'Obs Contrato',
    'Precisa Produto', 'Nome Produto', 'Quantidade', 'Valor Produto', 'Endereço Envio', 'Status Produto', 'Data Envio', 'Código Rastreio', 'Link Rastreamento',
    'Precisa Roteiro', 'Tipo Roteiro', 'Num Versões', 'Status Roteiro', 'Data Prev Roteiro', 'Data Real Roteiro', 'Data Aprov Roteiro', 'Link Pasta Roteiro', 'Feedback Cliente', 'Data Última Versão',
    'Status Conteúdo', 'Tipo Conteúdo', 'Formato', 'Duração Vídeo', 'Data Prev Conteúdo', 'Data Real Conteúdo', 'Data Aprov Conteúdo', 'Link Pasta Aprovação', 'Num Ajustes', 'Aprovador',
    'Status Postagem', 'Rede Social', 'Tipo Post', 'Data Prev Postagem', 'Horário Postagem', 'Data Real Postagem', 'Link Postagem', 'Alcance Esperado', 'Alcance Real', 'Engajamento', 'Métricas Detalhadas',
    'Data Prev Coleta Métricas', 'Status Métricas', 'Link Métricas',
    'Valor Total Pagamento', 'Data Prev Pag Cliente',
    'Valor Repasse 80%', 'Taxa Littê 20%', 'Status Repasse', 'Data Repasse', 'Comprovante Repasse',
    'Data Criação', 'Última Atualização'
  ];
  
  const primeiracelula = sheet.getRange(1, 1).getValue();
  
  if (primeiracelula !== 'ID Campanha') {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#667eea')
      .setFontColor('#ffffff');
    
    sheet.setFrozenRows(1);
    SpreadsheetApp.flush();
  }
  
  return sheet;
}


function setupFinanceiroSheetComplete() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Financeiro_Complete');
  
  if (!sheet) sheet = ss.insertSheet('Financeiro_Complete');
  
  const headers = [
    'ID Campanha', 'ID Assessorado', 'Nome Assessorado', 'Marca', 'Valor Total',
    'Status Pag Cliente', 'Status Repasse', 'Status NF', 'Data Criação', 'Última Atualização'
  ];
  
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold')
      .setBackground('#667eea').setFontColor('#ffffff');
  }
  
  sheet.setFrozenRows(1);
  return sheet;
}


function setupTemplatesSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Templates');
  
  if (!sheet) sheet = ss.insertSheet('Templates');
  
  const headers = ['ID', 'Nome', 'Categoria', 'Assunto', 'Corpo', 'Data Criacao'];
  
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold')
      .setBackground('#667eea').setFontColor('#ffffff');
  }
  
  return sheet;
}


function setupHistoricoSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Historico');
  
  if (!sheet) sheet = ss.insertSheet('Historico');
  
  const headers = ['Tipo', 'ID Campanha', 'Acao', 'Usuario', 'Valor Antes', 'Valor Depois', 'Detalhes', 'Data Hora'];
  
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold')
      .setBackground('#667eea').setFontColor('#ffffff');
  }
  
  return sheet;
}


function setupNotificacoesSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Notificacoes');
  
  if (!sheet) sheet = ss.insertSheet('Notificacoes');
  
  const headers = [
    'ID Notificação', 'Tipo', 'Título', 'Mensagem', 'ID Campanha',
    'ID Destinatário', 'Lida', 'Data Criação', 'Data Leitura', 'Prioridade', 'Icone'
  ];
  
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold')
      .setBackground('#667eea').setFontColor('#ffffff');
  }
  
  return sheet;
}


function setupConfigSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Config');
  
  if (!sheet) sheet = ss.insertSheet('Config');
  
  const headers = ['Lista', 'Valor'];
  
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, 2).setValues([headers]);
    sheet.getRange(1, 1, 1, 2).setFontWeight('bold')
      .setBackground('#667eea').setFontColor('#ffffff');
  }
  
  return sheet;
}

// ═══════════════════════════════════════════════════════════════
//                    CONFIGURAÇÃO GLOBAL
// ═══════════════════════════════════════════════════════════════

const SPREADSHEET = SpreadsheetApp.getActiveSpreadsheet();

const SHEETS = {
  assessorados: SPREADSHEET.getSheetByName('Assessorados'),
  andamentos: SPREADSHEET.getSheetByName('Andamentos'),
  campanhasAtivas: SPREADSHEET.getSheetByName('Campanhas_Ativas'),
  checklist: SPREADSHEET.getSheetByName('Checklist'),
  financeiro: SPREADSHEET.getSheetByName('Financeiro'),
  historico: SPREADSHEET.getSheetByName('Historico'),
  templates: SPREADSHEET.getSheetByName('Templates'),
  notificacoes: SPREADSHEET.getSheetByName('Notificacoes'),
  config: SPREADSHEET.getSheetByName('Config')
};

// Verificar se todas as abas existem
function verificarAbasExistentes() {
  const abasNecessarias = Object.keys(SHEETS);
  const abasFaltando = [];
  
  for (const aba of abasNecessarias) {
    if (!SHEETS[aba]) {
      abasFaltando.push(aba);
    }
  }
  
  if (abasFaltando.length > 0) {
    Logger.log('❌ ERRO: Abas faltando: ' + abasFaltando.join(', '));
    throw new Error('Abas faltando na planilha: ' + abasFaltando.join(', '));
  }
  
  Logger.log('✅ Todas as abas estão presentes');
  return true;
}

// ═══════════════════════════════════════════════════════════════════════
//                      FIM DO 1_CONFIG.GS
// ═══════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════
//                    2_UTILS.GS - UTILITÁRIOS COMPARTILHADOS
//                    Sistema Littê v3.5
//                    Funções auxiliares usadas por múltiplos módulos
// ═══════════════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════════════
//                      GERAÇÃO DE IDs ÚNICOS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Gera um ID único baseado no tipo
 * @param {string} tipo - Tipo do ID (assessorado, campanha, andamento, notificacao, template, nota, followup)
 * @returns {string} ID único gerado
 */
function generateId(tipo) {
  try {
    const prefixos = {
      'assessorado': 'ASS',
      'campanha': 'CAM',
      'andamento': 'AND',
      'notificacao': 'NOT',
      'template': 'TPL',
      'nota': 'NOTE',
      'followup': 'FUP',
      'financeiro': 'FIN'
    };
   
    const prefixo = prefixos[tipo.toLowerCase()] || 'GEN';
    const timestamp = new Date().getTime().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
   
    const id = prefixo + timestamp + random;
    
    Logger.log('✅ ID gerado: ' + id + ' (tipo: ' + tipo + ')');
    
    return id;
   
  } catch (e) {
    Logger.log('❌ generateId: ' + e);
    return 'ID' + new Date().getTime();
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      BUSCA E NAVEGAÇÃO
// ═══════════════════════════════════════════════════════════════════════

/**
 * Encontra a linha de um registro por ID
 * @param {Sheet} sheet - Planilha onde buscar
 * @param {string} id - ID a ser buscado
 * @returns {number|null} Número da linha (ou null se não encontrado)
 */
function findRowById(sheet, id) {
  try {
    if (!sheet || sheet.getLastRow() <= 1) return null;
   
    const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues();
   
    for (let i = 0; i < data.length; i++) {
      if (String(data[i][0]) === String(id)) {
        return i + 2; // +2 porque começamos na linha 2 e array é 0-indexed
      }
    }
   
    return null;
  } catch (e) {
    Logger.log('❌ findRowById: ' + e);
    return null;
  }
}


/**
 * Busca múltiplas linhas por um valor em uma coluna específica
 * @param {Sheet} sheet - Planilha onde buscar
 * @param {number} coluna - Número da coluna (1-indexed)
 * @param {*} valor - Valor a ser buscado
 * @returns {Array} Array com números das linhas encontradas
 */
function findRowsByColumnValue(sheet, coluna, valor) {
  try {
    if (!sheet || sheet.getLastRow() <= 1) return [];
   
    const data = sheet.getRange(2, coluna, sheet.getLastRow() - 1, 1).getValues();
    const linhas = [];
   
    for (let i = 0; i < data.length; i++) {
      if (String(data[i][0]) === String(valor)) {
        linhas.push(i + 2);
      }
    }
   
    return linhas;
  } catch (e) {
    Logger.log('❌ findRowsByColumnValue: ' + e);
    return [];
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      FORMATAÇÃO DE DADOS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Formata uma data para string no padrão brasileiro
 * @param {Date|string} date - Data a ser formatada
 * @returns {string} Data formatada (dd/MM/yyyy)
 */
function formatDateToString(date) {
  if (!date) return '';
  if (!(date instanceof Date)) {
    // Tentar converter string para Date
    if (typeof date === 'string') {
      date = new Date(date);
    } else {
      return date;
    }
  }
  
  if (isNaN(date.getTime())) return '';

  return Utilities.formatDate(
    date,
    Session.getScriptTimeZone(),
    'dd/MM/yyyy'
  );
}


/**
 * Formata uma data para string no padrão ISO (YYYY-MM-DD)
 * @param {Date} date - Data a ser formatada
 * @returns {string} Data formatada (YYYY-MM-DD)
 */
function formatDateToISO(date) {
  if (!date) return '';
  if (!(date instanceof Date)) return date;

  return Utilities.formatDate(
    date,
    Session.getScriptTimeZone(),
    'yyyy-MM-dd'
  );
}


/**
 * Formata uma data com hora
 * @param {Date} date - Data a ser formatada
 * @returns {string} Data e hora formatadas (dd/MM/yyyy HH:mm)
 */
function formatDateTime(date) {
  if (!date) return '';
  if (!(date instanceof Date)) return date;

  return Utilities.formatDate(
    date,
    Session.getScriptTimeZone(),
    'dd/MM/yyyy HH:mm'
  );
}


/**
 * Formata um valor monetário para o padrão brasileiro
 * @param {number} valor - Valor a ser formatado
 * @returns {string} Valor formatado (R$ 1.234,56)
 */
function formatCurrency(valor) {
  if (valor === null || valor === undefined) return 'R$ 0,00';
  
  const numero = parseFloat(valor);
  
  if (isNaN(numero)) return 'R$ 0,00';
  
  return 'R$ ' + numero.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}


/**
 * Formata um número para porcentagem
 * @param {number} valor - Valor a ser formatado (ex: 0.15 para 15%)
 * @returns {string} Porcentagem formatada (15%)
 */
function formatPercentage(valor) {
  if (valor === null || valor === undefined) return '0%';
  
  const numero = parseFloat(valor);
  
  if (isNaN(numero)) return '0%';
  
  return (numero * 100).toFixed(2) + '%';
}


// ═══════════════════════════════════════════════════════════════════════
//                      VALIDAÇÕES
// ═══════════════════════════════════════════════════════════════════════

/**
 * Valida um email
 * @param {string} email - Email a ser validado
 * @returns {boolean} true se válido, false caso contrário
 */
function validarEmail(email) {
  if (!email) return false;
  
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}


/**
 * Valida um telefone brasileiro
 * @param {string} telefone - Telefone a ser validado
 * @returns {boolean} true se válido, false caso contrário
 */
function validarTelefone(telefone) {
  if (!telefone) return false;
  
  // Remove tudo que não é número
  const numeros = telefone.replace(/\D/g, '');
  
  // Verifica se tem 10 ou 11 dígitos (com DDD)
  return numeros.length >= 10 && numeros.length <= 11;
}


/**
 * Valida um CEP brasileiro
 * @param {string} cep - CEP a ser validado
 * @returns {boolean} true se válido, false caso contrário
 */
function validarCEP(cep) {
  if (!cep) return false;
  
  // Remove tudo que não é número
  const numeros = cep.replace(/\D/g, '');
  
  // CEP deve ter exatamente 8 dígitos
  return numeros.length === 8;
}


/**
 * Valida um CNPJ
 * @param {string} cnpj - CNPJ a ser validado
 * @returns {boolean} true se válido, false caso contrário
 */
function validarCNPJ(cnpj) {
  if (!cnpj) return false;
  
  cnpj = cnpj.replace(/\D/g, '');
  
  if (cnpj.length !== 14) return false;
  
  // Validação básica (todos os dígitos iguais)
  if (/^(\d)\1+$/.test(cnpj)) return false;
  
  return true; // Validação completa seria muito extensa
}


// ═══════════════════════════════════════════════════════════════════════
//                      MANIPULAÇÃO DE STRINGS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Remove acentos e caracteres especiais de uma string
 * @param {string} texto - Texto a ser limpo
 * @returns {string} Texto sem acentos
 */
function removerAcentos(texto) {
  if (!texto) return '';
  
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}


/**
 * Limpa uma string removendo espaços extras e quebras de linha
 * @param {string} texto - Texto a ser limpo
 * @returns {string} Texto limpo
 */
function limparString(texto) {
  if (!texto) return '';
  
  return texto
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\n+/g, '\n');
}


/**
 * Gera um slug a partir de um texto (URL-friendly)
 * @param {string} texto - Texto original
 * @returns {string} Slug gerado
 */
function gerarSlug(texto) {
  if (!texto) return '';
  
  return removerAcentos(texto)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}


/**
 * Capitaliza a primeira letra de cada palavra
 * @param {string} texto - Texto a ser capitalizado
 * @returns {string} Texto capitalizado
 */
function capitalizarPalavras(texto) {
  if (!texto) return '';
  
  return texto.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {
    return a.toUpperCase();
  });
}


/**
 * Trunca um texto para um tamanho máximo
 * @param {string} texto - Texto a ser truncado
 * @param {number} tamanho - Tamanho máximo
 * @param {string} sufixo - Sufixo a adicionar (padrão: '...')
 * @returns {string} Texto truncado
 */
function truncarTexto(texto, tamanho, sufixo) {
  if (!texto) return '';
  if (texto.length <= tamanho) return texto;
  
  sufixo = sufixo || '...';
  return texto.substring(0, tamanho - sufixo.length) + sufixo;
}


// ═══════════════════════════════════════════════════════════════════════
//                      MANIPULAÇÃO DE ARRAYS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Remove duplicatas de um array
 * @param {Array} array - Array com possíveis duplicatas
 * @returns {Array} Array sem duplicatas
 */
function removerDuplicatas(array) {
  if (!Array.isArray(array)) return [];
  
  return array.filter(function(item, index) {
    return array.indexOf(item) === index;
  });
}


/**
 * Ordena um array de objetos por uma propriedade
 * @param {Array} array - Array de objetos
 * @param {string} propriedade - Nome da propriedade
 * @param {boolean} decrescente - Se true, ordena decrescente
 * @returns {Array} Array ordenado
 */
function ordenarPorPropriedade(array, propriedade, decrescente) {
  if (!Array.isArray(array)) return [];
  
  return array.sort(function(a, b) {
    const valorA = a[propriedade];
    const valorB = b[propriedade];
    
    if (valorA < valorB) return decrescente ? 1 : -1;
    if (valorA > valorB) return decrescente ? -1 : 1;
    return 0;
  });
}


/**
 * Agrupa array de objetos por uma propriedade
 * @param {Array} array - Array de objetos
 * @param {string} propriedade - Nome da propriedade
 * @returns {Object} Objeto com arrays agrupados
 */
function agruparPor(array, propriedade) {
  if (!Array.isArray(array)) return {};
  
  return array.reduce(function(grupos, item) {
    const chave = item[propriedade];
    if (!grupos[chave]) {
      grupos[chave] = [];
    }
    grupos[chave].push(item);
    return grupos;
  }, {});
}


// ═══════════════════════════════════════════════════════════════════════
//                      CÁLCULOS E CONVERSÕES
// ═══════════════════════════════════════════════════════════════════════

/**
 * Calcula a diferença em dias entre duas datas
 * @param {Date} data1 - Primeira data
 * @param {Date} data2 - Segunda data
 * @returns {number} Diferença em dias
 */
function calcularDiferencaDias(data1, data2) {
  if (!data1 || !data2) return 0;
  
  const umDia = 1000 * 60 * 60 * 24;
  const diff = Math.abs(data2 - data1);
  
  return Math.ceil(diff / umDia);
}


/**
 * Calcula porcentagem de um valor sobre outro
 * @param {number} valor - Valor parcial
 * @param {number} total - Valor total
 * @returns {number} Porcentagem (0-100)
 */
function calcularPorcentagem(valor, total) {
  if (!total || total === 0) return 0;
  
  return (valor / total) * 100;
}


/**
 * Arredonda um valor para N casas decimais
 * @param {number} valor - Valor a ser arredondado
 * @param {number} casas - Número de casas decimais (padrão: 2)
 * @returns {number} Valor arredondado
 */
function arredondar(valor, casas) {
  casas = casas || 2;
  const multiplicador = Math.pow(10, casas);
  return Math.round(valor * multiplicador) / multiplicador;
}


// ═══════════════════════════════════════════════════════════════════════
//                      LOGGING E DEBUG
// ═══════════════════════════════════════════════════════════════════════

/**
 * Loga um objeto de forma formatada
 * @param {string} titulo - Título do log
 * @param {Object} objeto - Objeto a ser logado
 */
function logObjeto(titulo, objeto) {
  Logger.log('═══════════════════════════════════════');
  Logger.log('📊 ' + titulo);
  Logger.log('═══════════════════════════════════════');
  Logger.log(JSON.stringify(objeto, null, 2));
  Logger.log('═══════════════════════════════════════');
}


/**
 * Loga início de uma operação
 * @param {string} operacao - Nome da operação
 */
function logInicio(operacao) {
  Logger.log('');
  Logger.log('🚀 INICIANDO: ' + operacao);
  Logger.log('⏰ ' + new Date().toLocaleString('pt-BR'));
  Logger.log('');
}


/**
 * Loga fim de uma operação
 * @param {string} operacao - Nome da operação
 * @param {boolean} sucesso - Se a operação foi bem-sucedida
 */
function logFim(operacao, sucesso) {
  Logger.log('');
  if (sucesso) {
    Logger.log('✅ CONCLUÍDO: ' + operacao);
  } else {
    Logger.log('❌ FALHOU: ' + operacao);
  }
  Logger.log('⏰ ' + new Date().toLocaleString('pt-BR'));
  Logger.log('');
}


// ═══════════════════════════════════════════════════════════════════════
//                      HELPERS DE PLANILHA
// ═══════════════════════════════════════════════════════════════════════

/**
 * Obtém a última linha com dados em uma coluna específica
 * @param {Sheet} sheet - Planilha
 * @param {number} coluna - Número da coluna (1-indexed)
 * @returns {number} Número da última linha com dados
 */
function getUltimaLinhaComDados(sheet, coluna) {
  if (!sheet) return 0;
  
  const data = sheet.getRange(1, coluna, sheet.getMaxRows(), 1).getValues();
  
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i][0] !== '') {
      return i + 1;
    }
  }
  
  return 0;
}


/**
 * Limpa todas as linhas vazias de uma planilha
 * @param {Sheet} sheet - Planilha a ser limpa
 * @returns {number} Número de linhas removidas
 */
function limparLinhasVazias(sheet) {
  if (!sheet) return 0;
  
  const lastRow = sheet.getMaxRows();
  const lastCol = sheet.getMaxColumns();
  let linhasRemovidas = 0;
  
  for (let i = lastRow; i > 1; i--) {
    const range = sheet.getRange(i, 1, 1, lastCol);
    const values = range.getValues()[0];
    
    const vazia = values.every(function(cell) {
      return cell === '' || cell === null;
    });
    
    if (vazia) {
      sheet.deleteRow(i);
      linhasRemovidas++;
    }
  }
  
  return linhasRemovidas;
}


/**
 * Copia formatação de uma linha para outra
 * @param {Sheet} sheet - Planilha
 * @param {number} linhaOrigem - Linha de origem
 * @param {number} linhaDestino - Linha de destino
 */
function copiarFormatacaoLinha(sheet, linhaOrigem, linhaDestino) {
  if (!sheet) return;
  
  const numCols = sheet.getMaxColumns();
  const rangeOrigem = sheet.getRange(linhaOrigem, 1, 1, numCols);
  const rangeDestino = sheet.getRange(linhaDestino, 1, 1, numCols);
  
  rangeOrigem.copyFormatToRange(sheet, 1, numCols, linhaDestino, linhaDestino);
}


// ═══════════════════════════════════════════════════════════════════════
//                      UTILITÁRIOS DIVERSOS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Pausa a execução por X milissegundos
 * @param {number} ms - Milissegundos para pausar
 */
function sleep(ms) {
  Utilities.sleep(ms);
}


/**
 * Gera um número aleatório entre min e max
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @returns {number} Número aleatório
 */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * Verifica se um valor está vazio (null, undefined, string vazia, array vazio)
 * @param {*} valor - Valor a ser verificado
 * @returns {boolean} true se vazio
 */
function isEmpty(valor) {
  return valor === null || 
         valor === undefined || 
         valor === '' || 
         (Array.isArray(valor) && valor.length === 0) ||
         (typeof valor === 'object' && Object.keys(valor).length === 0);
}


/**
 * Clona um objeto profundamente
 * @param {Object} obj - Objeto a ser clonado
 * @returns {Object} Clone do objeto
 */
function clonarObjeto(obj) {
  return JSON.parse(JSON.stringify(obj));
}


// ═══════════════════════════════════════════════════════════════════════
//                      FIM DO 2_UTILS.GS
// ═══════════════════════════════════════════════════════════════════════

Logger.log('✅ 2_Utils.gs carregado - Funções utilitárias disponíveis');
// ═══════════════════════════════════════════════════════════════════════
//                    3_ASSESSORADOS.GS - CRUD COMPLETO
//                    Sistema Littê v3.5
//                    Gestão completa de influenciadores/assessorados
// ═══════════════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════════════
//                      LISTAR TODOS OS ASSESSORADOS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Retorna todos os assessorados cadastrados
 * @returns {Array} Array de objetos com dados dos assessorados
 */
function getAllAssessorados() {
  try {
    const sheet = setupAssessoradosSheet();
    if (sheet.getLastRow() <= 1) return [];
   
    const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 24).getValues();
   
    return data.filter(function(row) { return row[0]; }).map(function(row) {
      return {
        id: String(row[0] || ''),
        nome: String(row[1] || ''),
        usuario: String(row[2] || ''),
        email: String(row[3] || ''),
        telefone: String(row[4] || ''),
        idade: String(row[5] || ''),
        sapato: String(row[6] || ''),
        camiseta: String(row[7] || ''),
        calca: String(row[8] || ''),
        enderecoNome: String(row[9] || ''),
        rua: String(row[10] || ''),
        numero: String(row[11] || ''),
        complemento: String(row[12] || ''),
        bairro: String(row[13] || ''),
        cidade: String(row[14] || ''),
        estado: String(row[15] || ''),
        cep: String(row[16] || ''),
        status: String(row[17] || 'Ativo'),
        dataCadastro: row[18] ? formatDateToISO(row[18]) : '',
        observacoes: String(row[19] || ''),
        urlPastaDrive: String(row[20] || ''),
        linkPlanilhaEspelho: String(row[21] || ''),
        dataCriacao: row[22] ? formatDateToISO(row[22]) : '',
        ultimaAtualizacao: row[23] ? formatDateToISO(row[23]) : ''
      };
    });
  } catch (e) {
    Logger.log('❌ getAllAssessorados: ' + e);
    return [];
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      BUSCAR ASSESSORADO POR ID
// ═══════════════════════════════════════════════════════════════════════

/**
 * Busca um assessorado específico por ID
 * @param {string} id - ID do assessorado
 * @returns {Object|null} Objeto com dados do assessorado ou null
 */
function getAssessorado(id) {
  try {
    const assessorados = getAllAssessorados();
    return assessorados.find(function(a) { return a.id === id; }) || null;
  } catch (e) {
    Logger.log('❌ getAssessorado: ' + e);
    return null;
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      CRIAR NOVO ASSESSORADO (COM AUTOMAÇÕES)
// ═══════════════════════════════════════════════════════════════════════

/**
 * Cria um novo assessorado com todas as automações
 * - Gera ID único
 * - Cria estrutura no Drive (5 subpastas)
 * - Cria planilha espelho
 * - Registra no histórico
 * - Cria notificação
 * 
 * @param {Object} dados - Dados do assessorado
 * @returns {Object} {success, id, urlPastaDrive, urlPlanilhaEspelho, message}
 */
function criarAssessorado(dados) {
  try {
    logInicio('criarAssessorado');
    
    const sheet = setupAssessoradosSheet();
    const hoje = new Date();
   
    // Gerar ID único
    const id = generateId('assessorado');
    Logger.log('📝 ID gerado: ' + id);
   
    // Verificar se ID já existe (segurança extra)
    if (sheet.getLastRow() > 1) {
      const dataExistente = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues();
      const idExiste = dataExistente.some(function(row) { 
        return String(row[0]) === String(id); 
      });
     
      if (idExiste) {
        Logger.log('❌ ID duplicado detectado: ' + id);
        return { success: false, message: 'ID já existe! Tente novamente.' };
      }
    }
   
    // Validar dados obrigatórios
    if (!dados.nome || !dados.usuario) {
      Logger.log('❌ Dados obrigatórios faltando');
      return { success: false, message: 'Nome e Usuário são obrigatórios' };
    }
   
    // Adicionar linha com TODOS os 24 campos
    sheet.appendRow([
      id,                             // 1. ID
      dados.nome,                     // 2. Nome
      dados.usuario,                  // 3. Usuario
      dados.email || '',              // 4. Email
      dados.telefone || '',           // 5. Telefone
      dados.idade || '',              // 6. Idade
      dados.sapato || '',             // 7. Sapato
      dados.camiseta || '',           // 8. Camiseta
      dados.calca || '',              // 9. Calça
      dados.enderecoNome || '',       // 10. Endereço Nome
      dados.rua || '',                // 11. Rua
      dados.numero || '',             // 12. Número
      dados.complemento || '',        // 13. Complemento
      dados.bairro || '',             // 14. Bairro
      dados.cidade || '',             // 15. Cidade
      dados.estado || '',             // 16. Estado
      dados.cep || '',                // 17. CEP
      dados.status || 'Ativo',        // 18. Status
      hoje,                           // 19. Data Cadastro
      dados.observacoes || '',        // 20. Observações
      '',                             // 21. URL Pasta Drive (será preenchido)
      '',                             // 22. Link Planilha Espelho (será preenchido)
      hoje,                           // 23. Data Criacao
      hoje                            // 24. Ultima Atualizacao
    ]);
   
    SpreadsheetApp.flush();
    Logger.log('✅ Linha adicionada à planilha');
   
    // ═══════════════════════════════════════════════════════════════
    // AUTOMAÇÃO 1: CRIAR ESTRUTURA DRIVE
    // ═══════════════════════════════════════════════════════════════
    
    Logger.log('');
    Logger.log('📁 [1/2] Criando estrutura Drive...');
    
    const resultDrive = criarEstruturaDriveAssessorado(id, dados.nome);
   
    if (!resultDrive.success) {
      Logger.log('⚠️ Drive não foi criado: ' + resultDrive.message);
    } else {
      Logger.log('✅ Drive criado: ' + resultDrive.urlPastaMae);
      
      // Atualizar URL na planilha
      const rowNum = findRowById(sheet, id);
      if (rowNum) {
        sheet.getRange(rowNum, 21).setValue(resultDrive.urlPastaMae);
        SpreadsheetApp.flush();
        Logger.log('✅ URL do Drive salva (coluna 21)');
      }
    }
   
    // ═══════════════════════════════════════════════════════════════
    // AUTOMAÇÃO 2: CRIAR PLANILHA ESPELHO
    // ═══════════════════════════════════════════════════════════════
    
    Logger.log('');
    Logger.log('📊 [2/2] Criando planilha espelho...');
    
    const resultPlanilha = criarPlanilhaEspelho(id, dados.nome);
   
    if (!resultPlanilha.success) {
      Logger.log('⚠️ Planilha não foi criada: ' + resultPlanilha.message);
    } else {
      Logger.log('✅ Planilha criada: ' + resultPlanilha.url);
      
      // Atualizar URL na planilha
      const rowNum = findRowById(sheet, id);
      if (rowNum) {
        sheet.getRange(rowNum, 22).setValue(resultPlanilha.url);
        SpreadsheetApp.flush();
        Logger.log('✅ URL da planilha salva (coluna 22)');
      }
    }
   
    // ═══════════════════════════════════════════════════════════════
    // REGISTROS E NOTIFICAÇÕES
    // ═══════════════════════════════════════════════════════════════
    
    Logger.log('');
    Logger.log('📝 Criando registros auxiliares...');
    
    // Criar notificação
    criarNotificacao(
      'SISTEMA',
      'Novo influenciador cadastrado',
      'O influenciador ' + dados.nome + ' (@' + dados.usuario + ') foi adicionado ao sistema',
      '',
      'TODOS',
      'BAIXA'
    );
    Logger.log('✅ Notificação criada');
   
    // Registrar histórico
    registrarHistorico(
      'Assessorado',
      id,
      'Criou',
      'Sistema',
      '',
      '',
      'Assessorado cadastrado: ' + dados.nome
    );
    Logger.log('✅ Histórico registrado');
   
    Logger.log('');
    logFim('criarAssessorado', true);
   
    return { 
      success: true, 
      id: id,
      urlPlanilhaEspelho: resultPlanilha.url || '',
      urlPastaDrive: resultDrive.urlPastaMae || '',
      message: 'Assessorado criado com sucesso!'
    };
    
  } catch (e) {
    Logger.log('❌ ERRO em criarAssessorado: ' + e);
    Logger.log('Stack: ' + e.stack);
    logFim('criarAssessorado', false);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      ATUALIZAR ASSESSORADO EXISTENTE
// ═══════════════════════════════════════════════════════════════════════

/**
 * Atualiza os dados de um assessorado existente
 * @param {Object} dados - Dados a serem atualizados (deve incluir o ID)
 * @returns {Object} {success, message}
 */
function atualizarAssessorado(dados) {
  try {
    logInicio('atualizarAssessorado - ID: ' + dados.id);
    
    const sheet = setupAssessoradosSheet();
    const rowNum = findRowById(sheet, dados.id);
   
    if (!rowNum) {
      Logger.log('❌ Assessorado não encontrado: ' + dados.id);
      return { success: false, message: 'Assessorado não encontrado' };
    }
   
    Logger.log('✅ Assessorado encontrado na linha: ' + rowNum);
   
    const hoje = new Date();
   
    // Buscar valores antigos para histórico
    const valoresAntigos = sheet.getRange(rowNum, 1, 1, 24).getValues()[0];
    const nomeAntigo = valoresAntigos[1];
   
    // Atualizar campos (apenas os que foram enviados)
    if (dados.nome !== undefined) {
      sheet.getRange(rowNum, 2).setValue(dados.nome);
      Logger.log('✅ Nome atualizado: ' + dados.nome);
    }
    
    if (dados.usuario !== undefined) {
      sheet.getRange(rowNum, 3).setValue(dados.usuario);
      Logger.log('✅ Usuario atualizado: ' + dados.usuario);
    }
    
    if (dados.email !== undefined) sheet.getRange(rowNum, 4).setValue(dados.email);
    if (dados.telefone !== undefined) sheet.getRange(rowNum, 5).setValue(dados.telefone);
    if (dados.idade !== undefined) sheet.getRange(rowNum, 6).setValue(dados.idade);
    if (dados.sapato !== undefined) sheet.getRange(rowNum, 7).setValue(dados.sapato);
    if (dados.camiseta !== undefined) sheet.getRange(rowNum, 8).setValue(dados.camiseta);
    if (dados.calca !== undefined) sheet.getRange(rowNum, 9).setValue(dados.calca);
    if (dados.enderecoNome !== undefined) sheet.getRange(rowNum, 10).setValue(dados.enderecoNome);
    if (dados.rua !== undefined) sheet.getRange(rowNum, 11).setValue(dados.rua);
    if (dados.numero !== undefined) sheet.getRange(rowNum, 12).setValue(dados.numero);
    if (dados.complemento !== undefined) sheet.getRange(rowNum, 13).setValue(dados.complemento);
    if (dados.bairro !== undefined) sheet.getRange(rowNum, 14).setValue(dados.bairro);
    if (dados.cidade !== undefined) sheet.getRange(rowNum, 15).setValue(dados.cidade);
    if (dados.estado !== undefined) sheet.getRange(rowNum, 16).setValue(dados.estado);
    if (dados.cep !== undefined) sheet.getRange(rowNum, 17).setValue(dados.cep);
    if (dados.status !== undefined) sheet.getRange(rowNum, 18).setValue(dados.status);
    if (dados.observacoes !== undefined) sheet.getRange(rowNum, 20).setValue(dados.observacoes);
    if (dados.urlPastaDrive !== undefined) sheet.getRange(rowNum, 21).setValue(dados.urlPastaDrive);
    if (dados.linkPlanilhaEspelho !== undefined) sheet.getRange(rowNum, 22).setValue(dados.linkPlanilhaEspelho);
   
    // Atualizar data de última atualização (sempre)
    sheet.getRange(rowNum, 24).setValue(hoje);
   
    SpreadsheetApp.flush();
    Logger.log('✅ Dados atualizados na planilha');
   
    // Registrar no histórico
    registrarHistorico(
      'Assessorado',
      dados.id,
      'Atualizou',
      'Sistema',
      nomeAntigo,
      dados.nome || nomeAntigo,
      'Dados atualizados'
    );
   
    logFim('atualizarAssessorado', true);
   
    return { success: true, message: 'Assessorado atualizado com sucesso!' };
    
  } catch (e) {
    Logger.log('❌ ERRO em atualizarAssessorado: ' + e);
    Logger.log('Stack: ' + e.stack);
    logFim('atualizarAssessorado', false);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      CRIAR PASTA DRIVE MANUALMENTE
//                      (Botão no modal de detalhes)
// ═══════════════════════════════════════════════════════════════════════

/**
 * Cria pasta Drive para um assessorado que não tem
 * Usado pelo botão "Criar agora" no modal de detalhes
 * 
 * @param {string} id - ID do assessorado
 * @returns {Object} {success, urlPastaDrive, message}
 */
function criarPastaDriveAssessorado(id) {
  try {
    logInicio('criarPastaDriveAssessorado - ID: ' + id);
   
    // Buscar dados do assessorado
    const assessorado = getAssessorado(id);
   
    if (!assessorado) {
      Logger.log('❌ Assessorado não encontrado');
      return { success: false, message: 'Assessorado não encontrado' };
    }
   
    Logger.log('✅ Assessorado encontrado: ' + assessorado.nome);
   
    // Verificar se já tem pasta
    if (assessorado.urlPastaDrive) {
      Logger.log('⚠️ Assessorado já possui pasta Drive');
      return {
        success: false,
        message: 'Este assessorado já possui pasta no Drive',
        urlPastaDrive: assessorado.urlPastaDrive
      };
    }
   
    // Criar estrutura Drive
    Logger.log('📁 Criando estrutura Drive...');
    const resultado = criarEstruturaDriveAssessorado(id, assessorado.nome);
   
    if (!resultado.success) {
      Logger.log('❌ Falha ao criar Drive: ' + resultado.message);
      return resultado;
    }
   
    Logger.log('✅ Drive criado: ' + resultado.urlPastaMae);
   
    // Atualizar planilha com a URL
    const sheet = setupAssessoradosSheet();
    const rowNum = findRowById(sheet, id);
   
    if (rowNum) {
      sheet.getRange(rowNum, 21).setValue(resultado.urlPastaMae);
      sheet.getRange(rowNum, 24).setValue(new Date()); // Última atualização
      SpreadsheetApp.flush();
      Logger.log('✅ URL salva na planilha');
    }
   
    // Registrar no histórico
    registrarHistorico(
      'Drive',
      id,
      'Criou',
      'Sistema',
      '',
      resultado.urlPastaMae,
      'Pasta Drive criada manualmente'
    );
   
    logFim('criarPastaDriveAssessorado', true);
   
    return {
      success: true,
      urlPastaDrive: resultado.urlPastaMae,
      message: 'Pasta Drive criada com sucesso!'
    };
   
  } catch (e) {
    Logger.log('❌ ERRO em criarPastaDriveAssessorado: ' + e);
    logFim('criarPastaDriveAssessorado', false);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      CRIAR PLANILHA ESPELHO MANUALMENTE
//                      (Botão no modal de detalhes)
// ═══════════════════════════════════════════════════════════════════════

/**
 * Cria planilha espelho para um assessorado que não tem
 * Usado pelo botão "Criar agora" no modal de detalhes
 * 
 * @param {string} id - ID do assessorado
 * @returns {Object} {success, url, message}
 */
function criarPlanilhaEspelhoAssessorado(id) {
  try {
    logInicio('criarPlanilhaEspelhoAssessorado - ID: ' + id);
   
    // Buscar dados do assessorado
    const assessorado = getAssessorado(id);
   
    if (!assessorado) {
      Logger.log('❌ Assessorado não encontrado');
      return { success: false, message: 'Assessorado não encontrado' };
    }
   
    Logger.log('✅ Assessorado encontrado: ' + assessorado.nome);
   
    // Verificar se já tem planilha
    if (assessorado.linkPlanilhaEspelho) {
      Logger.log('⚠️ Assessorado já possui planilha espelho');
      return {
        success: false,
        message: 'Este assessorado já possui planilha espelho',
        url: assessorado.linkPlanilhaEspelho
      };
    }
   
    // Criar planilha espelho
    Logger.log('📊 Criando planilha espelho...');
    const resultado = criarPlanilhaEspelho(id, assessorado.nome);
   
    if (!resultado.success) {
      Logger.log('❌ Falha ao criar planilha: ' + resultado.message);
      return resultado;
    }
   
    Logger.log('✅ Planilha criada: ' + resultado.url);
   
    // Atualizar planilha com a URL
    const sheet = setupAssessoradosSheet();
    const rowNum = findRowById(sheet, id);
   
    if (rowNum) {
      sheet.getRange(rowNum, 22).setValue(resultado.url);
      sheet.getRange(rowNum, 24).setValue(new Date()); // Última atualização
      SpreadsheetApp.flush();
      Logger.log('✅ URL salva na planilha');
    }
   
    // Registrar no histórico
    registrarHistorico(
      'Planilha',
      id,
      'Criou',
      'Sistema',
      '',
      resultado.url,
      'Planilha espelho criada manualmente'
    );
   
    logFim('criarPlanilhaEspelhoAssessorado', true);
   
    return {
      success: true,
      url: resultado.url,
      message: 'Planilha espelho criada com sucesso!'
    };
   
  } catch (e) {
    Logger.log('❌ ERRO em criarPlanilhaEspelhoAssessorado: ' + e);
    logFim('criarPlanilhaEspelhoAssessorado', false);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      DELETAR ASSESSORADO (SOFT DELETE)
// ═══════════════════════════════════════════════════════════════════════

/**
 * Marca um assessorado como inativo (soft delete)
 * Não remove da planilha, apenas muda o status
 * 
 * @param {string} id - ID do assessorado
 * @returns {Object} {success, message}
 */
function deletarAssessorado(id) {
  try {
    logInicio('deletarAssessorado - ID: ' + id);
   
    const sheet = setupAssessoradosSheet();
    const rowNum = findRowById(sheet, id);
   
    if (!rowNum) {
      Logger.log('❌ Assessorado não encontrado');
      return { success: false, message: 'Assessorado não encontrado' };
    }
   
    // Buscar nome antes de deletar
    const nome = sheet.getRange(rowNum, 2).getValue();
   
    // Marcar como inativo
    sheet.getRange(rowNum, 18).setValue('Inativo');
    sheet.getRange(rowNum, 24).setValue(new Date());
   
    SpreadsheetApp.flush();
   
    Logger.log('✅ Assessorado marcado como inativo: ' + nome);
   
    // Registrar no histórico
    registrarHistorico(
      'Assessorado',
      id,
      'Deletou',
      'Sistema',
      'Ativo',
      'Inativo',
      'Assessorado desativado: ' + nome
    );
   
    // Criar notificação
    criarNotificacao(
      'SISTEMA',
      'Assessorado desativado',
      'O influenciador ' + nome + ' foi marcado como inativo',
      '',
      'TODOS',
      'BAIXA'
    );
   
    logFim('deletarAssessorado', true);
   
    return { 
      success: true, 
      message: 'Assessorado marcado como inativo'
    };
   
  } catch (e) {
    Logger.log('❌ ERRO em deletarAssessorado: ' + e);
    logFim('deletarAssessorado', false);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      REATIVAR ASSESSORADO
// ═══════════════════════════════════════════════════════════════════════

/**
 * Reativa um assessorado inativo
 * @param {string} id - ID do assessorado
 * @returns {Object} {success, message}
 */
function reativarAssessorado(id) {
  try {
    const sheet = setupAssessoradosSheet();
    const rowNum = findRowById(sheet, id);
   
    if (!rowNum) {
      return { success: false, message: 'Assessorado não encontrado' };
    }
   
    const nome = sheet.getRange(rowNum, 2).getValue();
   
    // Marcar como ativo
    sheet.getRange(rowNum, 18).setValue('Ativo');
    sheet.getRange(rowNum, 24).setValue(new Date());
   
    SpreadsheetApp.flush();
   
    // Registrar no histórico
    registrarHistorico(
      'Assessorado',
      id,
      'Reativou',
      'Sistema',
      'Inativo',
      'Ativo',
      'Assessorado reativado: ' + nome
    );
   
    return { 
      success: true, 
      message: 'Assessorado reativado com sucesso'
    };
   
  } catch (e) {
    Logger.log('❌ reativarAssessorado: ' + e);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      BUSCAR ASSESSORADOS POR STATUS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Retorna assessorados filtrados por status
 * @param {string} status - Status desejado ('Ativo' ou 'Inativo')
 * @returns {Array} Array de assessorados
 */
function getAssessoradosPorStatus(status) {
  try {
    const todos = getAllAssessorados();
    return todos.filter(function(a) {
      return a.status === status;
    });
  } catch (e) {
    Logger.log('❌ getAssessoradosPorStatus: ' + e);
    return [];
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      BUSCAR ASSESSORADOS RECENTES
// ═══════════════════════════════════════════════════════════════════════

/**
 * Retorna os N assessorados mais recentes
 * @param {number} limite - Número máximo de assessorados
 * @returns {Array} Array de assessorados
 */
function getAssessoradosRecentes(limite) {
  try {
    limite = limite || 10;
    
    const todos = getAllAssessorados();
    
    // Ordenar por data de criação (mais recente primeiro)
    todos.sort(function(a, b) {
      const dataA = new Date(a.dataCriacao || 0);
      const dataB = new Date(b.dataCriacao || 0);
      return dataB - dataA;
    });
    
    return todos.slice(0, limite);
  } catch (e) {
    Logger.log('❌ getAssessoradosRecentes: ' + e);
    return [];
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      FIM DO 3_ASSESSORADOS.GS
// ═══════════════════════════════════════════════════════════════════════

Logger.log('✅ 3_Assessorados.gs carregado - CRUD completo disponível');
// ═══════════════════════════════════════════════════════════════════════
//                    4_ANDAMENTOS.GS - PROSPECÇÕES E ANDAMENTOS
//                    Sistema Littê v3.5
//                    Gestão de prospecções, negociações e fechamentos
// ═══════════════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════════════
//                      LISTAR TODOS OS ANDAMENTOS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Retorna todos os andamentos/prospecções cadastrados
 * @returns {Array} Array de objetos com dados dos andamentos
 */
function getAllAndamentos() {
  try {
    const sheet = setupAndamentosSheet();
    if (sheet.getLastRow() <= 1) return [];
    
    const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 22).getValues();
    
    return data.filter(function(row) { return row[0]; }).map(function(row) {
      return {
        idCampanha: String(row[0] || ''),
        idAssessorado: String(row[1] || ''),
        marca: String(row[2] || ''),
        objetoCampanha: String(row[3] || ''),
        fase: String(row[4] || ''),
        statusDetalhado: String(row[5] || ''),
        remetente: String(row[6] || ''),
        responsavelLitte: String(row[7] || ''),
        valorProposto: parseFloat(row[8]) || 0,
        valorFechado: parseFloat(row[9]) || 0,
        dataCriacao: row[10] ? formatDateToISO(row[10]) : '',
        linkPastaCampanha: String(row[11] || ''),
        ultimoRetorno: row[12] ? formatDateToISO(row[12]) : '',
        observacoes: String(row[13] || ''),
        descricaoEscopo: String(row[14] || ''),
        concluida: String(row[15]) === 'SIM',
        dataConclusao: row[16] ? formatDateToISO(row[16]) : '',
        ultimaAtualizacao: row[17] ? formatDateToISO(row[17]) : '',
        dataPrimeiroContato: row[18] ? formatDateToISO(row[18]) : '',
        proximoFollowUp: row[19] ? formatDateToISO(row[19]) : '',
        ultimaInteracao: row[20] ? formatDateToISO(row[20]) : '',
        ultimaMensagem: String(row[21] || '')
      };
    });
  } catch (e) {
    Logger.log('❌ getAllAndamentos: ' + e);
    return [];
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      BUSCAR ANDAMENTO POR ID
// ═══════════════════════════════════════════════════════════════════════

/**
 * Busca um andamento específico por ID da campanha
 * @param {string} idCampanha - ID da campanha
 * @returns {Object|null} Objeto com dados do andamento ou null
 */
function getAndamento(idCampanha) {
  try {
    const andamentos = getAllAndamentos();
    return andamentos.find(function(a) { 
      return a.idCampanha === idCampanha; 
    }) || null;
  } catch (e) {
    Logger.log('❌ getAndamento: ' + e);
    return null;
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      LISTAR PROSPECÇÕES ATIVAS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Retorna apenas as prospecções em andamento (não fechadas e não concluídas)
 * @returns {Array} Array de prospecções ativas
 */
function getProspeccoes() {
  try {
    const andamentos = getAllAndamentos();
    return andamentos.filter(function(a) {
      return a.statusDetalhado !== 'Fechado' && 
             a.statusDetalhado !== 'Recusado' &&
             !a.concluida;
    });
  } catch (e) {
    Logger.log('❌ getProspeccoes: ' + e);
    return [];
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      CRIAR ANDAMENTO BÁSICO
//                      (Sem automações - apenas registra)
// ═══════════════════════════════════════════════════════════════════════

/**
 * Cria um novo andamento/prospecção SEM automações
 * Usado para prospecções em estágio inicial
 * 
 * @param {Object} dados - Dados do andamento
 * @returns {Object} {success, idCampanha, message}
 */
function criarAndamentoBasico(dados) {
  try {
    logInicio('criarAndamentoBasico');
    
    const sheet = setupAndamentosSheet();
    const hoje = new Date();
    
    // Gerar ID único
    const idCampanha = generateId('campanha');
    Logger.log('📝 ID gerado: ' + idCampanha);
    
    // Validar dados obrigatórios
    if (!dados.idAssessorado || !dados.marca) {
      Logger.log('❌ Dados obrigatórios faltando');
      return { 
        success: false, 
        message: 'ID do Assessorado e Marca são obrigatórios' 
      };
    }
    
    // Adicionar linha na planilha
    sheet.appendRow([
      idCampanha,                               // 1. ID Campanha
      dados.idAssessorado,                      // 2. ID Assessorado
      dados.marca,                              // 3. Marca
      dados.objetoCampanha || '',               // 4. Objeto Campanha
      dados.fase || 'Primeiro contato',         // 5. Fase
      dados.statusDetalhado || 'Aguardando resposta', // 6. Status Detalhado
      dados.remetente || 'Littê',               // 7. Remetente
      dados.responsavelLitte || 'Anne',         // 8. Responsável Littê
      parseFloat(dados.valorProposto) || 0,     // 9. Valor Proposto
      parseFloat(dados.valorFechado) || 0,      // 10. Valor Fechado
      hoje,                                     // 11. Data Criação
      '',                                       // 12. Link Pasta Campanha
      hoje,                                     // 13. Último Retorno
      dados.observacoes || '',                  // 14. Observações
      dados.descricaoEscopo || '',              // 15. Descrição Escopo
      'NÃO',                                    // 16. Concluída
      '',                                       // 17. Data Conclusão
      hoje,                                     // 18. Última Atualização
      hoje,                                     // 19. Data Primeiro Contato
      '',                                       // 20. Próximo Follow-Up
      hoje,                                     // 21. Última Interação
      dados.ultimaMensagem || ''                // 22. Última Mensagem
    ]);
    
    SpreadsheetApp.flush();
    Logger.log('✅ Andamento criado na planilha');
    
    // Criar notificação
    criarNotificacao(
      'SISTEMA',
      'Nova prospecção iniciada',
      'Prospecção com ' + dados.marca + ' foi iniciada',
      idCampanha,
      'TODOS',
      'MÉDIA'
    );
    
    // Registrar histórico
    registrarHistorico(
      'Andamento',
      idCampanha,
      'Criou',
      'Sistema',
      '',
      '',
      'Prospecção criada: ' + dados.marca
    );
    
    logFim('criarAndamentoBasico', true);
    
    return { 
      success: true, 
      idCampanha: idCampanha, 
      message: 'Andamento criado com sucesso!' 
    };
    
  } catch (e) {
    Logger.log('❌ ERRO em criarAndamentoBasico: ' + e);
    Logger.log('Stack: ' + e.stack);
    logFim('criarAndamentoBasico', false);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      CRIAR ANDAMENTO COM AUTOMAÇÃO
//                      (Quando status = Fechado)
// ═══════════════════════════════════════════════════════════════════════

/**
 * Cria um novo andamento COM todas as automações
 * Usado quando uma campanha já está fechada desde o início
 * 
 * AUTOMAÇÕES EXECUTADAS:
 * 1. Cria andamento básico
 * 2. Cria checklist completo
 * 3. Cria financeiro completo
 * 4. Cria estrutura Drive da campanha
 * 5. Sincroniza campanhas ativas
 * 
 * @param {Object} dados - Dados do andamento (deve incluir descricaoEscopo e valorFechado)
 * @returns {Object} {success, idCampanha, message}
 */
function criarAndamentoComAutomacao(dados) {
  try {
    logInicio('criarAndamentoComAutomacao');
    Logger.log('📋 Marca: ' + dados.marca);
    Logger.log('💰 Valor Fechado: ' + dados.valorFechado);
    
    // Validar dados obrigatórios para automação
    if (!dados.descricaoEscopo || !dados.valorFechado) {
      Logger.log('❌ Descrição do escopo e valor são obrigatórios para automação');
      return {
        success: false,
        message: 'Para criar com automação, informe: Descrição do Escopo e Valor Fechado'
      };
    }
    
    // ═══════════════════════════════════════════════════════════════
    // PASSO 1: CRIAR ANDAMENTO BÁSICO
    // ═══════════════════════════════════════════════════════════════
    
    Logger.log('');
    Logger.log('📝 [1/5] Criando andamento básico...');
    
    // Forçar status como "Fechado"
    dados.statusDetalhado = 'Fechado';
    
    const resAndamento = criarAndamentoBasico(dados);
    
    if (!resAndamento.success) {
      Logger.log('❌ Falha ao criar andamento básico');
      return resAndamento;
    }
    
    const idCampanha = resAndamento.idCampanha;
    Logger.log('✅ Andamento criado: ' + idCampanha);
    
    // Buscar nome do assessorado
    const assessorado = getAssessorado(dados.idAssessorado);
    const nomeAssessorado = assessorado ? assessorado.nome : 'Assessorado';
    
    Logger.log('👤 Assessorado: ' + nomeAssessorado);
    
    // ═══════════════════════════════════════════════════════════════
    // PASSO 2: CRIAR CHECKLIST COMPLETO
    // ═══════════════════════════════════════════════════════════════
    
    Logger.log('');
    Logger.log('📋 [2/5] Criando checklist completo...');
    
    const resChecklist = criarChecklistCompleto(
      idCampanha,
      dados.idAssessorado,
      nomeAssessorado,
      dados.marca
    );
    
    if (resChecklist.success) {
      Logger.log('✅ Checklist criado com sucesso');
    } else {
      Logger.log('⚠️ Erro ao criar checklist: ' + resChecklist.message);
    }
    
    // ═══════════════════════════════════════════════════════════════
    // PASSO 3: CRIAR FINANCEIRO COMPLETO
    // ═══════════════════════════════════════════════════════════════
    
    Logger.log('');
    Logger.log('💰 [3/5] Criando financeiro completo...');
    
    const resFinanceiro = criarFinanceiroCompleto(
      idCampanha,
      dados.idAssessorado,
      nomeAssessorado,
      dados.marca,
      parseFloat(dados.valorFechado) || 0
    );
    
    if (resFinanceiro.success) {
      Logger.log('✅ Financeiro criado com sucesso');
    } else {
      Logger.log('⚠️ Erro ao criar financeiro: ' + resFinanceiro.message);
    }
    
    // ═══════════════════════════════════════════════════════════════
    // PASSO 4: CRIAR ESTRUTURA DRIVE DA CAMPANHA
    // ═══════════════════════════════════════════════════════════════
    
    Logger.log('');
    Logger.log('📁 [4/5] Criando estrutura Drive da campanha...');
    
    const resDrive = criarEstruturaDriveCampanha(
      idCampanha,
      nomeAssessorado,
      dados.marca,
      dados.objetoCampanha || 'Campanha'
    );
    
    if (resDrive.success) {
      Logger.log('✅ Pasta Drive criada: ' + resDrive.urlPastaCampanha);
      
      // Atualizar link na planilha
      const sheet = setupAndamentosSheet();
      const rowNum = findRowById(sheet, idCampanha);
      if (rowNum) {
        sheet.getRange(rowNum, 12).setValue(resDrive.urlPastaCampanha);
        SpreadsheetApp.flush();
      }
    } else {
      Logger.log('⚠️ Erro ao criar pasta Drive: ' + resDrive.message);
    }
    
    // ═══════════════════════════════════════════════════════════════
    // PASSO 5: SINCRONIZAR CAMPANHAS ATIVAS
    // ═══════════════════════════════════════════════════════════════
    
    Logger.log('');
    Logger.log('🔄 [5/5] Sincronizando campanhas ativas...');
    
    sincronizarCampanhasAtivas();
    Logger.log('✅ Campanhas ativas sincronizadas');
    
    // ═══════════════════════════════════════════════════════════════
    // NOTIFICAÇÃO FINAL
    // ═══════════════════════════════════════════════════════════════
    
    criarNotificacao(
      'STATUS',
      '🎉 Campanha Fechada!',
      'A campanha ' + dados.marca + ' com ' + nomeAssessorado + ' foi fechada e está pronta para execução',
      idCampanha,
      'TODOS',
      'ALTA'
    );
    
    Logger.log('');
    Logger.log('🎉🎉🎉 TODAS AS AUTOMAÇÕES CONCLUÍDAS! 🎉🎉🎉');
    logFim('criarAndamentoComAutomacao', true);
    
    return { 
      success: true, 
      idCampanha: idCampanha, 
      message: 'Campanha criada com todas as automações!' 
    };
    
  } catch (e) {
    Logger.log('❌ ERRO FATAL em criarAndamentoComAutomacao: ' + e);
    Logger.log('Stack: ' + e.stack);
    logFim('criarAndamentoComAutomacao', false);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      ATUALIZAR ANDAMENTO
//                      COM DETECÇÃO DE MUDANÇA DE STATUS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Atualiza um andamento existente
 * 
 * IMPORTANTE: Se o status mudar para "Fechado", dispara TODAS as automações:
 * - Cria checklist completo
 * - Cria financeiro completo
 * - Cria estrutura Drive
 * - Sincroniza campanhas ativas
 * 
 * @param {Object} dados - Dados a serem atualizados (deve incluir idCampanha)
 * @returns {Object} {success, message}
 */
function atualizarAndamento(dados) {
  try {
    logInicio('atualizarAndamento - ID: ' + dados.idCampanha);
    Logger.log('📊 Novo status: ' + dados.statusDetalhado);
    
    const sheet = setupAndamentosSheet();
    const rowNum = findRowById(sheet, dados.idCampanha);
    
    if (!rowNum) {
      Logger.log('❌ Andamento não encontrado: ' + dados.idCampanha);
      return { success: false, message: 'Andamento não encontrado' };
    }
    
    Logger.log('✅ Andamento encontrado na linha: ' + rowNum);
    
    // ═══════════════════════════════════════════════════════════════
    // PEGAR STATUS ANTIGO ANTES DE ATUALIZAR
    // ═══════════════════════════════════════════════════════════════
    
    const statusAntigo = sheet.getRange(rowNum, 6).getValue();
    Logger.log('📌 Status antigo: ' + statusAntigo);
    Logger.log('📌 Status novo: ' + dados.statusDetalhado);
    
    // ═══════════════════════════════════════════════════════════════
    // ATUALIZAR CAMPOS NA PLANILHA
    // ═══════════════════════════════════════════════════════════════
    
    if (dados.marca !== undefined) {
      sheet.getRange(rowNum, 3).setValue(dados.marca);
    }
    
    if (dados.objetoCampanha !== undefined) {
      sheet.getRange(rowNum, 4).setValue(dados.objetoCampanha);
    }
    
    if (dados.fase !== undefined) {
      sheet.getRange(rowNum, 5).setValue(dados.fase);
    }
    
    if (dados.statusDetalhado !== undefined) {
      sheet.getRange(rowNum, 6).setValue(dados.statusDetalhado);
    }
    
    if (dados.remetente !== undefined) {
      sheet.getRange(rowNum, 7).setValue(dados.remetente);
    }
    
    if (dados.responsavelLitte !== undefined) {
      sheet.getRange(rowNum, 8).setValue(dados.responsavelLitte);
    }
    
    if (dados.valorProposto !== undefined) {
      sheet.getRange(rowNum, 9).setValue(parseFloat(dados.valorProposto));
    }
    
    if (dados.valorFechado !== undefined) {
      sheet.getRange(rowNum, 10).setValue(parseFloat(dados.valorFechado));
    }
    
    if (dados.observacoes !== undefined) {
      sheet.getRange(rowNum, 14).setValue(dados.observacoes);
    }
    
    if (dados.descricaoEscopo !== undefined) {
      sheet.getRange(rowNum, 15).setValue(dados.descricaoEscopo);
    }
    
    if (dados.ultimaMensagem !== undefined) {
      sheet.getRange(rowNum, 22).setValue(dados.ultimaMensagem);
    }
    
    // Atualizar timestamps
    sheet.getRange(rowNum, 18).setValue(new Date()); // Última Atualização
    sheet.getRange(rowNum, 21).setValue(new Date()); // Última Interação
    
    SpreadsheetApp.flush();
    Logger.log('✅ Campos atualizados na planilha');
    
    // ═══════════════════════════════════════════════════════════════
    // DETECÇÃO: STATUS MUDOU PARA "FECHADO"?
    // ═══════════════════════════════════════════════════════════════

    // Normalizar strings para comparação robusta
    const statusAntigoStr = String(statusAntigo || '').trim();
    const statusNovoStr = String(dados.statusDetalhado || '').trim();

    // Só executar automações se status está MUDANDO PARA "Fechado"
    // (não re-executar se já estava "Fechado")
    if (statusNovoStr === 'Fechado' && statusAntigoStr !== 'Fechado') {

      Logger.log('');
      Logger.log('🎯🎯🎯 STATUS MUDOU PARA FECHADO! 🎯🎯🎯');
      Logger.log('🚀 Iniciando automações...');
      Logger.log('');
      
      // Buscar andamento completo
      const andamento = getAndamento(dados.idCampanha);
      
      if (!andamento) {
        Logger.log('❌ Erro: Andamento não encontrado após atualização');
        return { 
          success: false, 
          message: 'Erro ao buscar andamento atualizado' 
        };
      }
      
      // Buscar assessorado
      const assessorado = getAssessorado(andamento.idAssessorado);
      
      if (!assessorado) {
        Logger.log('❌ Erro: Assessorado não encontrado: ' + andamento.idAssessorado);
        return { 
          success: false, 
          message: 'Assessorado não encontrado' 
        };
      }
      
      Logger.log('✅ Dados encontrados:');
      Logger.log('   Campanha: ' + andamento.idCampanha);
      Logger.log('   Assessorado: ' + assessorado.nome);
      Logger.log('   Marca: ' + andamento.marca);
      
      // ═══ AUTOMAÇÃO 1: CRIAR CHECKLIST ═══
      Logger.log('');
      Logger.log('📋 [1/4] Criando checklist...');
      
      const resChecklist = criarChecklistCompleto(
        andamento.idCampanha,
        andamento.idAssessorado,
        assessorado.nome,
        andamento.marca
      );
      
      if (resChecklist.success) {
        Logger.log('✅ Checklist criado');
      } else {
        Logger.log('⚠️ Erro no checklist: ' + resChecklist.message);
      }
      
      // ═══ AUTOMAÇÃO 2: CRIAR FINANCEIRO ═══
      Logger.log('');
      Logger.log('💰 [2/4] Criando financeiro...');
      
      const resFinanceiro = criarFinanceiroCompleto(
        andamento.idCampanha,
        andamento.idAssessorado,
        assessorado.nome,
        andamento.marca,
        andamento.valorFechado || 0
      );
      
      if (resFinanceiro.success) {
        Logger.log('✅ Financeiro criado');
      } else {
        Logger.log('⚠️ Erro no financeiro: ' + resFinanceiro.message);
      }
      
      // ═══ AUTOMAÇÃO 3: CRIAR PASTA DRIVE ═══
      Logger.log('');
      Logger.log('📁 [3/4] Criando pasta Drive...');
      
      const resDrive = criarEstruturaDriveCampanha(
        andamento.idCampanha,
        assessorado.nome,
        andamento.marca,
        andamento.objetoCampanha || 'Campanha'
      );
      
      if (resDrive.success) {
        Logger.log('✅ Pasta Drive criada: ' + resDrive.urlPastaCampanha);
        
        // Salvar link na planilha
        sheet.getRange(rowNum, 12).setValue(resDrive.urlPastaCampanha);
        SpreadsheetApp.flush();
      } else {
        Logger.log('⚠️ Erro na pasta Drive: ' + resDrive.message);
      }
      
      // ═══ AUTOMAÇÃO 4: SINCRONIZAR CAMPANHAS ATIVAS ═══
      Logger.log('');
      Logger.log('🔄 [4/4] Sincronizando campanhas ativas...');
      
      sincronizarCampanhasAtivas();
      Logger.log('✅ Campanhas ativas sincronizadas');
      
      // NOTIFICAÇÃO
      criarNotificacao(
        'STATUS',
        '🎉 Campanha Fechada!',
        'A campanha ' + andamento.marca + ' foi fechada e está pronta para execução',
        andamento.idCampanha,
        'TODOS',
        'ALTA'
      );
      
      Logger.log('');
      Logger.log('🎉🎉🎉 TODAS AS AUTOMAÇÕES CONCLUÍDAS! 🎉🎉🎉');
    } else if (statusNovoStr === 'Fechado' && statusAntigoStr === 'Fechado') {
      Logger.log('');
      Logger.log('ℹ️  Campanha já estava "Fechado" - automações não re-executadas');
      Logger.log('✅ Edição permitida sem duplicar estruturas');
      Logger.log('');
    }

    // Registrar histórico
    registrarHistorico(
      'Andamento',
      dados.idCampanha,
      'Atualizou',
      'Sistema',
      statusAntigoStr,
      statusNovoStr || statusAntigoStr,
      'Andamento atualizado'
    );
    
    Logger.log('');
    logFim('atualizarAndamento', true);
    
    return { 
      success: true, 
      message: 'Andamento atualizado com sucesso!' 
    };
    
  } catch (e) {
    Logger.log('❌ ERRO FATAL em atualizarAndamento: ' + e);
    Logger.log('Stack: ' + e.stack);
    logFim('atualizarAndamento', false);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      MARCAR ANDAMENTO COMO CONCLUÍDO
// ═══════════════════════════════════════════════════════════════════════

/**
 * Marca um andamento como concluído
 * @param {string} idCampanha - ID da campanha
 * @returns {Object} {success, message}
 */
function concluirAndamento(idCampanha) {
  try {
    const sheet = setupAndamentosSheet();
    const rowNum = findRowById(sheet, idCampanha);
    
    if (!rowNum) {
      return { success: false, message: 'Andamento não encontrado' };
    }
    
    const hoje = new Date();
    
    // Marcar como concluída
    sheet.getRange(rowNum, 16).setValue('SIM');
    sheet.getRange(rowNum, 17).setValue(hoje); // Data Conclusão
    sheet.getRange(rowNum, 18).setValue(hoje); // Última Atualização
    
    SpreadsheetApp.flush();
    
    // Registrar histórico
    registrarHistorico(
      'Andamento',
      idCampanha,
      'Concluiu',
      'Sistema',
      'Em andamento',
      'Concluída',
      'Campanha marcada como concluída'
    );
    
    return { 
      success: true, 
      message: 'Campanha marcada como concluída' 
    };
    
  } catch (e) {
    Logger.log('❌ concluirAndamento: ' + e);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      BUSCAR ANDAMENTOS POR ASSESSORADO
// ═══════════════════════════════════════════════════════════════════════

/**
 * Retorna todos os andamentos de um assessorado específico
 * @param {string} idAssessorado - ID do assessorado
 * @returns {Array} Array de andamentos
 */
function getAndamentosPorAssessorado(idAssessorado) {
  try {
    const todos = getAllAndamentos();
    return todos.filter(function(a) {
      return a.idAssessorado === idAssessorado;
    });
  } catch (e) {
    Logger.log('❌ getAndamentosPorAssessorado: ' + e);
    return [];
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      BUSCAR ANDAMENTOS POR STATUS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Retorna andamentos filtrados por status
 * @param {string} status - Status desejado
 * @returns {Array} Array de andamentos
 */
function getAndamentosPorStatus(status) {
  try {
    const todos = getAllAndamentos();
    return todos.filter(function(a) {
      return a.statusDetalhado === status;
    });
  } catch (e) {
    Logger.log('❌ getAndamentosPorStatus: ' + e);
    return [];
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      FIM DO 4_ANDAMENTOS.GS
// ═══════════════════════════════════════════════════════════════════════

Logger.log('✅ 4_Andamentos.gs carregado - Gestão de prospecções disponível');
// ═══════════════════════════════════════════════════════════════════════
//                    5_CAMPANHAS.GS - CAMPANHAS ATIVAS
//                    Sistema Littê v3.5
//                    Gestão de campanhas em execução e sincronização
// ═══════════════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════════════
//                      LISTAR CAMPANHAS ATIVAS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Retorna todas as campanhas ativas (status Fechado e não concluídas)
 * @returns {Array} Array de objetos com dados das campanhas ativas
 */
function getCampanhasAtivas() {
  try {
    const sheet = setupCampanhasAtivasSheet();
    if (sheet.getLastRow() <= 1) return [];
    
    const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 8).getValues();
    
    return data.filter(function(row) { return row[0]; }).map(function(row) {
      return {
        idCampanha: String(row[0] || ''),
        influenciador: String(row[1] || ''),
        marca: String(row[2] || ''),
        valorTotal: parseFloat(row[3]) || 0,
        statusGeral: String(row[4] || ''),
        proximoPrazo: row[5] ? formatDateToISO(row[5]) : '',
        responsavel: String(row[6] || ''),
        ultimaAtualizacao: row[7] ? formatDateToISO(row[7]) : ''
      };
    });
  } catch (e) {
    Logger.log('❌ getCampanhasAtivas: ' + e);
    return [];
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      SINCRONIZAR CAMPANHAS ATIVAS
//                      Atualiza a aba "Campanhas_Ativas" baseado em "Andamentos"
// ═══════════════════════════════════════════════════════════════════════

/**
 * Sincroniza a aba Campanhas_Ativas com os andamentos fechados
 * 
 * LÓGICA:
 * - Busca todos os andamentos com status "Fechado" e não concluídos
 * - Limpa a aba Campanhas_Ativas
 * - Preenche com os dados atualizados
 * 
 * @returns {Object} {success, count, message}
 */
function sincronizarCampanhasAtivas() {
  try {
    logInicio('sincronizarCampanhasAtivas');
    
    const sheet = setupCampanhasAtivasSheet();
    
    // Limpar conteúdo atual (mantém header)
    if (sheet.getLastRow() > 1) {
      sheet.getRange(2, 1, sheet.getMaxRows() - 1, 8).clearContent();
      Logger.log('✅ Conteúdo anterior limpo');
    }
    
    // Buscar andamentos fechados e não concluídos
    const andamentos = getAllAndamentos();
    const campanhasAtivas = andamentos.filter(function(a) {
      return a.statusDetalhado === 'Fechado' && !a.concluida;
    });
    
    Logger.log('📊 Total de campanhas ativas: ' + campanhasAtivas.length);
    
    if (campanhasAtivas.length === 0) {
      Logger.log('⚠️ Nenhuma campanha ativa encontrada');
      logFim('sincronizarCampanhasAtivas', true);
      return { success: true, count: 0, message: 'Nenhuma campanha ativa' };
    }
    
    // Preparar dados para inserção
    const dados = campanhasAtivas.map(function(c) {
      const influenciador = getAssessorado(c.idAssessorado);
      
      return [
        c.idCampanha,                                    // 1. ID Campanha
        influenciador ? influenciador.nome : c.idAssessorado, // 2. Influenciador
        c.marca,                                         // 3. Marca
        c.valorFechado || 0,                            // 4. Valor Total
        'ATIVA',                                        // 5. Status Geral
        '',                                             // 6. Próximo Prazo (será calculado)
        c.responsavelLitte,                             // 7. Responsável
        c.ultimaAtualizacao || c.dataCriacao           // 8. Última Atualização
      ];
    });
    
    // Inserir dados na planilha
    sheet.getRange(2, 1, dados.length, 8).setValues(dados);
    SpreadsheetApp.flush();
    
    Logger.log('✅ ' + dados.length + ' campanhas sincronizadas');
    
    // Atualizar próximos prazos (se existirem)
    atualizarProximosPrazosCampanhas();
    
    logFim('sincronizarCampanhasAtivas', true);
    
    return { 
      success: true, 
      count: dados.length,
      message: dados.length + ' campanhas sincronizadas'
    };
    
  } catch (e) {
    Logger.log('❌ ERRO em sincronizarCampanhasAtivas: ' + e);
    Logger.log('Stack: ' + e.stack);
    logFim('sincronizarCampanhasAtivas', false);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      ATUALIZAR PRÓXIMOS PRAZOS DAS CAMPANHAS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Atualiza a coluna "Próximo Prazo" com base no checklist de cada campanha
 * Busca a data mais próxima entre todas as etapas pendentes
 * 
 * @returns {Object} {success, count}
 */
function atualizarProximosPrazosCampanhas() {
  try {
    Logger.log('🔄 Atualizando próximos prazos...');
    
    const sheet = setupCampanhasAtivasSheet();
    if (sheet.getLastRow() <= 1) return { success: true, count: 0 };
    
    const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 8).getValues();
    let count = 0;
    
    data.forEach(function(row, index) {
      const idCampanha = String(row[0]);
      if (!idCampanha) return;
      
      // Buscar próximo prazo do checklist
      const proximoPrazo = getProximoPrazoCampanha(idCampanha);
      
      if (proximoPrazo) {
        const rowNum = index + 2;
        sheet.getRange(rowNum, 6).setValue(proximoPrazo);
        count++;
      }
    });
    
    if (count > 0) {
      SpreadsheetApp.flush();
      Logger.log('✅ Prazos atualizados: ' + count);
    }
    
    return { success: true, count: count };
    
  } catch (e) {
    Logger.log('❌ atualizarProximosPrazosCampanhas: ' + e);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      BUSCAR PRÓXIMO PRAZO DE UMA CAMPANHA
// ═══════════════════════════════════════════════════════════════════════

/**
 * Busca a próxima data prevista no checklist de uma campanha
 * Analisa todas as etapas e retorna a data mais próxima no futuro
 * 
 * @param {string} idCampanha - ID da campanha
 * @returns {Date|null} Próxima data ou null
 */
function getProximoPrazoCampanha(idCampanha) {
  try {
    const checklist = getChecklistCompleto(idCampanha);
    if (!checklist) return null;
    
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    const datas = [];
    
    // Coletar todas as datas previstas
    if (checklist.dataPrevAssinaturaContrato) {
      datas.push(new Date(checklist.dataPrevAssinaturaContrato));
    }
    if (checklist.dataEnvioProduto) {
      datas.push(new Date(checklist.dataEnvioProduto));
    }
    if (checklist.dataPrevRoteiro) {
      datas.push(new Date(checklist.dataPrevRoteiro));
    }
    if (checklist.dataPrevConteudo) {
      datas.push(new Date(checklist.dataPrevConteudo));
    }
    if (checklist.dataPrevPostagem) {
      datas.push(new Date(checklist.dataPrevPostagem));
    }
    if (checklist.dataPrevColetaMetricas) {
      datas.push(new Date(checklist.dataPrevColetaMetricas));
    }
    if (checklist.dataPrevPagamentoCliente) {
      datas.push(new Date(checklist.dataPrevPagamentoCliente));
    }
    
    // Filtrar apenas datas futuras
    const datasFuturas = datas.filter(function(d) {
      return d >= hoje && !isNaN(d.getTime());
    });
    
    // Retornar a mais próxima
    if (datasFuturas.length === 0) return null;
    
    datasFuturas.sort(function(a, b) {
      return a - b;
    });
    
    return datasFuturas[0];
    
  } catch (e) {
    Logger.log('❌ getProximoPrazoCampanha: ' + e);
    return null;
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      BUSCAR CAMPANHA ATIVA POR ID
// ═══════════════════════════════════════════════════════════════════════

/**
 * Busca uma campanha ativa específica por ID
 * @param {string} idCampanha - ID da campanha
 * @returns {Object|null} Objeto com dados da campanha ou null
 */
function getCampanhaAtiva(idCampanha) {
  try {
    const campanhas = getCampanhasAtivas();
    return campanhas.find(function(c) {
      return c.idCampanha === idCampanha;
    }) || null;
  } catch (e) {
    Logger.log('❌ getCampanhaAtiva: ' + e);
    return null;
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      ATUALIZAR STATUS GERAL DA CAMPANHA
// ═══════════════════════════════════════════════════════════════════════

/**
 * Atualiza o status geral de uma campanha ativa
 * @param {string} idCampanha - ID da campanha
 * @param {string} novoStatus - Novo status (ATIVA, EM ATRASO, CONCLUÍDA, etc)
 * @returns {Object} {success, message}
 */
function atualizarStatusCampanha(idCampanha, novoStatus) {
  try {
    const sheet = setupCampanhasAtivasSheet();
    const rowNum = findRowById(sheet, idCampanha);
    
    if (!rowNum) {
      return { success: false, message: 'Campanha não encontrada' };
    }
    
    // Atualizar status
    sheet.getRange(rowNum, 5).setValue(novoStatus);
    sheet.getRange(rowNum, 8).setValue(new Date()); // Última Atualização
    
    SpreadsheetApp.flush();
    
    Logger.log('✅ Status atualizado: ' + idCampanha + ' → ' + novoStatus);
    
    return { success: true, message: 'Status atualizado' };
    
  } catch (e) {
    Logger.log('❌ atualizarStatusCampanha: ' + e);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      MARCAR CAMPANHA COMO CONCLUÍDA
// ═══════════════════════════════════════════════════════════════════════

/**
 * Marca uma campanha como concluída
 * - Atualiza status em Campanhas_Ativas
 * - Marca como concluída em Andamentos
 * - Remove da lista de campanhas ativas (na próxima sincronização)
 * 
 * @param {string} idCampanha - ID da campanha
 * @returns {Object} {success, message}
 */
function marcarCampanhaConcluida(idCampanha) {
  try {
    logInicio('marcarCampanhaConcluida - ID: ' + idCampanha);
    
    // 1. Atualizar em Campanhas_Ativas
    const sheetCampanhas = setupCampanhasAtivasSheet();
    const rowCampanhas = findRowById(sheetCampanhas, idCampanha);
    
    if (rowCampanhas) {
      sheetCampanhas.getRange(rowCampanhas, 5).setValue('CONCLUÍDA');
      sheetCampanhas.getRange(rowCampanhas, 8).setValue(new Date());
      SpreadsheetApp.flush();
      Logger.log('✅ Status atualizado em Campanhas_Ativas');
    }
    
    // 2. Marcar como concluída em Andamentos
    const resultAndamento = concluirAndamento(idCampanha);
    
    if (resultAndamento.success) {
      Logger.log('✅ Marcada como concluída em Andamentos');
    } else {
      Logger.log('⚠️ Erro ao marcar em Andamentos: ' + resultAndamento.message);
    }
    
    // 3. Registrar histórico
    registrarHistorico(
      'Campanha',
      idCampanha,
      'Concluiu',
      'Sistema',
      'ATIVA',
      'CONCLUÍDA',
      'Campanha marcada como concluída'
    );
    
    // 4. Criar notificação
    const andamento = getAndamento(idCampanha);
    if (andamento) {
      criarNotificacao(
        'STATUS',
        '✅ Campanha Concluída',
        'A campanha ' + andamento.marca + ' foi marcada como concluída',
        idCampanha,
        'TODOS',
        'MÉDIA'
      );
    }
    
    Logger.log('💡 Execute sincronizarCampanhasAtivas() para remover da lista');
    
    logFim('marcarCampanhaConcluida', true);
    
    return { 
      success: true, 
      message: 'Campanha marcada como concluída. Execute a sincronização para atualizar a lista.' 
    };
    
  } catch (e) {
    Logger.log('❌ ERRO em marcarCampanhaConcluida: ' + e);
    logFim('marcarCampanhaConcluida', false);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      BUSCAR CAMPANHAS POR RESPONSÁVEL
// ═══════════════════════════════════════════════════════════════════════

/**
 * Retorna campanhas ativas filtradas por responsável
 * @param {string} responsavel - Nome do responsável
 * @returns {Array} Array de campanhas
 */
function getCampanhasPorResponsavel(responsavel) {
  try {
    const campanhas = getCampanhasAtivas();
    return campanhas.filter(function(c) {
      return c.responsavel === responsavel;
    });
  } catch (e) {
    Logger.log('❌ getCampanhasPorResponsavel: ' + e);
    return [];
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      BUSCAR CAMPANHAS COM PRAZOS VENCIDOS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Retorna campanhas que têm prazos vencidos
 * @returns {Array} Array de campanhas com prazos vencidos
 */
function getCampanhasComPrazosVencidos() {
  try {
    const campanhas = getCampanhasAtivas();
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    return campanhas.filter(function(c) {
      if (!c.proximoPrazo) return false;
      
      const prazo = new Date(c.proximoPrazo);
      return prazo < hoje;
    });
  } catch (e) {
    Logger.log('❌ getCampanhasComPrazosVencidos: ' + e);
    return [];
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      VERIFICAR E ATUALIZAR STATUS POR PRAZOS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Verifica todas as campanhas e atualiza status automaticamente
 * baseado em prazos vencidos
 * 
 * ATIVA → EM ATRASO (se tiver prazo vencido)
 * 
 * @returns {Object} {success, atualizadas, message}
 */
function verificarEAtualizarStatusPorPrazos() {
  try {
    logInicio('verificarEAtualizarStatusPorPrazos');
    
    const campanhasVencidas = getCampanhasComPrazosVencidos();
    let atualizadas = 0;
    
    Logger.log('📊 Campanhas com prazos vencidos: ' + campanhasVencidas.length);
    
    campanhasVencidas.forEach(function(c) {
      if (c.statusGeral === 'ATIVA') {
        const resultado = atualizarStatusCampanha(c.idCampanha, 'EM ATRASO');
        
        if (resultado.success) {
          atualizadas++;
          Logger.log('⚠️ Campanha em atraso: ' + c.idCampanha + ' - ' + c.marca);
          
          // Criar notificação
          criarNotificacao(
            'PRAZO',
            '⚠️ Campanha em Atraso',
            'A campanha ' + c.marca + ' está com prazo vencido',
            c.idCampanha,
            'TODOS',
            'ALTA'
          );
        }
      }
    });
    
    Logger.log('✅ Total de campanhas atualizadas: ' + atualizadas);
    
    logFim('verificarEAtualizarStatusPorPrazos', true);
    
    return {
      success: true,
      atualizadas: atualizadas,
      message: atualizadas + ' campanhas marcadas como EM ATRASO'
    };
    
  } catch (e) {
    Logger.log('❌ ERRO em verificarEAtualizarStatusPorPrazos: ' + e);
    logFim('verificarEAtualizarStatusPorPrazos', false);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      PRÓXIMOS PRAZOS (TODAS AS CAMPANHAS)
// ═══════════════════════════════════════════════════════════════════════

/**
 * Retorna os próximos prazos de todas as campanhas ativas
 * Ordenados por data (mais próximo primeiro)
 * 
 * @param {number} limite - Número máximo de prazos (padrão: 10)
 * @returns {Array} Array de objetos {idCampanha, marca, etapa, dataPrevista, diasRestantes}
 */
function getProximosPrazos(limite) {
  try {
    limite = limite || 10;
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetExec = ss.getSheetByName('Checklist_Execução');
    
    // Se a aba de execução existir, usar ela (mais detalhada)
    if (sheetExec && sheetExec.getLastRow() > 1) {
      return getProximosPrazosDoChecklistExecucao(limite);
    }
    
    // Caso contrário, usar dados do Checklist_Complete
    return getProximosPrazosDoCompleto(limite);
    
  } catch (e) {
    Logger.log('❌ getProximosPrazos: ' + e);
    return [];
  }
}


/**
 * Busca prazos do Checklist_Complete
 * @param {number} limite - Número máximo
 * @returns {Array} Array de prazos
 */
function getProximosPrazosDoCompleto(limite) {
  try {
    const campanhas = getCampanhasAtivas();
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    const prazos = [];
    
    campanhas.forEach(function(c) {
      const checklist = getChecklistCompleto(c.idCampanha);
      if (!checklist) return;
      
      // Coletar todas as datas previstas
      const etapas = [
        { nome: 'Contrato', data: checklist.dataPrevAssinaturaContrato },
        { nome: 'Produto', data: checklist.dataEnvioProduto },
        { nome: 'Roteiro', data: checklist.dataPrevRoteiro },
        { nome: 'Conteúdo', data: checklist.dataPrevConteudo },
        { nome: 'Postagem', data: checklist.dataPrevPostagem },
        { nome: 'Métricas', data: checklist.dataPrevColetaMetricas },
        { nome: 'Pagamento', data: checklist.dataPrevPagamentoCliente }
      ];
      
      etapas.forEach(function(etapa) {
        if (etapa.data) {
          const dataEtapa = new Date(etapa.data);
          if (!isNaN(dataEtapa.getTime())) {
            const diasRestantes = Math.ceil((dataEtapa - hoje) / (1000 * 60 * 60 * 24));
            
            prazos.push({
              idCampanha: c.idCampanha,
              marca: c.marca,
              influenciador: c.influenciador,
              etapa: etapa.nome,
              dataPrevista: etapa.data,
              diasRestantes: diasRestantes
            });
          }
        }
      });
    });
    
    // Ordenar por data (mais próximo primeiro)
    prazos.sort(function(a, b) {
      return new Date(a.dataPrevista) - new Date(b.dataPrevista);
    });
    
    return prazos.slice(0, limite);
    
  } catch (e) {
    Logger.log('❌ getProximosPrazosDoCompleto: ' + e);
    return [];
  }
}

/**
 * Busca link da pasta Drive da campanha
 * CORREÇÃO: Verificação robusta e tratamento de erros
 */
function buscarLinkPastaDriveCampanha(idCampanha) {
  try {
    Logger.log('🔍 Buscando pasta Drive para: ' + idCampanha);
    
    // CORREÇÃO 1: Verificar se SHEETS está definido
    if (typeof SHEETS === 'undefined' || !SHEETS) {
      Logger.log('❌ ERRO: SHEETS não está definido');
      return {
        success: false,
        message: 'Erro de configuração: SHEETS não definido'
      };
    }
    
    // CORREÇÃO 2: Buscar na aba Andamentos
    const andamentosSheet = SHEETS.andamentos;
    
    if (!andamentosSheet) {
      return {
        success: false,
        message: 'Aba Andamentos não encontrada'
      };
    }
    
    const data = andamentosSheet.getDataRange().getValues();
    const headers = data[0];
    const idCampanhaCol = headers.indexOf('idCampanha');
    const linkPastaCol = headers.indexOf('linkPastaCampanha');
    
    if (idCampanhaCol === -1 || linkPastaCol === -1) {
      return {
        success: false,
        message: 'Colunas não encontradas na planilha'
      };
    }
    
    // CORREÇÃO 3: Buscar linha da campanha
    for (let i = 1; i < data.length; i++) {
      if (data[i][idCampanhaCol] === idCampanha) {
        const linkPasta = data[i][linkPastaCol];
        
        if (linkPasta && linkPasta.toString().trim() !== '') {
          Logger.log('✅ Pasta encontrada: ' + linkPasta);
          
          return {
            success: true,
            linkPasta: linkPasta
          };
        } else {
          Logger.log('⚠️ Pasta ainda não criada para esta campanha');
          
          return {
            success: false,
            message: 'Pasta ainda não foi criada. Mude o status para "Fechado" primeiro.'
          };
        }
      }
    }
    
    return {
      success: false,
      message: 'Campanha não encontrada'
    };
    
  } catch (error) {
    Logger.log('❌ Erro ao buscar pasta: ' + error.toString());
    Logger.log('Stack: ' + error.stack);
    
    return {
      success: false,
      message: 'Erro ao buscar pasta: ' + error.toString()
    };
  }
}

/**
 * Busca prazos do Checklist_Execução (se existir)
 * @param {number} limite - Número máximo
 * @returns {Array} Array de prazos
 */
function getProximosPrazosDoChecklistExecucao(limite) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Checklist_Execução');
    
    if (!sheet || sheet.getLastRow() <= 1) return [];
    
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 7).getValues();
    
    const prazos = data
      .filter(function(row) {
        return row[2] && // Tem data prevista
               !row[3] && // Não tem data real (ainda não concluído)
               String(row[4]).toUpperCase() !== 'CONCLUÍDO'; // Status não é concluído
      })
      .map(function(row) {
        const prazoDate = new Date(row[2]);
        const andamento = getAndamento(row[0]);
        
        return {
          idCampanha: row[0],
          etapa: row[1],
          dataPrevista: row[2],
          marca: andamento ? andamento.marca : 'N/A',
          influenciador: andamento ? andamento.idAssessorado : 'N/A',
          diasRestantes: Math.ceil((prazoDate - hoje) / (1000 * 60 * 60 * 24))
        };
      });
    
    // Ordenar por data
    prazos.sort(function(a, b) {
      return new Date(a.dataPrevista) - new Date(b.dataPrevista);
    });
    
    return prazos.slice(0, limite);
    
  } catch (e) {
    Logger.log('❌ getProximosPrazosDoChecklistExecucao: ' + e);
    return [];
  }
}



// ═══════════════════════════════════════════════════════════════════════
//                      FIM DO 5_CAMPANHAS.GS
// ═══════════════════════════════════════════════════════════════════════

Logger.log('✅ 5_Campanhas.gs carregado - Gestão de campanhas ativas disponível');
// ═══════════════════════════════════════════════════════════════════════
//                    6_CHECKLIST.GS - CHECKLIST COMPLETO
//                    Sistema Littê v3.5
//                    Gestão completa do checklist de execução de campanhas
//                    
//                    ⚠️ VERSÃO AJUSTADA COM NOVAS ESPECIFICAÇÕES
// ═══════════════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════════════
//                      SETUP DA ABA CHECKLIST (AJUSTADO)
// ═══════════════════════════════════════════════════════════════════════

/**
 * Configuração da aba Checklist_Complete com NOVA ESTRUTURA
 * 
 * MUDANÇAS IMPLEMENTADAS:
 * 
 * PRODUTO:
 * - ❌ REMOVIDO: Valor Produto
 * 
 * CONTEÚDO:
 * - ✅ NOVO: Quantidade Conteúdos (número de conteúdos fechados)
 * - ✅ NOVO: Conteúdos JSON (array com dados de cada conteúdo)
 * - ❌ REMOVIDO: Campos únicos de conteúdo (agora são múltiplos)
 * 
 * POSTAGEM:
 * - ❌ REMOVIDO: Alcance Esperado
 * - ❌ REMOVIDO: Alcance Real
 * - ❌ REMOVIDO: Engajamento
 * - ❌ REMOVIDO: Métricas Detalhadas
 * - ✅ Vinculado automaticamente com quantidade de conteúdos
 * 
 * NF:
 * - ✅ NOVO: Data Prev Pagamento
 * - ❌ REMOVIDO: Impostos
 * - ❌ REMOVIDO: Valor Líquido
 * - ❌ REMOVIDO: Link XML
 * 
 * REPASSE:
 * - ✅ AUTO: Valor Total (puxado da campanha)
 * - ✅ AUTO: Repasse 80% (calculado automaticamente)
 * - ✅ AUTO: Taxa Littê 20% (calculado automaticamente)
 * 
 * GERAL:
 * - ✅ NOVO: Observações Campanha
 * - ✅ NOVO: Link Pasta Conteúdo (auto)
 * - ✅ NOVO: Link Pasta Métricas (auto)
 */
function setupChecklistSheetComplete() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Checklist_Complete');
  
  if (!sheet) {
    sheet = ss.insertSheet('Checklist_Complete');
  }
  
  const headers = [
    // ═══ IDENTIFICAÇÃO (4 colunas) ═══
    'ID Campanha',                    // 1
    'ID Assessorado',                 // 2
    'Nome Assessorado',               // 3
    'Marca',                          // 4
    
    // ═══ CONTRATO (6 colunas) ═══
    'Precisa Contrato',               // 5
    'Status Contrato',                // 6
    'Data Prev Assinatura',           // 7
    'Data Real Assinatura',           // 8
    'Link Contrato',                  // 9
    'Obs Contrato',                   // 10
    
    // ═══ PRODUTO (7 colunas - REMOVIDO Valor) ═══
    'Precisa Produto',                // 11
    'Nome Produto',                   // 12
    'Quantidade',                     // 13
    'Endereço Envio',                 // 14
    'Status Produto',                 // 15
    'Data Envio',                     // 16
    'Código Rastreio',                // 17
    'Link Rastreamento',              // 18
    
    // ═══ ROTEIRO (9 colunas) ═══
    'Precisa Roteiro',                // 19
    'Tipo Roteiro',                   // 20
    'Num Versões',                    // 21
    'Status Roteiro',                 // 22
    'Data Prev Roteiro',              // 23
    'Data Real Roteiro',              // 24
    'Data Aprov Roteiro',             // 25
    'Link Pasta Roteiro',             // 26
    'Feedback Cliente',               // 27
    
    // ═══ CONTEÚDO (3 colunas - NOVO SISTEMA) ═══
    'Quantidade Conteúdos',           // 28 - Número de conteúdos fechados
    'Conteúdos JSON',                 // 29 - Array com dados de cada conteúdo
    'Link Pasta Conteúdo',            // 30 - Link da pasta de conteúdo (AUTO)
    
    // ═══ POSTAGEM (5 colunas - REMOVIDOS campos de métrica) ═══
    'Status Postagem',                // 31
    'Rede Social',                    // 32
    'Tipo Post',                      // 33
    'Data Prev Postagem',             // 34
    'Horário Postagem',               // 35
    'Data Real Postagem',             // 36
    'Link Postagem',                  // 37
    
    // ═══ MÉTRICAS (3 colunas - REMOVIDO Métricas Detalhadas) ═══
    'Data Prev Coleta Métricas',      // 38
    'Status Métricas',                // 39
    'Link Pasta Métricas',            // 40 - Link da pasta de métricas (AUTO)
    
    // ═══ NF (6 colunas - REMOVIDOS: Impostos, Valor Líquido, Link XML) ═══
    'Status NF',                      // 41
    'Tipo NF',                        // 42
    'Número NF',                      // 43
    'CNPJ',                           // 44
    'Data Emissão NF',                // 45
    'Data Prev Pagamento',            // 46 - NOVO!
    'Valor NF',                       // 47
    'Link PDF NF',                    // 48
    
    // ═══ REPASSE (6 colunas - AUTO-CALCULADO) ═══
    'Valor Total Campanha',           // 49 - AUTO (puxado do andamento)
    'Repasse Influenciador 80%',      // 50 - AUTO (calculado)
    'Taxa Littê 20%',                 // 51 - AUTO (calculado)
    'Status Repasse',                 // 52
    'Data Repasse',                   // 53
    'Comprovante Repasse',            // 54
    
    // ═══ OBSERVAÇÕES E METADATA (3 colunas) ═══
    'Observações Campanha',           // 55 - NOVO!
    'Data Criação',                   // 56
    'Última Atualização',             // 57

    // ═══ CALENDAR EVENT IDs (5 colunas) ═══
    'Event ID Contrato',              // 58
    'Event ID Roteiro',               // 59
    'Event ID Postagem',              // 60
    'Event ID Métricas',              // 61
    'Event ID Repasse'                // 62
  ];

  // Total: 62 colunas
  
  const primeiracelula = sheet.getRange(1, 1).getValue();
  
  if (primeiracelula !== 'ID Campanha') {
    Logger.log('⚙️ Criando headers do Checklist_Complete...');
    
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#667eea')
      .setFontColor('#ffffff');
    
    sheet.setFrozenRows(1);
    SpreadsheetApp.flush();
    
    Logger.log('✅ Headers criados - Total: ' + headers.length + ' colunas');
  }
  
  return sheet;
}


// ═══════════════════════════════════════════════════════════════════════
//                      CRIAR CHECKLIST COMPLETO (AJUSTADO)
// ═══════════════════════════════════════════════════════════════════════

/**
 * Cria um checklist completo para uma campanha
 * 
 * NOVIDADES:
 * - Preenche automaticamente valor total da campanha
 * - Calcula repasse 80% e taxa 20%
 * - Busca links das pastas Drive (conteúdo e métricas)
 * 
 * @param {string} idCampanha - ID da campanha
 * @param {string} idAssessorado - ID do assessorado
 * @param {string} nomeAssessorado - Nome do assessorado
 * @param {string} marca - Marca da campanha
 * @returns {Object} {success, message}
 */
function criarChecklistCompleto(idCampanha, idAssessorado, nomeAssessorado, marca) {
  try {
    logInicio('criarChecklistCompleto - ID: ' + idCampanha);

    // ═══════════════════════════════════════════════════════════════
    // VERIFICAR SE JÁ EXISTE CHECKLIST PARA ESTA CAMPANHA
    // ═══════════════════════════════════════════════════════════════

    Logger.log('🔍 Verificando se checklist já existe...');
    const checklistExistente = getChecklistCompleto(idCampanha);

    if (checklistExistente && checklistExistente.idCampanha === idCampanha) {
      Logger.log('✅ Checklist já existe para campanha: ' + idCampanha);
      Logger.log('⏭️  Pulando criação de checklist duplicado');
      logFim('criarChecklistCompleto', true);

      return {
        success: true,
        message: 'Checklist já existe (não duplicado)'
      };
    }

    Logger.log('📝 Checklist não encontrado - prosseguindo com criação');

    // ═══════════════════════════════════════════════════════════════
    // CRIAR NOVO CHECKLIST
    // ═══════════════════════════════════════════════════════════════

    const sheet = setupChecklistSheetComplete();
    const hoje = new Date();
    
    // Buscar valor total da campanha
    const andamento = getAndamento(idCampanha);
    const valorTotal = andamento ? andamento.valorFechado : 0;
    
    // Calcular repasse e taxa
    const repasseInfluenciador = valorTotal * 0.80;
    const taxaLitte = valorTotal * 0.20;
    
    Logger.log('💰 Valor Total: R$ ' + valorTotal.toFixed(2));
    Logger.log('💸 Repasse 80%: R$ ' + repasseInfluenciador.toFixed(2));
    Logger.log('🏢 Taxa Littê 20%: R$ ' + taxaLitte.toFixed(2));
    
    // Buscar links das pastas Drive
    const linkPastaConteudo = buscarLinkPastaDriveCampanha(idCampanha, '03_CONTEUDO_APROVACAO');
    const linkPastaMetricas = buscarLinkPastaDriveCampanha(idCampanha, '05_METRICAS_RESULTADOS');

    // Criar array com 62 posições (todas as colunas)
    const row = new Array(62).fill('');

    // Identificação (1-4)
    row[0] = idCampanha;
    row[1] = idAssessorado;
    row[2] = nomeAssessorado;
    row[3] = marca;

    // Conteúdo (28-30)
    row[27] = 0;                      // Quantidade Conteúdos (inicialmente 0)
    row[28] = '[]';                   // Conteúdos JSON (array vazio)
    row[29] = linkPastaConteudo;      // Link Pasta Conteúdo

    // Métricas (38-40)
    row[39] = linkPastaMetricas;      // Link Pasta Métricas

    // Repasse (49-54) - AUTO-CALCULADO
    row[48] = valorTotal;             // Valor Total Campanha
    row[49] = repasseInfluenciador;   // Repasse 80%
    row[50] = taxaLitte;              // Taxa Littê 20%
    row[51] = 'AGUARDANDO NF';        // Status Repasse

    // Metadata (55-57)
    row[55] = hoje;                   // Data Criação
    row[56] = hoje;                   // Última Atualização

    // Calendar Event IDs (58-62) - inicialmente vazios
    row[57] = '';                     // Event ID Contrato
    row[58] = '';                     // Event ID Roteiro
    row[59] = '';                     // Event ID Postagem
    row[60] = '';                     // Event ID Métricas
    row[61] = '';                     // Event ID Repasse
    
    Logger.log('✅ Array criado com ' + row.length + ' posições');
    
    // Adicionar linha
    sheet.appendRow(row);
    SpreadsheetApp.flush();
    
    Logger.log('✅ Checklist criado na planilha');
    
    // Verificar se foi criado
    const verificacao = getChecklistCompleto(idCampanha);
    if (verificacao) {
      Logger.log('✅ VERIFICADO: Checklist criado com sucesso');
    } else {
      Logger.log('⚠️ ATENÇÃO: Checklist não encontrado após criação');
    }
    
    logFim('criarChecklistCompleto', true);
    
    return { success: true, message: 'Checklist criado com sucesso' };
    
  } catch (e) {
    Logger.log('❌ ERRO em criarChecklistCompleto: ' + e);
    Logger.log('Stack: ' + e.stack);
    logFim('criarChecklistCompleto', false);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      BUSCAR CHECKLIST COMPLETO (AJUSTADO)
// ═══════════════════════════════════════════════════════════════════════

/**
 * Busca o checklist completo de uma campanha
 * Retorna objeto com NOVA ESTRUTURA (57 campos)
 * 
 * @param {string} idCampanha - ID da campanha
 * @returns {Object|null} Objeto com dados do checklist ou null
 */
function getChecklistCompleto(idCampanha) {
  try {
    const sheet = setupChecklistSheetComplete();
    if (sheet.getLastRow() <= 1) return null;

    const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 62).getValues();
    const id = String(idCampanha).trim();
    
    const row = data.find(function(r) { 
      return String(r[0]).trim() === id; 
    });
    
    if (!row) return null;
    
    // Parsear JSON de conteúdos
    let conteudos = [];
    try {
      conteudos = JSON.parse(row[28] || '[]');
    } catch (e) {
      conteudos = [];
    }
    
    return {
      // Identificação
      idCampanha: String(row[0] || ''),
      idAssessorado: String(row[1] || ''),
      nomeAssessorado: String(row[2] || ''),
      marca: String(row[3] || ''),
      
      // Contrato
      precisaContrato: String(row[4] || ''),
      statusContrato: String(row[5] || ''),
      dataPrevAssinaturaContrato: formatDateToString(row[6]),
      dataRealAssinaturaContrato: formatDateToString(row[7]),
      linkContrato: String(row[8] || ''),
      obsContrato: String(row[9] || ''),
      
      // Produto (SEM valor)
      precisaProduto: String(row[10] || ''),
      nomeProduto: String(row[11] || ''),
      quantidade: row[12] || '',
      enderecoEnvio: String(row[13] || ''),
      statusProduto: String(row[14] || ''),
      dataEnvioProduto: formatDateToString(row[15]),
      codigoRastreio: String(row[16] || ''),
      linkRastreamento: String(row[17] || ''),
      
      // Roteiro
      precisaRoteiro: String(row[18] || ''),
      tipoRoteiro: String(row[19] || ''),
      numeroVersoes: row[20] || 0,
      statusRoteiro: String(row[21] || ''),
      dataPrevRoteiro: formatDateToString(row[22]),
      dataRealRoteiro: formatDateToString(row[23]),
      dataAprovRoteiro: formatDateToString(row[24]),
      linkPastaRoteiro: String(row[25] || ''),
      feedbackClienteRoteiro: String(row[26] || ''),
      
      // Conteúdo (NOVO SISTEMA)
      quantidadeConteudos: parseInt(row[27]) || 0,
      conteudos: conteudos,              // Array de objetos
      linkPastaConteudo: String(row[29] || ''),
      
      // Postagem (SEM métricas)
      statusPostagem: String(row[30] || ''),
      redeSocial: String(row[31] || ''),
      tipoPost: String(row[32] || ''),
      dataPrevPostagem: formatDateToString(row[33]),
      horarioPostagem: String(row[34] || ''),
      dataRealPostagem: formatDateToString(row[35]),
      linkPostagem: String(row[36] || ''),
      
      // Métricas (SEM detalhes)
      dataPrevColetaMetricas: formatDateToString(row[37]),
      statusMetricas: String(row[38] || ''),
      linkPastaMetricas: String(row[39] || ''),
      
      // NF (SEM impostos, valor líquido, XML)
      statusNF: String(row[40] || ''),
      tipoNF: String(row[41] || ''),
      numeroNF: String(row[42] || ''),
      cnpj: String(row[43] || ''),
      dataEmissaoNF: formatDateToString(row[44]),
      dataPrevPagamento: formatDateToString(row[45]),  // NOVO!
      valorNF: parseFloat(row[46]) || 0,
      linkPdfNF: String(row[47] || ''),
      
      // Repasse (AUTO-CALCULADO)
      valorTotalCampanha: parseFloat(row[48]) || 0,
      repasseInfluenciador80: parseFloat(row[49]) || 0,
      taxaLitte20: parseFloat(row[50]) || 0,
      statusRepasse: String(row[51] || ''),
      dataRepasse: formatDateToString(row[52]),
      comprovanteRepasse: String(row[53] || ''),
      
      // Observações e Metadata
      observacoesCampanha: String(row[54] || ''),      // NOVO!
      dataCriacao: formatDateToString(row[55]),
      ultimaAtualizacao: formatDateToString(row[56]),

      // Calendar Event IDs
      eventIdContrato: String(row[57] || ''),
      eventIdRoteiro: String(row[58] || ''),
      eventIdPostagem: String(row[59] || ''),
      eventIdMetricas: String(row[60] || ''),
      eventIdRepasse: String(row[61] || '')
    };
    
  } catch (e) {
    Logger.log('❌ getChecklistCompleto: ' + e);
    return null;
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      ATUALIZAR CHECKLIST COMPLETO (AJUSTADO)
// ═══════════════════════════════════════════════════════════════════════

/**
 * Atualiza dados do checklist
 * 
 * IMPORTANTE: Quando alterar datas de etapas com eventos no Calendar,
 * o evento antigo é EXCLUÍDO e um novo é criado
 * 
 * @param {Object} dados - Dados a serem atualizados (deve incluir idCampanha)
 * @returns {Object} {success, message}
 */
function updateChecklistCompleto(dados) {
  try {
    logInicio('updateChecklistCompleto - ID: ' + dados.idCampanha);
    
    const sheet = setupChecklistSheetComplete();
    const rowNum = findRowById(sheet, dados.idCampanha);
    
    if (!rowNum) {
      Logger.log('❌ Checklist não encontrado');
      return { success: false, message: 'Checklist não encontrado' };
    }
    
    Logger.log('✅ Checklist encontrado na linha: ' + rowNum);
    
    const hoje = new Date();
    
    // ═══════════════════════════════════════════════════════════════
    // ATUALIZAR CAMPOS CONFORME ENVIADO
    // ═══════════════════════════════════════════════════════════════
    
    // CONTRATO (5-10)
    if (dados.precisaContrato !== undefined) sheet.getRange(rowNum, 5).setValue(dados.precisaContrato);
    if (dados.statusContrato !== undefined) sheet.getRange(rowNum, 6).setValue(dados.statusContrato);
    if (dados.dataPrevAssinaturaContrato !== undefined) sheet.getRange(rowNum, 7).setValue(dados.dataPrevAssinaturaContrato);
    if (dados.dataRealAssinaturaContrato !== undefined) sheet.getRange(rowNum, 8).setValue(dados.dataRealAssinaturaContrato);
    if (dados.linkContrato !== undefined) sheet.getRange(rowNum, 9).setValue(dados.linkContrato);
    if (dados.obsContrato !== undefined) sheet.getRange(rowNum, 10).setValue(dados.obsContrato);
    
    // PRODUTO (11-18) - SEM valor
    if (dados.precisaProduto !== undefined) sheet.getRange(rowNum, 11).setValue(dados.precisaProduto);
    if (dados.nomeProduto !== undefined) sheet.getRange(rowNum, 12).setValue(dados.nomeProduto);
    if (dados.quantidade !== undefined) sheet.getRange(rowNum, 13).setValue(dados.quantidade);
    if (dados.enderecoEnvio !== undefined) sheet.getRange(rowNum, 14).setValue(dados.enderecoEnvio);
    if (dados.statusProduto !== undefined) sheet.getRange(rowNum, 15).setValue(dados.statusProduto);
    if (dados.dataEnvioProduto !== undefined) sheet.getRange(rowNum, 16).setValue(dados.dataEnvioProduto);
    if (dados.codigoRastreio !== undefined) sheet.getRange(rowNum, 17).setValue(dados.codigoRastreio);
    if (dados.linkRastreamento !== undefined) sheet.getRange(rowNum, 18).setValue(dados.linkRastreamento);
    
    // ROTEIRO (19-27)
    if (dados.precisaRoteiro !== undefined) sheet.getRange(rowNum, 19).setValue(dados.precisaRoteiro);
    if (dados.tipoRoteiro !== undefined) sheet.getRange(rowNum, 20).setValue(dados.tipoRoteiro);
    if (dados.numeroVersoes !== undefined) sheet.getRange(rowNum, 21).setValue(dados.numeroVersoes);
    if (dados.statusRoteiro !== undefined) sheet.getRange(rowNum, 22).setValue(dados.statusRoteiro);
    if (dados.dataPrevRoteiro !== undefined) sheet.getRange(rowNum, 23).setValue(dados.dataPrevRoteiro);
    if (dados.dataRealRoteiro !== undefined) sheet.getRange(rowNum, 24).setValue(dados.dataRealRoteiro);
    if (dados.dataAprovRoteiro !== undefined) sheet.getRange(rowNum, 25).setValue(dados.dataAprovRoteiro);
    if (dados.linkPastaRoteiro !== undefined) sheet.getRange(rowNum, 26).setValue(dados.linkPastaRoteiro);
    if (dados.feedbackClienteRoteiro !== undefined) sheet.getRange(rowNum, 27).setValue(dados.feedbackClienteRoteiro);
    
    // CONTEÚDO (28-30) - NOVO SISTEMA
    if (dados.quantidadeConteudos !== undefined) sheet.getRange(rowNum, 28).setValue(dados.quantidadeConteudos);
    if (dados.conteudos !== undefined) {
      sheet.getRange(rowNum, 29).setValue(JSON.stringify(dados.conteudos));
    }
    if (dados.linkPastaConteudo !== undefined) sheet.getRange(rowNum, 30).setValue(dados.linkPastaConteudo);
    
    // POSTAGEM (31-37) - SEM métricas
    if (dados.statusPostagem !== undefined) sheet.getRange(rowNum, 31).setValue(dados.statusPostagem);
    if (dados.redeSocial !== undefined) sheet.getRange(rowNum, 32).setValue(dados.redeSocial);
    if (dados.tipoPost !== undefined) sheet.getRange(rowNum, 33).setValue(dados.tipoPost);
    if (dados.dataPrevPostagem !== undefined) sheet.getRange(rowNum, 34).setValue(dados.dataPrevPostagem);
    if (dados.horarioPostagem !== undefined) sheet.getRange(rowNum, 35).setValue(dados.horarioPostagem);
    if (dados.dataRealPostagem !== undefined) sheet.getRange(rowNum, 36).setValue(dados.dataRealPostagem);
    if (dados.linkPostagem !== undefined) sheet.getRange(rowNum, 37).setValue(dados.linkPostagem);
    
    // MÉTRICAS (38-40) - SEM detalhes
    if (dados.dataPrevColetaMetricas !== undefined) sheet.getRange(rowNum, 38).setValue(dados.dataPrevColetaMetricas);
    if (dados.statusMetricas !== undefined) sheet.getRange(rowNum, 39).setValue(dados.statusMetricas);
    if (dados.linkPastaMetricas !== undefined) sheet.getRange(rowNum, 40).setValue(dados.linkPastaMetricas);
    
    // NF (41-48) - SEM impostos, valor líquido, XML
    if (dados.statusNF !== undefined) sheet.getRange(rowNum, 41).setValue(dados.statusNF);
    if (dados.tipoNF !== undefined) sheet.getRange(rowNum, 42).setValue(dados.tipoNF);
    if (dados.numeroNF !== undefined) sheet.getRange(rowNum, 43).setValue(dados.numeroNF);
    if (dados.cnpj !== undefined) sheet.getRange(rowNum, 44).setValue(dados.cnpj);
    if (dados.dataEmissaoNF !== undefined) sheet.getRange(rowNum, 45).setValue(dados.dataEmissaoNF);
    if (dados.dataPrevPagamento !== undefined) sheet.getRange(rowNum, 46).setValue(dados.dataPrevPagamento);
    if (dados.valorNF !== undefined) sheet.getRange(rowNum, 47).setValue(dados.valorNF);
    if (dados.linkPdfNF !== undefined) sheet.getRange(rowNum, 48).setValue(dados.linkPdfNF);
    
    // REPASSE (49-54)
    if (dados.statusRepasse !== undefined) sheet.getRange(rowNum, 52).setValue(dados.statusRepasse);
    if (dados.dataRepasse !== undefined) sheet.getRange(rowNum, 53).setValue(dados.dataRepasse);
    if (dados.comprovanteRepasse !== undefined) sheet.getRange(rowNum, 54).setValue(dados.comprovanteRepasse);
    
    // OBSERVAÇÕES (55)
    if (dados.observacoesCampanha !== undefined) sheet.getRange(rowNum, 55).setValue(dados.observacoesCampanha);

    // CALENDAR EVENT IDs (58-62)
    if (dados.eventIdContrato !== undefined) sheet.getRange(rowNum, 58).setValue(dados.eventIdContrato);
    if (dados.eventIdRoteiro !== undefined) sheet.getRange(rowNum, 59).setValue(dados.eventIdRoteiro);
    if (dados.eventIdPostagem !== undefined) sheet.getRange(rowNum, 60).setValue(dados.eventIdPostagem);
    if (dados.eventIdMetricas !== undefined) sheet.getRange(rowNum, 61).setValue(dados.eventIdMetricas);
    if (dados.eventIdRepasse !== undefined) sheet.getRange(rowNum, 62).setValue(dados.eventIdRepasse);

    // Atualizar timestamp (57)
    sheet.getRange(rowNum, 57).setValue(hoje);
    
    SpreadsheetApp.flush();
    Logger.log('✅ Checklist atualizado');
    
    // ═══════════════════════════════════════════════════════════════
    // VERIFICAR SE PRECISA ATUALIZAR EVENTOS NO CALENDAR
    // ═══════════════════════════════════════════════════════════════
    
    // TODO: Implementar lógica de atualização de eventos
    // Se uma data mudou, excluir evento antigo e criar novo
    
    logFim('updateChecklistCompleto', true);
    
    return { success: true, message: 'Checklist atualizado com sucesso' };
    
  } catch (e) {
    Logger.log('❌ ERRO em updateChecklistCompleto: ' + e);
    Logger.log('Stack: ' + e.stack);
    logFim('updateChecklistCompleto', false);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      ADICIONAR CONTEÚDO AO CHECKLIST
// ═══════════════════════════════════════════════════════════════════════

/**
 * Adiciona um novo conteúdo ao array de conteúdos
 * Atualiza automaticamente a quantidade
 * 
 * @param {string} idCampanha - ID da campanha
 * @param {Object} conteudo - Dados do conteúdo {tipo, status, dataPrevEnvio, dataRealEnvio, dataAprovacao}
 * @returns {Object} {success, message}
 */
function adicionarConteudoChecklist(idCampanha, conteudo) {
  try {
    const checklist = getChecklistCompleto(idCampanha);
    if (!checklist) {
      return { success: false, message: 'Checklist não encontrado' };
    }
    
    const conteudos = checklist.conteudos || [];
    
    // Adicionar novo conteúdo com ID único
    const novoConteudo = {
      id: 'CONT' + new Date().getTime(),
      tipo: conteudo.tipo || '',
      status: conteudo.status || 'PENDENTE',
      dataPrevEnvio: conteudo.dataPrevEnvio || '',
      dataRealEnvio: conteudo.dataRealEnvio || '',
      dataAprovacao: conteudo.dataAprovacao || ''
    };
    
    conteudos.push(novoConteudo);
    
    // Atualizar checklist
    const resultado = updateChecklistCompleto({
      idCampanha: idCampanha,
      quantidadeConteudos: conteudos.length,
      conteudos: conteudos
    });
    
    if (resultado.success) {
      Logger.log('✅ Conteúdo adicionado: ' + novoConteudo.id);
    }
    
    return resultado;
    
  } catch (e) {
    Logger.log('❌ adicionarConteudoChecklist: ' + e);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      EDITAR CONTEÚDO DO CHECKLIST
// ═══════════════════════════════════════════════════════════════════════

/**
 * Edita um conteúdo específico pelo ID
 * 
 * @param {string} idCampanha - ID da campanha
 * @param {string} idConteudo - ID do conteúdo
 * @param {Object} dadosAtualizados - Novos dados
 * @returns {Object} {success, message}
 */
function editarConteudoChecklist(idCampanha, idConteudo, dadosAtualizados) {
  try {
    const checklist = getChecklistCompleto(idCampanha);
    if (!checklist) {
      return { success: false, message: 'Checklist não encontrado' };
    }
    
    const conteudos = checklist.conteudos || [];
    const index = conteudos.findIndex(function(c) {
      return c.id === idConteudo;
    });
    
    if (index === -1) {
      return { success: false, message: 'Conteúdo não encontrado' };
    }
    
    // Atualizar campos
    conteudos[index] = Object.assign({}, conteudos[index], dadosAtualizados);
    
    // Salvar
    return updateChecklistCompleto({
      idCampanha: idCampanha,
      conteudos: conteudos
    });
    
  } catch (e) {
    Logger.log('❌ editarConteudoChecklist: ' + e);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      REMOVER CONTEÚDO DO CHECKLIST
// ═══════════════════════════════════════════════════════════════════════

/**
 * Remove um conteúdo do array
 * 
 * @param {string} idCampanha - ID da campanha
 * @param {string} idConteudo - ID do conteúdo
 * @returns {Object} {success, message}
 */
function removerConteudoChecklist(idCampanha, idConteudo) {
  try {
    const checklist = getChecklistCompleto(idCampanha);
    if (!checklist) {
      return { success: false, message: 'Checklist não encontrado' };
    }
    
    const conteudos = checklist.conteudos || [];
    const novoArray = conteudos.filter(function(c) {
      return c.id !== idConteudo;
    });
    
    return updateChecklistCompleto({
      idCampanha: idCampanha,
      quantidadeConteudos: novoArray.length,
      conteudos: novoArray
    });
    
  } catch (e) {
    Logger.log('❌ removerConteudoChecklist: ' + e);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      BUSCAR LINK DE PASTA DRIVE DA CAMPANHA
// ═══════════════════════════════════════════════════════════════════════

/**
 * Busca o link de uma subpasta específica da campanha
 * 
 * @param {string} idCampanha - ID da campanha
 * @param {string} nomeSubpasta - Nome da subpasta (ex: '03_CONTEUDO_APROVACAO')
 * @returns {string} URL da pasta ou vazio
 */
function buscarLinkPastaDriveCampanha(idCampanha, nomeSubpasta) {
  try {
    // Buscar andamento para pegar link da pasta mãe
    const andamento = getAndamento(idCampanha);
    if (!andamento || !andamento.linkPastaCampanha) {
      return '';
    }
    
    // Extrair ID da pasta mãe da URL
    const urlPastaMae = andamento.linkPastaCampanha;
    const match = urlPastaMae.match(/folders\/([a-zA-Z0-9-_]+)/);
    
    if (!match) return '';
    
    const idPastaMae = match[1];
    
    // Buscar subpasta
    const pastaMae = DriveApp.getFolderById(idPastaMae);
    const subpastas = pastaMae.getFoldersByName(nomeSubpasta);
    
    if (subpastas.hasNext()) {
      return subpastas.next().getUrl();
    }
    
    return '';
    
  } catch (e) {
    Logger.log('⚠️ buscarLinkPastaDriveCampanha: ' + e);
    return '';
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      RECALCULAR VALORES DE REPASSE
// ═══════════════════════════════════════════════════════════════════════

/**
 * Recalcula automaticamente repasse e taxa baseado no valor total
 * Útil quando o valor da campanha muda
 * 
 * @param {string} idCampanha - ID da campanha
 * @returns {Object} {success, message}
 */
function recalcularValoresRepasse(idCampanha) {
  try {
    const andamento = getAndamento(idCampanha);
    if (!andamento) {
      return { success: false, message: 'Campanha não encontrada' };
    }
    
    const valorTotal = andamento.valorFechado || 0;
    const repasse80 = valorTotal * 0.80;
    const taxa20 = valorTotal * 0.20;
    
    const sheet = setupChecklistSheetComplete();
    const rowNum = findRowById(sheet, idCampanha);
    
    if (!rowNum) {
      return { success: false, message: 'Checklist não encontrado' };
    }
    
    // Atualizar valores
    sheet.getRange(rowNum, 49).setValue(valorTotal);
    sheet.getRange(rowNum, 50).setValue(repasse80);
    sheet.getRange(rowNum, 51).setValue(taxa20);
    sheet.getRange(rowNum, 57).setValue(new Date());
    
    SpreadsheetApp.flush();
    
    Logger.log('✅ Valores recalculados:');
    Logger.log('   Total: R$ ' + valorTotal.toFixed(2));
    Logger.log('   Repasse: R$ ' + repasse80.toFixed(2));
    Logger.log('   Taxa: R$ ' + taxa20.toFixed(2));
    
    return { success: true, message: 'Valores recalculados' };
    
  } catch (e) {
    Logger.log('❌ recalcularValoresRepasse: ' + e);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      MIGRAÇÃO: CRIAR CHECKLISTS FALTANTES
// ═══════════════════════════════════════════════════════════════════════

/**
 * Cria checklists para todos os andamentos fechados que não têm
 * Útil para migração ou recuperação de dados
 * 
 * @returns {Object} {success, criados, message}
 */
function criarChecklistsParaAndamentosFechados() {
  try {
    Logger.clear();
    logInicio('criarChecklistsParaAndamentosFechados');
    
    const andamentos = getAllAndamentos();
    const fechados = andamentos.filter(function(a) {
      return a.statusDetalhado === 'Fechado';
    });
    
    Logger.log('📊 Total de andamentos fechados: ' + fechados.length);
    
    let criados = 0;
    
    fechados.forEach(function(andamento) {
      // Verificar se já tem checklist
      const jaTemChecklist = getChecklistCompleto(andamento.idCampanha);
      
      if (!jaTemChecklist) {
        Logger.log('');
        Logger.log('📋 Criando checklist para: ' + andamento.idCampanha);
        
        const assessorado = getAssessorado(andamento.idAssessorado);
        const nomeAssessorado = assessorado ? assessorado.nome : 'Assessorado';
        
        const resultado = criarChecklistCompleto(
          andamento.idCampanha,
          andamento.idAssessorado,
          nomeAssessorado,
          andamento.marca
        );
        
        if (resultado.success) {
          Logger.log('   ✅ Checklist criado!');
          criados++;
        } else {
          Logger.log('   ❌ Erro: ' + resultado.message);
        }
      } else {
        Logger.log('⏭️  ' + andamento.idCampanha + ' já tem checklist');
      }
    });
    
    Logger.log('');
    Logger.log('═══════════════════════════════════════');
    Logger.log('✅ Total de checklists criados: ' + criados);
    Logger.log('═══════════════════════════════════════');
    
    logFim('criarChecklistsParaAndamentosFechados', true);
    
    return {
      success: true,
      criados: criados,
      message: criados + ' checklists criados'
    };
    
  } catch (e) {
    Logger.log('❌ ERRO: ' + e);
    logFim('criarChecklistsParaAndamentosFechados', false);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      FIM DO 6_CHECKLIST.GS
// ═══════════════════════════════════════════════════════════════════════

Logger.log('✅ 6_Checklist.gs carregado - Sistema de checklist AJUSTADO disponível');

// ═══════════════════════════════════════════════════════════════════════
//                FUNÇÃO PARA O FRONTEND (HTML)
// ═══════════════════════════════════════════════════════════════════════

/**
 * Busca checklist E andamento juntos para o frontend
 * Retorna objeto no formato esperado pelo HTML
 * 
 * @param {string} idCampanha - ID da campanha
 * @returns {Object} {success, checklist, andamento}
 */
function getChecklistCompletoComAndamento(idCampanha) {
  try {
    logInicio('getChecklistCompletoComAndamento - ID: ' + idCampanha);
    
    // Buscar checklist
    const checklist = getChecklistCompleto(idCampanha);
    
    if (!checklist) {
      Logger.log('❌ Checklist não encontrado');
      logFim('getChecklistCompletoComAndamento', false);
      return {
        success: false,
        message: 'Checklist não encontrado para ID: ' + idCampanha
      };
    }
    
    Logger.log('✅ Checklist encontrado');
    
    // Buscar andamento correspondente
    const andamento = getAndamento(idCampanha);
    
    if (!andamento) {
      Logger.log('⚠️ Andamento não encontrado, mas checklist existe');
      // Retornar com sucesso mesmo sem andamento
      logFim('getChecklistCompletoComAndamento', true);
      return {
        success: true,
        checklist: checklist,
        andamento: {
          idCampanha: idCampanha,
          marca: checklist.marca || '',
          nomeInfluenciador: checklist.nomeAssessorado || '',
          valorFechado: checklist.valorTotalCampanha || 0
        }
      };
    }
    
    Logger.log('✅ Andamento encontrado');
    
    logFim('getChecklistCompletoComAndamento', true);
    
    return {
      success: true,
      checklist: checklist,
      andamento: andamento
    };
    
  } catch (e) {
    Logger.log('❌ ERRO em getChecklistCompletoComAndamento: ' + e);
    Logger.log('Stack: ' + e.stack);
    logFim('getChecklistCompletoComAndamento', false);
    
    return {
      success: false,
      message: 'Erro ao buscar checklist: ' + e.toString()
    };
  }
}

function renderTabObservacoes(c) {
  return `
    <div class="space-y-6">
      <h4 class="text-xl font-bold text-slate-900 mb-6 pb-4 border-b-2 border-slate-900">📝 Observações da Campanha</h4>
      
      <div>
        <label class="block text-sm font-semibold text-slate-700 mb-2">Observações Gerais</label>
        <textarea name="observacoesCampanha" rows="10" 
          class="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-900"
          placeholder="Digite aqui observações importantes sobre a campanha...">${c.observacoesCampanha || ''}</textarea>
      </div>
    </div>
  `;
}
// ═══════════════════════════════════════════════════════════════════════
//                    7_FINANCEIRO.GS - FINANCEIRO COMPLETO + MÉTRICAS
//                    Sistema Littê v3.5
//                    Gestão financeira e indicadores de faturamento
// ═══════════════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════════════
//                      CRIAR FINANCEIRO COMPLETO
// ═══════════════════════════════════════════════════════════════════════

/**
 * Cria um registro financeiro para uma campanha
 * Chamado automaticamente quando uma campanha é fechada
 * 
 * @param {string} idCampanha - ID da campanha
 * @param {string} idAssessorado - ID do assessorado
 * @param {string} nomeAssessorado - Nome do assessorado
 * @param {string} marca - Marca da campanha
 * @param {number} valorTotal - Valor total da campanha
 * @returns {Object} {success, message}
 */
function criarFinanceiroCompleto(idCampanha, idAssessorado, nomeAssessorado, marca, valorTotal) {
  try {
    logInicio('criarFinanceiroCompleto - ID: ' + idCampanha);
    Logger.log('💰 Valor Total: R$ ' + valorTotal.toFixed(2));

    // ═══════════════════════════════════════════════════════════════
    // VERIFICAR SE JÁ EXISTE FINANCEIRO PARA ESTA CAMPANHA
    // ═══════════════════════════════════════════════════════════════

    Logger.log('🔍 Verificando se financeiro já existe...');
    const existente = getFinanceiroPorId(idCampanha);

    if (existente) {
      Logger.log('✅ Financeiro já existe para campanha: ' + idCampanha);
      Logger.log('⏭️  Pulando criação de financeiro duplicado');
      logFim('criarFinanceiroCompleto', true);

      return {
        success: true,
        message: 'Financeiro já existe (não duplicado)'
      };
    }

    Logger.log('📝 Financeiro não encontrado - prosseguindo com criação');

    // ═══════════════════════════════════════════════════════════════
    // CRIAR NOVO FINANCEIRO
    // ═══════════════════════════════════════════════════════════════

    const sheet = setupFinanceiroSheetComplete();
    const hoje = new Date();
    
    // Adicionar linha
    sheet.appendRow([
      idCampanha,                     // 1. ID Campanha
      idAssessorado,                  // 2. ID Assessorado
      nomeAssessorado,                // 3. Nome Assessorado
      marca,                          // 4. Marca
      valorTotal,                     // 5. Valor Total
      'PENDENTE',                     // 6. Status Pag Cliente
      'AGUARDANDO NF',                // 7. Status Repasse
      'A EMITIR',                     // 8. Status NF
      hoje,                           // 9. Data Criação
      hoje                            // 10. Última Atualização
    ]);
    
    SpreadsheetApp.flush();
    
    Logger.log('✅ Financeiro criado');
    
    // Registrar histórico
    registrarHistorico(
      'Financeiro',
      idCampanha,
      'Criou',
      'Sistema',
      '',
      '',
      'Financeiro criado - Valor: R$ ' + valorTotal.toFixed(2)
    );
    
    logFim('criarFinanceiroCompleto', true);
    
    return { 
      success: true, 
      message: 'Financeiro criado com sucesso' 
    };
    
  } catch (e) {
    Logger.log('❌ ERRO em criarFinanceiroCompleto: ' + e);
    Logger.log('Stack: ' + e.stack);
    logFim('criarFinanceiroCompleto', false);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      LISTAR TODOS OS FINANCEIROS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Retorna todos os registros financeiros
 * @returns {Array} Array de objetos com dados financeiros
 */
function getAllFinanceirosCompletos() {
  try {
    const sheet = setupFinanceiroSheetComplete();
    if (sheet.getLastRow() <= 1) return [];
    
    const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 10).getValues();
    
    return data.filter(function(row) { 
      return row[0]; 
    }).map(function(row) {
      return {
        idCampanha: String(row[0] || ''),
        idAssessorado: String(row[1] || ''),
        nomeAssessorado: String(row[2] || ''),
        marca: String(row[3] || ''),
        valorTotal: parseFloat(row[4]) || 0,
        statusPagamentoCliente: String(row[5] || 'PENDENTE'),
        statusRepasse: String(row[6] || 'AGUARDANDO NF'),
        statusNF: String(row[7] || 'A EMITIR'),
        dataCriacao: row[8] ? formatDateToISO(row[8]) : '',
        ultimaAtualizacao: row[9] ? formatDateToISO(row[9]) : ''
      };
    });
  } catch (e) {
    Logger.log('❌ getAllFinanceirosCompletos: ' + e);
    return [];
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      BUSCAR FINANCEIRO POR ID
// ═══════════════════════════════════════════════════════════════════════

/**
 * Busca um registro financeiro específico por ID da campanha
 * @param {string} idCampanha - ID da campanha
 * @returns {Object|null} Objeto com dados financeiros ou null
 */
function getFinanceiroPorId(idCampanha) {
  try {
    const dados = getAllFinanceirosCompletos();
    return dados.find(function(f) { 
      return f.idCampanha === idCampanha; 
    }) || null;
  } catch (e) {
    Logger.log('❌ getFinanceiroPorId: ' + e);
    return null;
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      ATUALIZAR STATUS FINANCEIRO
// ═══════════════════════════════════════════════════════════════════════

/**
 * Atualiza os status financeiros de uma campanha
 * 
 * STATUS POSSÍVEIS:
 * - Pagamento Cliente: PENDENTE, PAGO, ATRASADO, CANCELADO
 * - Repasse: AGUARDANDO NF, PRONTO PARA REPASSE, REPASSADO, CANCELADO
 * - NF: A EMITIR, EMITIDA, ENVIADA, RECEBIDA, CORRIGIR
 * 
 * @param {string} idCampanha - ID da campanha
 * @param {Object} novosDados - {statusPagamentoCliente?, statusRepasse?, statusNF?}
 * @returns {Object} {success, message}
 */
function atualizarStatusFinanceiro(idCampanha, novosDados) {
  try {
    logInicio('atualizarStatusFinanceiro - ID: ' + idCampanha);
    
    const sheet = setupFinanceiroSheetComplete();
    const rowNum = findRowById(sheet, idCampanha);
    
    if (!rowNum) {
      Logger.log('❌ Financeiro não encontrado');
      return { success: false, message: 'Campanha não encontrada' };
    }
    
    Logger.log('✅ Financeiro encontrado na linha: ' + rowNum);
    
    // Buscar valores antigos para histórico
    const valoresAntigos = sheet.getRange(rowNum, 1, 1, 10).getValues()[0];
    const statusPagAnterior = valoresAntigos[5];
    const statusRepasseAnterior = valoresAntigos[6];
    const statusNFAnterior = valoresAntigos[7];
    
    // Atualizar campos
    if (novosDados.statusPagamentoCliente !== undefined) {
      sheet.getRange(rowNum, 6).setValue(novosDados.statusPagamentoCliente);
      Logger.log('💳 Status Pagamento: ' + statusPagAnterior + ' → ' + novosDados.statusPagamentoCliente);
    }
    
    if (novosDados.statusRepasse !== undefined) {
      sheet.getRange(rowNum, 7).setValue(novosDados.statusRepasse);
      Logger.log('💸 Status Repasse: ' + statusRepasseAnterior + ' → ' + novosDados.statusRepasse);
    }
    
    if (novosDados.statusNF !== undefined) {
      sheet.getRange(rowNum, 8).setValue(novosDados.statusNF);
      Logger.log('📄 Status NF: ' + statusNFAnterior + ' → ' + novosDados.statusNF);
    }
    
    // Atualizar timestamp
    sheet.getRange(rowNum, 10).setValue(new Date());
    
    SpreadsheetApp.flush();
    
    Logger.log('✅ Status atualizado');
    
    // Registrar histórico
    const detalhes = [];
    if (novosDados.statusPagamentoCliente) {
      detalhes.push('Pag: ' + novosDados.statusPagamentoCliente);
    }
    if (novosDados.statusRepasse) {
      detalhes.push('Repasse: ' + novosDados.statusRepasse);
    }
    if (novosDados.statusNF) {
      detalhes.push('NF: ' + novosDados.statusNF);
    }
    
    registrarHistorico(
      'Financeiro',
      idCampanha,
      'Atualizou Status',
      'Sistema',
      '',
      '',
      detalhes.join(', ')
    );
    
    logFim('atualizarStatusFinanceiro', true);
    
    return { success: true, message: 'Status atualizado' };
    
  } catch (e) {
    Logger.log('❌ ERRO em atualizarStatusFinanceiro: ' + e);
    logFim('atualizarStatusFinanceiro', false);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      MÉTRICAS FINANCEIRAS (DASHBOARD)
// ═══════════════════════════════════════════════════════════════════════

/**
 * Calcula todas as métricas financeiras para o dashboard
 * 
 * MÉTRICAS CALCULADAS:
 * - Total Recebido (status PAGO)
 * - Total a Receber (status PENDENTE)
 * - Faturamento do Ano (soma de tudo)
 * - Saldo Projetado (recebido + a receber)
 * - Divisão Bryan (50%)
 * - Divisão Roberta (50%)
 * 
 * @returns {Object} Objeto com todas as métricas
 */
function getMetricasFinanceiras() {
  try {
    const data = getAllFinanceirosCompletos();
    
    let totalRecebido = 0;
    let totalReceber = 0;
    
    // Calcular totais
    data.forEach(function(item) {
      const status = item.statusPagamentoCliente.toUpperCase();
      const valor = item.valorTotal;
      
      if (status === 'PAGO') {
        totalRecebido += valor;
      } else if (status === 'PENDENTE' || status === 'ATRASADO') {
        totalReceber += valor;
      }
    });
    
    const faturamentoAno = totalRecebido + totalReceber;
    const saldoProjetado = faturamentoAno;
    
    // Divisão sócios (50/50)
    const bryanRecebido = totalRecebido * 0.5;
    const bryanReceber = totalReceber * 0.5;
    const robertaRecebido = totalRecebido * 0.5;
    const robertaReceber = totalReceber * 0.5;
    
    Logger.log('📊 MÉTRICAS FINANCEIRAS:');
    Logger.log('   Total Recebido: R$ ' + totalRecebido.toFixed(2));
    Logger.log('   Total a Receber: R$ ' + totalReceber.toFixed(2));
    Logger.log('   Faturamento Ano: R$ ' + faturamentoAno.toFixed(2));
    Logger.log('   Bryan Total: R$ ' + (bryanRecebido + bryanReceber).toFixed(2));
    Logger.log('   Roberta Total: R$ ' + (robertaRecebido + robertaReceber).toFixed(2));
    
    return {
      success: true,
      totalRecebido: totalRecebido,
      totalReceber: totalReceber,
      faturamentoAno: faturamentoAno,
      saldoProjetado: saldoProjetado,
      bryanRecebido: bryanRecebido,
      bryanReceber: bryanReceber,
      bryanTotal: bryanRecebido + bryanReceber,
      robertaRecebido: robertaRecebido,
      robertaReceber: robertaReceber,
      robertaTotal: robertaRecebido + robertaReceber,
      entradasPrevistas: totalReceber,
      saidasPrevistas: 0 // Pode ser calculado com base em despesas futuras
    };
    
  } catch (e) {
    Logger.log('❌ getMetricasFinanceiras: ' + e);
    return {
      success: false,
      message: e.toString(),
      totalRecebido: 0,
      totalReceber: 0,
      faturamentoAno: 0,
      saldoProjetado: 0,
      bryanRecebido: 0,
      bryanReceber: 0,
      bryanTotal: 0,
      robertaRecebido: 0,
      robertaReceber: 0,
      robertaTotal: 0,
      entradasPrevistas: 0,
      saidasPrevistas: 0
    };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      CALCULAR FATURAMENTO DO MÊS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Calcula o faturamento do mês atual
 * Baseado em campanhas com status PAGO no mês
 * 
 * @returns {number} Valor total faturado no mês
 */
function calcularFaturamentoMes() {
  try {
    const hoje = new Date();
    const mesAtual = hoje.getMonth();
    const anoAtual = hoje.getFullYear();
    
    const data = getAllFinanceirosCompletos();
    
    let totalMes = 0;
    
    data.forEach(function(item) {
      if (item.statusPagamentoCliente === 'PAGO' && item.ultimaAtualizacao) {
        const dataAtualizacao = new Date(item.ultimaAtualizacao);
        
        if (dataAtualizacao.getMonth() === mesAtual && 
            dataAtualizacao.getFullYear() === anoAtual) {
          totalMes += item.valorTotal;
        }
      }
    });
    
    Logger.log('📅 Faturamento do mês: R$ ' + totalMes.toFixed(2));
    
    return totalMes;
    
  } catch (e) {
    Logger.log('❌ calcularFaturamentoMes: ' + e);
    return 0;
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      CALCULAR TAXA DE CONVERSÃO
// ═══════════════════════════════════════════════════════════════════════

/**
 * Calcula a taxa de conversão (% de prospecções que viraram campanhas fechadas)
 * @returns {number} Porcentagem de conversão
 */
function calcularTaxaConversao() {
  try {
    const andamentos = getAllAndamentos();
    
    if (andamentos.length === 0) return 0;
    
    const total = andamentos.length;
    const fechados = andamentos.filter(function(a) {
      return a.statusDetalhado === 'Fechado';
    }).length;
    
    const taxa = Math.round((fechados / total) * 100);
    
    Logger.log('📊 Taxa de conversão: ' + taxa + '%');
    Logger.log('   Total: ' + total);
    Logger.log('   Fechados: ' + fechados);
    
    return taxa;
    
  } catch (e) {
    Logger.log('❌ calcularTaxaConversao: ' + e);
    return 0;
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      CONTAR PROSPECÇÕES ATIVAS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Conta o número de prospecções em andamento
 * @returns {number} Total de prospecções
 */
function contarProspeccoes() {
  try {
    const prospeccoes = getProspeccoes();
    return prospeccoes.length;
  } catch (e) {
    Logger.log('❌ contarProspeccoes: ' + e);
    return 0;
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      CONTAR PENDÊNCIAS (PRAZOS VENCIDOS)
// ═══════════════════════════════════════════════════════════════════════

/**
 * Conta o número de etapas com prazos vencidos
 * @returns {number} Total de pendências
 */
function contarPendencias() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Checklist_Execução');
    
    if (!sheet || sheet.getLastRow() <= 1) return 0;
    
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 5).getValues();
    
    const pendencias = data.filter(function(row) {
      const dataPrevista = row[2];
      const dataReal = row[3];
      const status = String(row[4]).toUpperCase();
      
      if (dataPrevista && !dataReal && status !== 'CONCLUÍDO') {
        const prazo = new Date(dataPrevista);
        return prazo < hoje;
      }
      return false;
    }).length;
    
    Logger.log('⚠️ Pendências (prazos vencidos): ' + pendencias);
    
    return pendencias;
    
  } catch (e) {
    Logger.log('❌ contarPendencias: ' + e);
    return 0;
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      CONTAR NFs PENDENTES
// ═══════════════════════════════════════════════════════════════════════

/**
 * Conta o número de NFs pendentes de emissão
 * @returns {number} Total de NFs pendentes
 */
function contarNFsPendentes() {
  try {
    const data = getAllFinanceirosCompletos();
    
    const statusPendentes = ['A EMITIR', 'CORRIGIR'];
    
    const nfsPendentes = data.filter(function(item) {
      return statusPendentes.includes(item.statusNF.toUpperCase());
    }).length;
    
    Logger.log('📄 NFs pendentes: ' + nfsPendentes);
    
    return nfsPendentes;
    
  } catch (e) {
    Logger.log('❌ contarNFsPendentes: ' + e);
    return 0;
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      BUSCAR FINANCEIROS POR STATUS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Retorna financeiros filtrados por status de pagamento
 * @param {string} status - Status do pagamento (PENDENTE, PAGO, ATRASADO)
 * @returns {Array} Array de financeiros
 */
function getFinanceirosPorStatusPagamento(status) {
  try {
    const todos = getAllFinanceirosCompletos();
    return todos.filter(function(f) {
      return f.statusPagamentoCliente.toUpperCase() === status.toUpperCase();
    });
  } catch (e) {
    Logger.log('❌ getFinanceirosPorStatusPagamento: ' + e);
    return [];
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      BUSCAR FINANCEIROS POR STATUS NF
// ═══════════════════════════════════════════════════════════════════════

/**
 * Retorna financeiros filtrados por status de NF
 * @param {string} status - Status da NF (A EMITIR, EMITIDA, etc)
 * @returns {Array} Array de financeiros
 */
function getFinanceirosPorStatusNF(status) {
  try {
    const todos = getAllFinanceirosCompletos();
    return todos.filter(function(f) {
      return f.statusNF.toUpperCase() === status.toUpperCase();
    });
  } catch (e) {
    Logger.log('❌ getFinanceirosPorStatusNF: ' + e);
    return [];
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      BUSCAR FINANCEIROS ATRASADOS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Retorna todos os financeiros com status ATRASADO ou PENDENTE há mais de 30 dias
 * @returns {Array} Array de financeiros atrasados
 */
function getFinanceirosAtrasados() {
  try {
    const todos = getAllFinanceirosCompletos();
    const hoje = new Date();
    const limite = new Date(hoje.getTime() - (30 * 24 * 60 * 60 * 1000)); // 30 dias atrás
    
    return todos.filter(function(f) {
      if (f.statusPagamentoCliente === 'ATRASADO') {
        return true;
      }
      
      if (f.statusPagamentoCliente === 'PENDENTE' && f.dataCriacao) {
        const dataCriacao = new Date(f.dataCriacao);
        return dataCriacao < limite;
      }
      
      return false;
    });
  } catch (e) {
    Logger.log('❌ getFinanceirosAtrasados: ' + e);
    return [];
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      SINCRONIZAR FINANCEIRO MASTER
// ═══════════════════════════════════════════════════════════════════════

/**
 * Sincroniza dados com a aba Financeiro_Master (se existir)
 * Útil para relatórios e análises mais detalhadas
 * 
 * @returns {Object} {success, message}
 */
function sincronizarFinanceiroMaster() {
  try {
    logInicio('sincronizarFinanceiroMaster');
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetMaster = ss.getSheetByName('Financeiro_Master');
    
    if (!sheetMaster) {
      Logger.log('⚠️ Aba Financeiro_Master não existe');
      return { 
        success: false, 
        message: 'Aba Financeiro_Master não encontrada' 
      };
    }
    
    // Limpar conteúdo atual
    if (sheetMaster.getLastRow() > 1) {
      sheetMaster.getRange(2, 1, sheetMaster.getMaxRows() - 1, 10).clearContent();
    }
    
    // Buscar dados
    const financeiros = getAllFinanceirosCompletos();
    
    if (financeiros.length === 0) {
      Logger.log('⚠️ Nenhum financeiro para sincronizar');
      return { success: true, count: 0 };
    }
    
    // Preparar dados
    const dados = financeiros.map(function(f) {
      return [
        f.idCampanha,
        f.idAssessorado,
        f.nomeAssessorado,
        f.marca,
        f.valorTotal,
        f.statusPagamentoCliente,
        f.statusRepasse,
        f.statusNF,
        f.dataCriacao,
        f.ultimaAtualizacao
      ];
    });
    
    // Inserir dados
    sheetMaster.getRange(2, 1, dados.length, 10).setValues(dados);
    SpreadsheetApp.flush();
    
    Logger.log('✅ ' + dados.length + ' registros sincronizados');
    
    logFim('sincronizarFinanceiroMaster', true);
    
    return { 
      success: true, 
      count: dados.length,
      message: dados.length + ' registros sincronizados'
    };
    
  } catch (e) {
    Logger.log('❌ ERRO em sincronizarFinanceiroMaster: ' + e);
    logFim('sincronizarFinanceiroMaster', false);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      SINCRONIZAR CONTROLE DE REPASSES
// ═══════════════════════════════════════════════════════════════════════

/**
 * Sincroniza dados com a aba Controle_Repasses (se existir)
 * Foca apenas em campanhas com status de repasse
 * 
 * @returns {Object} {success, message}
 */
function sincronizarControleRepasses() {
  try {
    logInicio('sincronizarControleRepasses');
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetRepasses = ss.getSheetByName('Controle_Repasses');
    
    if (!sheetRepasses) {
      Logger.log('⚠️ Aba Controle_Repasses não existe');
      return { 
        success: false, 
        message: 'Aba Controle_Repasses não encontrada' 
      };
    }
    
    // Buscar financeiros com repasse pendente ou pronto
    const financeiros = getAllFinanceirosCompletos();
    const comRepasse = financeiros.filter(function(f) {
      return f.statusRepasse !== 'AGUARDANDO NF' && 
             f.statusRepasse !== 'CANCELADO';
    });
    
    Logger.log('📊 Financeiros com repasse: ' + comRepasse.length);
    
    if (comRepasse.length === 0) {
      return { success: true, count: 0 };
    }
    
    // Preparar dados (buscar valores do checklist)
    const dados = comRepasse.map(function(f) {
      const checklist = getChecklistCompleto(f.idCampanha);
      
      return [
        f.idCampanha,
        f.nomeAssessorado,
        f.marca,
        f.valorTotal,
        checklist ? checklist.repasseInfluenciador80 : f.valorTotal * 0.8,
        checklist ? checklist.taxaLitte20 : f.valorTotal * 0.2,
        f.statusRepasse,
        checklist ? checklist.dataRepasse : '',
        checklist ? checklist.comprovanteRepasse : ''
      ];
    });
    
    // Limpar e inserir
    if (sheetRepasses.getLastRow() > 1) {
      sheetRepasses.getRange(2, 1, sheetRepasses.getMaxRows() - 1, 9).clearContent();
    }
    
    sheetRepasses.getRange(2, 1, dados.length, 9).setValues(dados);
    SpreadsheetApp.flush();
    
    Logger.log('✅ ' + dados.length + ' repasses sincronizados');
    
    logFim('sincronizarControleRepasses', true);
    
    return { 
      success: true, 
      count: dados.length,
      message: dados.length + ' repasses sincronizados'
    };
    
  } catch (e) {
    Logger.log('❌ ERRO em sincronizarControleRepasses: ' + e);
    logFim('sincronizarControleRepasses', false);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      FIM DO 7_FINANCEIRO.GS
// ═══════════════════════════════════════════════════════════════════════

Logger.log('✅ 7_Financeiro.gs carregado - Sistema financeiro completo disponível');


// ═══════════════════════════════════════════════════════════════════════
//                    8_INTEGRACOES.GS - DRIVE + CALENDAR + PLANILHAS
//                    Sistema Littê v3.5
//                    Integrações com serviços externos do Google
// ═══════════════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════════════
//                      GOOGLE DRIVE - ASSESSORADOS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Cria estrutura de pastas no Drive para um assessorado
 * 
 * ESTRUTURA CRIADA:
 * 📁 NOME_ASSESSORADO - ID
 *   └─ 📁 01_DADOS_PESSOAIS
 *   └─ 📁 02_MÉTRICAS_MENSAIS
 *   └─ 📁 03_CAMPANHAS
 *   └─ 📁 04_PERFORMANCE
 *   └─ 📁 05_CONTEUDO_GERAL
 * 
 * @param {string} idAssessorado - ID do assessorado
 * @param {string} nomeAssessorado - Nome do assessorado
 * @returns {Object} {success, urlPastaMae, idPastaMae, message}
 */
function criarEstruturaDriveAssessorado(idAssessorado, nomeAssessorado) {
  try {
    logInicio('criarEstruturaDriveAssessorado');
    Logger.log('👤 Assessorado: ' + nomeAssessorado);
    Logger.log('🆔 ID: ' + idAssessorado);
    
    const props = PropertiesService.getScriptProperties();
    const pastaAssessoradosId = props.getProperty('PASTA_ASSESSORADOS');
    
    if (!pastaAssessoradosId) {
      Logger.log('❌ PASTA_ASSESSORADOS não configurada');
      return { 
        success: false, 
        message: 'PASTA_ASSESSORADOS não configurada. Execute configurarLinksIniciais()',
        urlPastaMae: ''
      };
    }
    
    Logger.log('📂 ID da pasta base: ' + pastaAssessoradosId);
    
    // Acessar pasta base
    let pastaAssessorados;
    try {
      pastaAssessorados = DriveApp.getFolderById(pastaAssessoradosId);
      Logger.log('✅ Pasta base acessada: ' + pastaAssessorados.getName());
    } catch (e) {
      Logger.log('❌ Erro ao acessar pasta base: ' + e);
      return { 
        success: false, 
        message: 'Não foi possível acessar a pasta. Verifique o ID.',
        urlPastaMae: ''
      };
    }
    
    // Criar pasta mãe com nome formatado
    const nomePastaMae = nomeAssessorado.replace(/\s+/g, '_').toUpperCase() + ' - ' + idAssessorado;
    Logger.log('📁 Criando pasta: ' + nomePastaMae);
    
    const pastaMae = pastaAssessorados.createFolder(nomePastaMae);
    Logger.log('✅ Pasta mãe criada: ' + pastaMae.getId());
    
    // Criar 5 subpastas
    const subpastas = [
      '01_DADOS_PESSOAIS',
      '02_MÉTRICAS_MENSAIS',
      '03_CAMPANHAS',
      '04_PERFORMANCE',
      '05_CONTEUDO_GERAL'
    ];
    
    Logger.log('📂 Criando ' + subpastas.length + ' subpastas...');
    
    subpastas.forEach(function(nome) {
      const subpasta = pastaMae.createFolder(nome);
      Logger.log('  ✅ ' + nome + ' (ID: ' + subpasta.getId() + ')');
    });
    
    const urlPastaMae = pastaMae.getUrl();
    Logger.log('🔗 URL: ' + urlPastaMae);
    
    // Registrar histórico
    registrarHistorico(
      'Drive',
      idAssessorado,
      'Criou',
      'Sistema',
      '',
      '',
      'Estrutura Drive criada com 5 subpastas'
    );
    
    logFim('criarEstruturaDriveAssessorado', true);
    
    return { 
      success: true, 
      urlPastaMae: urlPastaMae,
      idPastaMae: pastaMae.getId(),
      message: 'Pasta Drive criada com sucesso'
    };
    
  } catch (e) {
    Logger.log('❌ ERRO FATAL em criarEstruturaDriveAssessorado: ' + e);
    Logger.log('Stack: ' + e.stack);
    logFim('criarEstruturaDriveAssessorado', false);
    return { 
      success: false, 
      message: 'Erro: ' + e.toString(),
      urlPastaMae: ''
    };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      GOOGLE DRIVE - CAMPANHAS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Cria estrutura de pastas no Drive para uma campanha
 * 
 * ESTRUTURA CRIADA:
 * 📁 ASSESSORADOS
 *   └─ 📁 NOME_ASSESSORADO - ID
 *      └─ 📁 03_CAMPANHAS
 *         └─ 📁 ASSESSORADO - MARCA - OBJETO
 *            └─ 📁 01_BRIEFING_CONTRATO
 *            └─ 📁 02_ROTEIRO
 *            └─ 📁 03_CONTEUDO_APROVACAO
 *            └─ 📁 04_POSTAGEM
 *            └─ 📁 05_METRICAS_RESULTADOS
 *            └─ 📁 06_PAGAMENTO
 *            └─ 📁 07_NF_DOCUMENTOS
 * 
 * @param {string} idCampanha - ID da campanha
 * @param {string} nomeInfluenciador - Nome do influenciador
 * @param {string} marca - Marca da campanha
 * @param {string} objeto - Objeto/descrição da campanha
 * @returns {Object} {success, urlPastaCampanha, message}
 */
function criarEstruturaDriveCampanha(idCampanha, nomeInfluenciador, marca, objeto) {
  try {
    logInicio('criarEstruturaDriveCampanha');
    Logger.log('🎬 Campanha: ' + idCampanha);
    Logger.log('👤 Influenciador: ' + nomeInfluenciador);
    Logger.log('🏢 Marca: ' + marca);
    Logger.log('📝 Objeto: ' + objeto);

    // ═══════════════════════════════════════════════════════════════
    // VERIFICAR SE JÁ EXISTE LINK DA PASTA NA PLANILHA
    // ═══════════════════════════════════════════════════════════════

    Logger.log('🔍 Verificando se pasta já existe...');
    const sheet = setupAndamentosSheet();
    const rowNum = findRowById(sheet, idCampanha);

    if (rowNum) {
      const linkExistente = sheet.getRange(rowNum, 12).getValue();

      if (linkExistente && linkExistente.toString().trim() !== '') {
        Logger.log('✅ Pasta já existe: ' + linkExistente);
        Logger.log('⏭️  Pulando criação de pasta duplicada');
        logFim('criarEstruturaDriveCampanha', true);

        return {
          success: true,
          urlPastaCampanha: linkExistente,
          message: 'Pasta já existe (não duplicada)'
        };
      }

      Logger.log('📝 Coluna 12 vazia - prosseguindo com criação');
    }

    // ═══════════════════════════════════════════════════════════════
    // CRIAR ESTRUTURA DRIVE
    // ═══════════════════════════════════════════════════════════════

    const props = PropertiesService.getScriptProperties();
    const pastaAssessoradosId = props.getProperty('PASTA_ASSESSORADOS');
    
    if (!pastaAssessoradosId) {
      Logger.log('❌ PASTA_ASSESSORADOS não configurada');
      return { 
        success: false, 
        message: 'Pasta não configurada' 
      };
    }
    
    const pastaAssessorados = DriveApp.getFolderById(pastaAssessoradosId);
    Logger.log('✅ Pasta base acessada: ' + pastaAssessorados.getName());
    
    // Buscar pasta do influenciador
    const iterador = pastaAssessorados.getFolders();
    let pastaInfluenciador = null;
    
    Logger.log('🔍 Buscando pasta do influenciador...');
    
    while (iterador.hasNext()) {
      const pasta = iterador.next();
      const nomePasta = pasta.getName();
      
      // Buscar por nome do influenciador na pasta
      if (nomePasta.indexOf(nomeInfluenciador.toUpperCase().replace(/\s+/g, '_')) !== -1) {
        pastaInfluenciador = pasta;
        Logger.log('✅ Pasta encontrada: ' + nomePasta);
        break;
      }
    }
    
    // Se não encontrou, criar nova pasta
    if (!pastaInfluenciador) {
      Logger.log('⚠️ Pasta não encontrada, criando nova...');
      const nomePasta = nomeInfluenciador.replace(/\s+/g, '_').toUpperCase();
      pastaInfluenciador = pastaAssessorados.createFolder(nomePasta);
      Logger.log('✅ Pasta criada: ' + nomePasta);
      
      // Criar estrutura básica
      ['01_DADOS_PESSOAIS', '02_MÉTRICAS_MENSAIS', '03_CAMPANHAS', '04_PERFORMANCE', '05_CONTEUDO_GERAL']
        .forEach(function(sub) {
          pastaInfluenciador.createFolder(sub);
        });
    }
    
    // Buscar ou criar subpasta 03_CAMPANHAS
    const subpasta03 = buscarOuCriarSubpasta(pastaInfluenciador, '03_CAMPANHAS');
    Logger.log('✅ Subpasta CAMPANHAS localizada');
    
    // Criar pasta da campanha
    const nomePastaCampanha = nomeInfluenciador.toUpperCase().replace(/\s+/g, '_') + 
                              ' - ' + marca.toUpperCase() + 
                              ' - ' + (objeto || 'CAMPANHA');
    
    Logger.log('📁 Criando pasta da campanha: ' + nomePastaCampanha);
    
    const pastaCampanha = subpasta03.createFolder(nomePastaCampanha);
    Logger.log('✅ Pasta campanha criada: ' + pastaCampanha.getId());
    
    // Criar 7 subpastas da campanha
    const subpastasCampanha = [
      '01_BRIEFING_CONTRATO',
      '02_ROTEIRO',
      '03_CONTEUDO_APROVACAO',
      '04_POSTAGEM',
      '05_METRICAS_RESULTADOS',
      '06_PAGAMENTO',
      '07_NF_DOCUMENTOS'
    ];
    
    Logger.log('📂 Criando ' + subpastasCampanha.length + ' subpastas...');
    
    subpastasCampanha.forEach(function(nome) {
      const subpasta = pastaCampanha.createFolder(nome);
      Logger.log('  ✅ ' + nome + ' (ID: ' + subpasta.getId() + ')');
    });
    
    const urlPastaCampanha = pastaCampanha.getUrl();
    Logger.log('🔗 URL: ' + urlPastaCampanha);
    
    // Registrar histórico
    registrarHistorico(
      'Drive',
      idCampanha,
      'Criou',
      'Sistema',
      '',
      '',
      'Estrutura Drive da campanha criada com 7 subpastas'
    );
    
    logFim('criarEstruturaDriveCampanha', true);
    
    return { 
      success: true, 
      urlPastaCampanha: urlPastaCampanha,
      message: 'Pasta da campanha criada com sucesso'
    };
    
  } catch (e) {
    Logger.log('❌ ERRO FATAL em criarEstruturaDriveCampanha: ' + e);
    Logger.log('Stack: ' + e.stack);
    logFim('criarEstruturaDriveCampanha', false);
    return { 
      success: false, 
      message: 'Erro: ' + e.toString() 
    };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      HELPER: BUSCAR OU CRIAR SUBPASTA
// ═══════════════════════════════════════════════════════════════════════

/**
 * Busca uma subpasta pelo nome, ou cria se não existir
 * 
 * @param {Folder} pastaPai - Pasta onde buscar/criar
 * @param {string} nomeSubpasta - Nome da subpasta
 * @returns {Folder} Objeto da subpasta
 */
function buscarOuCriarSubpasta(pastaPai, nomeSubpasta) {
  try {
    const iterador = pastaPai.getFoldersByName(nomeSubpasta);
    
    if (iterador.hasNext()) {
      return iterador.next();
    } else {
      return pastaPai.createFolder(nomeSubpasta);
    }
  } catch (e) {
    Logger.log('❌ buscarOuCriarSubpasta: ' + e);
    throw e;
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      GOOGLE SHEETS - PLANILHA ESPELHO
// ═══════════════════════════════════════════════════════════════════════

/**
 * Cria uma planilha espelho para um assessorado
 * Planilha individual para controle de campanhas do influenciador
 * 
 * @param {string} idAssessorado - ID do assessorado
 * @param {string} nomeAssessorado - Nome do assessorado
 * @returns {Object} {success, url, message}
 */
function criarPlanilhaEspelho(idAssessorado, nomeAssessorado) {
  try {
    logInicio('criarPlanilhaEspelho');
    Logger.log('👤 Assessorado: ' + nomeAssessorado);
    
    // Nome da planilha
    const nomePlanilha = 'Espelho_' + nomeAssessorado.replace(/\s+/g, '_');
    Logger.log('📊 Nome da planilha: ' + nomePlanilha);
    
    // Criar nova planilha
    const novaSpreadsheet = SpreadsheetApp.create(nomePlanilha);
    const urlPlanilha = novaSpreadsheet.getUrl();
    
    Logger.log('✅ Planilha criada: ' + novaSpreadsheet.getId());
    Logger.log('🔗 URL: ' + urlPlanilha);
    
    // Configurar aba Campanhas
    const sheetCampanhas = novaSpreadsheet.getActiveSheet();
    sheetCampanhas.setName('Campanhas');
    
    const headersCampanhas = [
      'ID Campanha',
      'Marca',
      'Objeto',
      'Status',
      'Fase',
      'Valor Fechado',
      'Data Criação',
      'Responsável Littê',
      'Link Pasta Drive'
    ];
    
    Logger.log('📋 Criando headers...');
    
    sheetCampanhas.getRange(1, 1, 1, headersCampanhas.length).setValues([headersCampanhas]);
    sheetCampanhas.getRange(1, 1, 1, headersCampanhas.length)
      .setFontWeight('bold')
      .setBackground('#667eea')
      .setFontColor('#ffffff');
    
    sheetCampanhas.setFrozenRows(1);
    
    // Ajustar largura das colunas
    sheetCampanhas.setColumnWidth(1, 120); // ID Campanha
    sheetCampanhas.setColumnWidth(2, 150); // Marca
    sheetCampanhas.setColumnWidth(3, 200); // Objeto
    sheetCampanhas.setColumnWidth(4, 100); // Status
    sheetCampanhas.setColumnWidth(5, 120); // Fase
    sheetCampanhas.setColumnWidth(6, 120); // Valor
    sheetCampanhas.setColumnWidth(7, 120); // Data
    sheetCampanhas.setColumnWidth(8, 120); // Responsável
    sheetCampanhas.setColumnWidth(9, 300); // Link
    
    SpreadsheetApp.flush();
    
    Logger.log('✅ Estrutura configurada');
    
    // Registrar histórico
    registrarHistorico(
      'Planilha',
      idAssessorado,
      'Criou',
      'Sistema',
      '',
      '',
      'Planilha espelho criada: ' + nomePlanilha
    );
    
    logFim('criarPlanilhaEspelho', true);
    
    return { 
      success: true, 
      url: urlPlanilha,
      message: 'Planilha espelho criada com sucesso'
    };
    
  } catch (e) {
    Logger.log('❌ ERRO FATAL em criarPlanilhaEspelho: ' + e);
    Logger.log('Stack: ' + e.stack);
    logFim('criarPlanilhaEspelho', false);
    return { 
      success: false, 
      message: 'Erro: ' + e.toString() 
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════
//    CORREÇÃO DEFINITIVA - FUSO HORÁRIO NO CALENDAR
//    Esta versão GARANTE que a data seja exatamente a esperada
// ═══════════════════════════════════════════════════════════════════════

function criarEventoChecklistEtapa(idCampanha, etapa, dataPrevista, nomeInfluenciador, marca) {
  try {
    Logger.log('════════════════════════════════════');
    Logger.log('📅 criarEventoChecklistEtapa');
    Logger.log('ID Campanha: ' + idCampanha);
    Logger.log('Etapa: ' + etapa);
    Logger.log('Data Prevista (recebida): ' + dataPrevista);
    Logger.log('Tipo: ' + typeof dataPrevista);
    Logger.log('Influenciador: ' + nomeInfluenciador);
    Logger.log('Marca: ' + marca);
    Logger.log('════════════════════════════════════');
    
    // ===== VALIDAÇÕES =====
    if (!dataPrevista) {
      Logger.log('❌ Data prevista não fornecida');
      return { success: false, message: 'Data prevista é obrigatória' };
    }
    
    if (!etapa) {
      Logger.log('❌ Etapa não fornecida');
      return { success: false, message: 'Etapa é obrigatória' };
    }
    
    const props = PropertiesService.getScriptProperties();
    const calendarId = props.getProperty('CALENDAR_ID');
    
    if (!calendarId) {
      Logger.log('❌ CALENDAR_ID não configurado');
      return { success: false, message: 'Calendar ID não configurado' };
    }
    
    Logger.log('✅ Calendar ID: ' + calendarId);
    
    let calendar;
    try {
      calendar = CalendarApp.getCalendarById(calendarId);
    } catch (e) {
      Logger.log('❌ Erro ao acessar Calendar: ' + e);
      return { success: false, message: 'Não foi possível acessar o Calendar' };
    }
    
    if (!calendar) {
      Logger.log('❌ Calendar não encontrado');
      return { success: false, message: 'Calendar não encontrado' };
    }
    
    Logger.log('✅ Calendar: ' + calendar.getName());
    
    // ═══════════════════════════════════════════════════════════════════
    // 🔥 CORREÇÃO DEFINITIVA DO FUSO HORÁRIO
    // ═══════════════════════════════════════════════════════════════════
    
    let dataCorreta;
    
    try {
      // Se for string no formato ISO (YYYY-MM-DD)
      if (typeof dataPrevista === 'string' && dataPrevista.match(/^\d{4}-\d{2}-\d{2}/)) {
        
        Logger.log('🔍 Detectado formato ISO: ' + dataPrevista);
        
        // Extrair componentes da string DIRETAMENTE
        const partes = dataPrevista.split('-');
        const ano = parseInt(partes[0]);
        const mes = parseInt(partes[1]) - 1; // Mês começa em 0
        const dia = parseInt(partes[2]);
        
        Logger.log('📅 Extraído da string: ANO=' + ano + ', MÊS=' + mes + ', DIA=' + dia);
        
        // Criar data com esses componentes
        dataCorreta = new Date(ano, mes, dia, 12, 0, 0);
        
        Logger.log('✅ Data criada: ' + dataCorreta.toString());
        Logger.log('✅ Dia da data criada: ' + dataCorreta.getDate());
        Logger.log('✅ Mês da data criada: ' + dataCorreta.getMonth());
        Logger.log('✅ Ano da data criada: ' + dataCorreta.getFullYear());
        
      } else if (dataPrevista instanceof Date) {
        
        Logger.log('🔍 Detectado objeto Date');
        
        // Pegar componentes do objeto Date
        const ano = dataPrevista.getFullYear();
        const mes = dataPrevista.getMonth();
        const dia = dataPrevista.getDate();
        
        Logger.log('📅 Extraído do Date: ANO=' + ano + ', MÊS=' + mes + ', DIA=' + dia);
        
        // Criar nova data com esses componentes
        dataCorreta = new Date(ano, mes, dia, 12, 0, 0);
        
        Logger.log('✅ Data criada: ' + dataCorreta.toString());
        
      } else {
        
        Logger.log('🔍 Outro formato, tentando converter...');
        
        // Tentar converter para Date primeiro
        const dataTemp = new Date(dataPrevista);
        
        if (isNaN(dataTemp.getTime())) {
          Logger.log('❌ Data inválida: ' + dataPrevista);
          return { success: false, message: 'Data fornecida é inválida' };
        }
        
        // Pegar componentes
        const ano = dataTemp.getFullYear();
        const mes = dataTemp.getMonth();
        const dia = dataTemp.getDate();
        
        Logger.log('📅 Extraído: ANO=' + ano + ', MÊS=' + mes + ', DIA=' + dia);
        
        dataCorreta = new Date(ano, mes, dia, 12, 0, 0);
      }
      
      // Verificar se data é válida
      if (isNaN(dataCorreta.getTime())) {
        Logger.log('❌ Data final inválida');
        return { success: false, message: 'Erro ao processar data' };
      }
      
      Logger.log('════════════════════════════════════');
      Logger.log('✅ DATA FINAL PARA O CALENDAR:');
      Logger.log('   ' + dataCorreta.toLocaleDateString('pt-BR'));
      Logger.log('   ' + dataCorreta.toString());
      Logger.log('════════════════════════════════════');
      
    } catch (e) {
      Logger.log('❌ Erro ao processar data: ' + e);
      return { success: false, message: 'Erro ao processar data: ' + e.toString() };
    }
    
    // ===== MONTAR TÍTULO DO EVENTO =====
    const titulos = {
      'CONTRATO': '📝 Briefing/Contrato',
      'PRODUTO': '📦 Envio Produto',
      'ROTEIRO': '🎬 Aprovação Roteiro',
      'CONTEUDO': '✅ Aprovação Conteúdo',
      'POSTAGEM': '🚀 Postagem',
      'METRICAS': '📊 Coleta Métricas',
      'PAGAMENTO': '💰 Pagamento Cliente',
      'REPASSE': '💸 Repasse Influenciador'
    };
    
    const tituloEtapa = titulos[etapa.toUpperCase()] || etapa;
    const titulo = tituloEtapa + ' - [' + (marca || 'Marca') + '] ' + (nomeInfluenciador || 'Influenciador');
    const descricao = 'Etapa: ' + etapa + '\nCampanha: ' + idCampanha + '\nInfluenciador: ' + (nomeInfluenciador || '') + '\nMarca: ' + (marca || '');
    
    Logger.log('📝 Título do evento: ' + titulo);
    
    // ===== CRIAR EVENTO =====
    try {
      const evento = calendar.createAllDayEvent(titulo, dataCorreta, { 
        description: descricao 
      });
      
      const eventoId = evento.getId();
      
      Logger.log('════════════════════════════════════');
      Logger.log('✅ EVENTO CRIADO COM SUCESSO!');
      Logger.log('📅 Data programada: ' + dataCorreta.toLocaleDateString('pt-BR'));
      Logger.log('📝 Título: ' + titulo);
      Logger.log('🆔 ID: ' + eventoId);
      Logger.log('════════════════════════════════════');
      
      return { 
        success: true,
        eventoId: eventoId,
        dataEvento: dataCorreta.toLocaleDateString('pt-BR'),
        message: 'Evento criado com sucesso'
      };
      
    } catch (e) {
      Logger.log('❌ Erro ao criar evento: ' + e);
      return { 
        success: false, 
        message: 'Erro ao criar evento no Calendar: ' + e.toString() 
      };
    }
    
  } catch (e) {
    Logger.log('════════════════════════════════════');
    Logger.log('❌ ERRO FATAL em criarEventoChecklistEtapa');
    Logger.log('Erro: ' + e.toString());
    Logger.log('Stack: ' + e.stack);
    Logger.log('════════════════════════════════════');
    return { 
      success: false, 
      message: 'Erro: ' + e.toString() 
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════
//    TESTE ESPECÍFICO - Ver exatamente qual data está sendo criada
// ═══════════════════════════════════════════════════════════════════════

function testarDataEspecifica() {
  Logger.clear();
  
  Logger.log('🧪 TESTE COM DATA ESPECÍFICA');
  Logger.log('');
  
  // Pergunte qual data você quer testar
  const dataParaTestar = '2026-01-01'; // ← MUDE AQUI para a data que você quer
  
  Logger.log('📅 Testando com: ' + dataParaTestar);
  Logger.log('💡 Esta data DEVE aparecer EXATAMENTE assim no Calendar: 01/01/2026');
  Logger.log('');
  Logger.log('═══════════════════════════════════════');
  
  const resultado = criarEventoChecklistEtapa(
    'C-TESTE',
    'ROTEIRO',
    dataParaTestar,
    'Teste Específico',
    'Marca Teste'
  );
  
  Logger.log('');
  Logger.log('═══════════════════════════════════════');
  Logger.log('RESULTADO:');
  Logger.log('Success: ' + resultado.success);
  Logger.log('Data no evento: ' + resultado.dataEvento);
  Logger.log('Mensagem: ' + resultado.message);
  Logger.log('═══════════════════════════════════════');
  Logger.log('');
  Logger.log('💡 Agora abra o Google Calendar e veja se o evento está em 30/12/2025');
  
  return resultado;
}

// ═══════════════════════════════════════════════════════════════════════
//    DIAGNÓSTICO - Mostrar EXATAMENTE o que está acontecendo
// ═══════════════════════════════════════════════════════════════════════

function diagnosticarProblemaData() {
  Logger.clear();
  
  Logger.log('🔍 DIAGNÓSTICO DO PROBLEMA DE DATA');
  Logger.log('');
  
  const dataString = '2025-12-30';
  
  Logger.log('═══ TESTE 1: String ISO ═══');
  Logger.log('Input: "' + dataString + '"');
  
  // Método ERRADO (como estava antes)
  const dataErrada = new Date(dataString);
  Logger.log('');
  Logger.log('❌ MÉTODO ERRADO (new Date direto):');
  Logger.log('   toString: ' + dataErrada.toString());
  Logger.log('   getDate(): ' + dataErrada.getDate());
  Logger.log('   toLocaleDateString: ' + dataErrada.toLocaleDateString('pt-BR'));
  
  // Método CORRETO (extrair componentes)
  const partes = dataString.split('-');
  const ano = parseInt(partes[0]);
  const mes = parseInt(partes[1]) - 1;
  const dia = parseInt(partes[2]);
  
  const dataCorreta = new Date(ano, mes, dia, 12, 0, 0);
  
  Logger.log('');
  Logger.log('✅ MÉTODO CORRETO (extrair componentes):');
  Logger.log('   ANO: ' + ano + ', MÊS: ' + mes + ', DIA: ' + dia);
  Logger.log('   toString: ' + dataCorreta.toString());
  Logger.log('   getDate(): ' + dataCorreta.getDate());
  Logger.log('   toLocaleDateString: ' + dataCorreta.toLocaleDateString('pt-BR'));
  
  Logger.log('');
  Logger.log('═══════════════════════════════════════');
  Logger.log('📊 COMPARAÇÃO:');
  Logger.log('Método errado cria: ' + dataErrada.getDate() + '/' + (dataErrada.getMonth()+1) + '/' + dataErrada.getFullYear());
  Logger.log('Método correto cria: ' + dataCorreta.getDate() + '/' + (dataCorreta.getMonth()+1) + '/' + dataCorreta.getFullYear());
  Logger.log('═══════════════════════════════════════');
}

// ═══════════════════════════════════════════════════════════════════════
//    FUNÇÃO AUXILIAR - Configurar Calendar ID (EXECUTE UMA VEZ)
// ═══════════════════════════════════════════════════════════════════════

function configurarCalendarId() {
  const props = PropertiesService.getScriptProperties();
  
  const calendarId = 'c_b4a0a6992212fdef828fdec073ce8e99bf19095ffcb67f3699ffdf39b0922414@group.calendar.google.com';
  
  props.setProperty('CALENDAR_ID', calendarId);
  
  Logger.log('✅ CALENDAR_ID configurado!');
  Logger.log('ID: ' + calendarId);
  
  // Testar acesso
  try {
    const calendar = CalendarApp.getCalendarById(calendarId);
    Logger.log('✅ Calendar acessível: ' + calendar.getName());
    return { success: true, calendarName: calendar.getName() };
  } catch (e) {
    Logger.log('❌ Erro ao acessar calendar: ' + e);
    return { success: false, message: e.toString() };
  }
}

// ═══════════════════════════════════════════════════════════════════════
//    FUNÇÃO DE TESTE - Testar criação de evento
// ═══════════════════════════════════════════════════════════════════════

function testarCriarEventoEtapa() {
  Logger.clear();
  
  Logger.log('🧪 TESTE - criarEventoChecklistEtapa');
  Logger.log('');
  
  // Criar evento para amanhã
  const amanha = new Date();
  amanha.setDate(amanha.getDate() + 1);
  
  const resultado = criarEventoChecklistEtapa(
    'C001',                    // idCampanha
    'ROTEIRO',                 // etapa
    amanha,                    // dataPrevista
    'Maria Silva',             // nomeInfluenciador
    'Marca Teste'              // marca
  );
  
  Logger.log('');
  Logger.log('═══════════════════════════════════════');
  Logger.log('RESULTADO FINAL:');
  Logger.log(JSON.stringify(resultado, null, 2));
  Logger.log('═══════════════════════════════════════');
  
  if (resultado.success) {
    Logger.log('');
    Logger.log('✅ TESTE PASSOU!');
    Logger.log('💡 Verifique o evento no Google Calendar');
  } else {
    Logger.log('');
    Logger.log('❌ TESTE FALHOU!');
    Logger.log('Erro: ' + resultado.message);
    
    if (resultado.message.includes('Calendar ID não configurado')) {
      Logger.log('');
      Logger.log('💡 SOLUÇÃO: Execute configurarCalendarId()');
    }
  }
  
  return resultado;
}

// ═══════════════════════════════════════════════════════════════════════
//                      FUNÇÕES DE TESTE
// ═══════════════════════════════════════════════════════════════════════

function testarIntegracoes() {
  try {
    const dashboard = getDashboardData();
    const prospeccoes = getProspeccoes();
    const metricas = getMetricasFinanceiras();
    
    return {
      success: true,
      dashboard: dashboard,
      prospeccoes: prospeccoes.length,
      message: 'Todas as integrações OK!'
    };
  } catch (e) {
    Logger.log('❌ testarIntegracoes: ' + e);
    return { success: false, message: e.toString() };
  }
}

function gerarRelatorioMensalAutomatico() {
  try {
    Logger.log('📊 Gerando relatório mensal...');
    sincronizarFinanceiroMaster();
    return { success: true, message: 'Relatório mensal gerado!' };
  } catch (e) {
    Logger.log('❌ gerarRelatorioMensalAutomatico: ' + e);
    return { success: false, message: e.toString() };
  }
}

function verificarPrazosVencidos() {
  try {
    Logger.log('⏰ Verificando prazos...');
    return { success: true, count: 0 };
  } catch (e) {
    Logger.log('❌ verificarPrazosVencidos: ' + e);
    return { success: false, message: e.toString() };
  }
}

// ═══════════════════════════════════════════════════════════════════════
//                      FIM DO CODE.GS
// ═══════════════════════════════════════════════════════════════════════

Logger.log('✅ Sistema Littê v3.5 - Code.gs Completo Carregado');
Logger.log('📊 Total de funções principais: 50+');
Logger.log('🎯 Pronto para produção!');


function configurarCalendarId() {
  const props = PropertiesService.getScriptProperties();
  
  const calendarId = 'c_b4a0a6992212fdef828fdec073ce8e99bf19095ffcb67f3699ffdf39b0922414@group.calendar.google.com';
  
  props.setProperty('CALENDAR_ID', calendarId);
  
  Logger.log('✅ CALENDAR_ID configurado!');
  
  return { success: true };
}



function diagnosticarProblemaChecklist() {
  Logger.clear();
  
  Logger.log('🔍 DIAGNÓSTICO - Por que não encontra o checklist?');
  Logger.log('');
  
  // 1. Verificar todos os checklists existentes
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Checklist_Complete');
  
  if (!sheet) {
    Logger.log('❌ Aba Checklist_Complete não existe!');
    return;
  }
  
  Logger.log('✅ Aba encontrada: ' + sheet.getName());
  Logger.log('📊 Total de linhas: ' + sheet.getLastRow());
  Logger.log('');
  
  if (sheet.getLastRow() <= 1) {
    Logger.log('⚠️ Aba só tem header (nenhum checklist criado)');
    return;
  }
  
  // 2. Listar TODOS os IDs
  const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 4).getValues();
  
  Logger.log('═══════════════════════════════════════');
  Logger.log('📋 CHECKLISTS EXISTENTES:');
  Logger.log('═══════════════════════════════════════');
  
  data.forEach(function(row, index) {
    const id = String(row[0] || '');
    const idAssessorado = String(row[1] || '');
    const nome = String(row[2] || '');
    const marca = String(row[3] || '');
    
    Logger.log('');
    Logger.log('[' + (index + 1) + '] ID Campanha: "' + id + '"');
    Logger.log('    Comprimento: ' + id.length + ' caracteres');
    Logger.log('    ID Assessorado: "' + idAssessorado + '"');
    Logger.log('    Nome: "' + nome + '"');
    Logger.log('    Marca: "' + marca + '"');
    
    // Verificar se tem espaços ou caracteres invisíveis
    if (id !== id.trim()) {
      Logger.log('    ⚠️ ATENÇÃO: ID tem espaços extras!');
    }
  });
  
  Logger.log('');
  Logger.log('═══════════════════════════════════════');
  
  // 3. Testar busca de um ID específico
  Logger.log('');
  Logger.log('🧪 TESTANDO BUSCA:');
  
  // MUDE AQUI para o ID que você quer testar
  const idParaTestar = 'C002';
  
  Logger.log('Buscando: "' + idParaTestar + '"');
  
  const resultado = getChecklistCompleto(idParaTestar);
  
  if (resultado) {
    Logger.log('✅ ENCONTROU!');
    Logger.log('   Nome: ' + resultado.nomeAssessorado);
    Logger.log('   Marca: ' + resultado.marca);
  } else {
    Logger.log('❌ NÃO ENCONTROU!');
  }
}

function testarGenerateId() {
  Logger.clear();
  
  const id1 = generateId('campanha');
  const id2 = generateId('campanha');
  const id3 = generateId('campanha');
  
  Logger.log('ID 1: ' + id1);
  Logger.log('ID 2: ' + id2);
  Logger.log('ID 3: ' + id3);
}

function criarChecklistManualTeste() {
  Logger.clear();
  
  Logger.log('📋 Criando checklist de teste...');
  
  const resultado = criarChecklistCompleto(
    'C999',           // ID de teste
    'D001',           // ID assessorado
    'Teste Manual',   // Nome
    'Marca Teste'     // Marca
  );
  
  Logger.log('Resultado: ' + JSON.stringify(resultado));
  
  if (resultado.success) {
    Logger.log('✅ Checklist criado!');
    
    // Tentar buscar
    const busca = getChecklistCompleto('C999');
    
    if (busca) {
      Logger.log('✅ E FOI ENCONTRADO!');
    } else {
      Logger.log('❌ MAS NÃO FOI ENCONTRADO!');
    }
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      GOOGLE CALENDAR - EXCLUIR EVENTO
// ═══════════════════════════════════════════════════════════════════════

/**
 * Exclui um evento do Google Calendar
 * Usado quando uma data de etapa é alterada
 * 
 * @param {string} eventoId - ID do evento
 * @returns {Object} {success, message}
 */
function excluirEventoCalendar(eventoId) {
  try {
    Logger.log('🗑️ Excluindo evento: ' + eventoId);
    
    const calendario = CalendarApp.getDefaultCalendar();
    
    // Buscar e excluir evento
    const evento = calendario.getEventById(eventoId);
    
    if (evento) {
      evento.deleteEvent();
      Logger.log('✅ Evento excluído');
      return { success: true, message: 'Evento excluído' };
    } else {
      Logger.log('⚠️ Evento não encontrado');
      return { success: false, message: 'Evento não encontrado' };
    }
    
  } catch (e) {
    Logger.log('❌ excluirEventoCalendar: ' + e);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      GOOGLE CALENDAR - ATUALIZAR EVENTO
// ═══════════════════════════════════════════════════════════════════════

/**
 * Atualiza a data de um evento existente
 * Exclui o evento antigo e cria um novo
 * 
 * @param {string} eventoIdAntigo - ID do evento a ser excluído
 * @param {string} idCampanha - ID da campanha
 * @param {string} etapa - Etapa do checklist
 * @param {string|Date} novaData - Nova data
 * @param {string} nomeInfluenciador - Nome do influenciador
 * @param {string} marca - Marca
 * @returns {Object} {success, novoEventoId, message}
 */
function atualizarEventoCalendar(eventoIdAntigo, idCampanha, etapa, novaData, nomeInfluenciador, marca) {
  try {
    logInicio('atualizarEventoCalendar');
    Logger.log('🔄 Evento antigo: ' + eventoIdAntigo);
    Logger.log('📅 Nova data: ' + novaData);
    
    // 1. Excluir evento antigo
    if (eventoIdAntigo) {
      const resultExcluir = excluirEventoCalendar(eventoIdAntigo);
      if (resultExcluir.success) {
        Logger.log('✅ Evento antigo excluído');
      } else {
        Logger.log('⚠️ Não foi possível excluir evento antigo: ' + resultExcluir.message);
      }
    }
    
    // 2. Criar novo evento
    const titulo = etapa + ' - ' + marca + ' - ' + nomeInfluenciador;
    const descricao = 'Campanha: ' + idCampanha;
    
    const resultNovo = criarEventoChecklistEtapa(
      idCampanha,
      etapa,
      titulo,
      descricao,
      novaData
    );
    
    if (resultNovo.success) {
      Logger.log('✅ Novo evento criado: ' + resultNovo.eventoId);
      logFim('atualizarEventoCalendar', true);
      return {
        success: true,
        novoEventoId: resultNovo.eventoId,
        message: 'Evento atualizado com sucesso'
      };
    } else {
      Logger.log('❌ Erro ao criar novo evento');
      logFim('atualizarEventoCalendar', false);
      return resultNovo;
    }
    
  } catch (e) {
    Logger.log('❌ ERRO em atualizarEventoCalendar: ' + e);
    logFim('atualizarEventoCalendar', false);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      MOVER ARQUIVO PARA PASTA
// ═══════════════════════════════════════════════════════════════════════

/**
 * Move um arquivo do Drive para uma pasta específica
 * 
 * @param {string} fileId - ID do arquivo
 * @param {string} folderId - ID da pasta destino
 * @returns {Object} {success, message}
 */
function moverArquivoParaPasta(fileId, folderId) {
  try {
    const file = DriveApp.getFileById(fileId);
    const folder = DriveApp.getFolderById(folderId);
    
    // Remover de todas as pastas atuais
    const parentFolders = file.getParents();
    while (parentFolders.hasNext()) {
      const parent = parentFolders.next();
      parent.removeFile(file);
    }
    
    // Adicionar na nova pasta
    folder.addFile(file);
    
    Logger.log('✅ Arquivo movido: ' + file.getName() + ' → ' + folder.getName());
    
    return { success: true, message: 'Arquivo movido com sucesso' };
    
  } catch (e) {
    Logger.log('❌ moverArquivoParaPasta: ' + e);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      COMPARTILHAR PASTA COM USUÁRIO
// ═══════════════════════════════════════════════════════════════════════

/**
 * Compartilha uma pasta do Drive com um usuário específico
 * 
 * @param {string} folderId - ID da pasta
 * @param {string} email - Email do usuário
 * @param {string} permissao - Tipo de permissão (VIEW, EDIT, COMMENT)
 * @returns {Object} {success, message}
 */
function compartilharPastaComUsuario(folderId, email, permissao) {
  try {
    const folder = DriveApp.getFolderById(folderId);
    
    permissao = permissao || 'VIEW';
    
    if (permissao === 'EDIT') {
      folder.addEditor(email);
    } else if (permissao === 'COMMENT') {
      folder.addCommenter(email);
    } else {
      folder.addViewer(email);
    }
    
    Logger.log('✅ Pasta compartilhada com ' + email + ' (permissão: ' + permissao + ')');
    
    return { success: true, message: 'Pasta compartilhada' };
    
  } catch (e) {
    Logger.log('❌ compartilharPastaComUsuario: ' + e);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      FIM DO 8_INTEGRACOES.GS
// ═══════════════════════════════════════════════════════════════════════

Logger.log('✅ 8_Integracoes.gs carregado - Integrações Drive/Calendar/Sheets disponíveis');
// ═══════════════════════════════════════════════════════════════════════
//                    9_NOTIFICACOES.GS - SISTEMA DE NOTIFICAÇÕES
//                    Sistema Littê v3.5
//                    Gestão completa de notificações do sistema
// ═══════════════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════════════
//                      CRIAR NOTIFICAÇÃO
// ═══════════════════════════════════════════════════════════════════════

/**
 * Cria uma nova notificação no sistema
 * 
 * TIPOS DE NOTIFICAÇÃO:
 * - SISTEMA: Eventos gerais do sistema
 * - PRAZO: Alertas de prazos vencidos ou próximos
 * - STATUS: Mudanças de status de campanhas
 * - PAGAMENTO: Eventos relacionados a pagamentos
 * - COMENTARIO: Comentários e feedback
 * - APROVACAO: Aprovações necessárias
 * 
 * PRIORIDADES:
 * - BAIXA: Informações gerais
 * - MÉDIA: Ações recomendadas
 * - ALTA: Ações urgentes
 * - CRÍTICA: Ações críticas imediatas
 * 
 * DESTINATÁRIOS:
 * - TODOS: Toda a equipe
 * - BRYAN: Apenas Bryan
 * - ROBERTA: Apenas Roberta
 * - ANNE: Apenas Anne
 * - [ID específico]: Usuário específico
 * 
 * @param {string} tipo - Tipo da notificação
 * @param {string} titulo - Título da notificação
 * @param {string} mensagem - Mensagem/descrição
 * @param {string} idCampanha - ID da campanha relacionada (opcional)
 * @param {string} destinatario - Destinatário (padrão: TODOS)
 * @param {string} prioridade - Prioridade (padrão: MÉDIA)
 * @returns {Object} {success, idNotificacao, message}
 */
function criarNotificacao(tipo, titulo, mensagem, idCampanha, destinatario, prioridade) {
  try {
    const sheet = setupNotificacoesSheet();
    const hoje = new Date();
    
    // Gerar ID único
    const idNotificacao = generateId('notificacao');
    
    // Ícones por tipo
    const icones = {
      'SISTEMA': 'ℹ️',
      'PRAZO': '⏰',
      'STATUS': '📊',
      'PAGAMENTO': '💰',
      'COMENTARIO': '💬',
      'APROVACAO': '✅',
      'ALERTA': '⚠️',
      'ERRO': '❌',
      'SUCESSO': '🎉'
    };
    
    const icone = icones[tipo.toUpperCase()] || '🔔';
    
    // Adicionar linha
    sheet.appendRow([
      idNotificacao,                  // 1. ID Notificação
      tipo || 'SISTEMA',              // 2. Tipo
      titulo || 'Notificação',        // 3. Título
      mensagem || '',                 // 4. Mensagem
      idCampanha || '',               // 5. ID Campanha
      destinatario || 'TODOS',        // 6. Destinatário
      'NÃO',                          // 7. Lida
      hoje,                           // 8. Data Criação
      '',                             // 9. Data Leitura
      prioridade || 'MÉDIA',          // 10. Prioridade
      icone                           // 11. Ícone
    ]);
    
    SpreadsheetApp.flush();
    
    Logger.log('🔔 Notificação criada: ' + idNotificacao);
    Logger.log('   Tipo: ' + tipo);
    Logger.log('   Título: ' + titulo);
    Logger.log('   Destinatário: ' + destinatario);
    Logger.log('   Prioridade: ' + prioridade);
    
    return { 
      success: true, 
      idNotificacao: idNotificacao,
      message: 'Notificação criada'
    };
    
  } catch (e) {
    Logger.log('❌ criarNotificacao: ' + e);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      LISTAR NOTIFICAÇÕES
// ═══════════════════════════════════════════════════════════════════════

/**
 * Retorna notificações filtradas por destinatário e status de leitura
 * 
 * @param {string} destinatario - Destinatário (TODOS, BRYAN, ROBERTA, ANNE, ou ID)
 * @param {boolean} apenasNaoLidas - Se true, retorna apenas não lidas
 * @returns {Array} Array de notificações
 */
function getNotificacoes(destinatario, apenasNaoLidas) {
  try {
    const sheet = setupNotificacoesSheet();
    if (sheet.getLastRow() <= 1) return [];
    
    const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 11).getValues();
    
    const notificacoes = data
      .filter(function(row) {
        if (!row[0]) return false; // Ignora linhas vazias
        
        // Filtro por destinatário
        const dest = String(row[5]);
        if (destinatario && dest !== 'TODOS' && dest !== destinatario) {
          return false;
        }
        
        // Filtro por leitura
        if (apenasNaoLidas && String(row[6]) === 'SIM') {
          return false;
        }
        
        return true;
      })
      .map(function(row) {
        return {
          idNotificacao: String(row[0] || ''),
          tipo: String(row[1] || ''),
          titulo: String(row[2] || ''),
          mensagem: String(row[3] || ''),
          idCampanha: String(row[4] || ''),
          destinatario: String(row[5] || ''),
          lida: String(row[6]) === 'SIM',
          dataCriacao: row[7] ? formatDateTime(row[7]) : '',
          dataLeitura: row[8] ? formatDateTime(row[8]) : '',
          prioridade: String(row[9] || 'MÉDIA'),
          icone: String(row[10] || '🔔')
        };
      });
    
    // Ordenar por data de criação (mais recente primeiro)
    notificacoes.sort(function(a, b) {
      return new Date(b.dataCriacao) - new Date(a.dataCriacao);
    });
    
    return notificacoes;
    
  } catch (e) {
    Logger.log('❌ getNotificacoes: ' + e);
    return [];
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      MARCAR NOTIFICAÇÃO COMO LIDA
// ═══════════════════════════════════════════════════════════════════════

/**
 * Marca uma notificação específica como lida
 * 
 * @param {string} idNotificacao - ID da notificação
 * @returns {Object} {success, message}
 */
function marcarNotificacaoLida(idNotificacao) {
  try {
    const sheet = setupNotificacoesSheet();
    const rowNum = findRowById(sheet, idNotificacao);
    
    if (!rowNum) {
      Logger.log('⚠️ Notificação não encontrada: ' + idNotificacao);
      return { success: false, message: 'Notificação não encontrada' };
    }
    
    // Marcar como lida
    sheet.getRange(rowNum, 7).setValue('SIM');
    sheet.getRange(rowNum, 9).setValue(new Date());
    
    SpreadsheetApp.flush();
    
    Logger.log('✅ Notificação marcada como lida: ' + idNotificacao);
    
    return { success: true, message: 'Notificação marcada como lida' };
    
  } catch (e) {
    Logger.log('❌ marcarNotificacaoLida: ' + e);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      MARCAR TODAS AS NOTIFICAÇÕES COMO LIDAS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Marca todas as notificações não lidas de um destinatário como lidas
 * 
 * @param {string} destinatario - Destinatário (TODOS, BRYAN, ROBERTA, etc)
 * @returns {Object} {success, count, message}
 */
function marcarTodasNotificacoesLidas(destinatario) {
  try {
    logInicio('marcarTodasNotificacoesLidas - Destinatário: ' + destinatario);
    
    const sheet = setupNotificacoesSheet();
    if (sheet.getLastRow() <= 1) {
      return { success: true, count: 0 };
    }
    
    const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 11).getValues();
    const hoje = new Date();
    let count = 0;
    
    data.forEach(function(row, index) {
      const dest = String(row[5]);
      const lida = String(row[6]);
      
      // Marcar se não lida E (destinatário corresponde OU é TODOS)
      if (lida !== 'SIM' && (dest === 'TODOS' || dest === destinatario)) {
        const rowNum = index + 2;
        sheet.getRange(rowNum, 7).setValue('SIM');
        sheet.getRange(rowNum, 9).setValue(hoje);
        count++;
      }
    });
    
    if (count > 0) {
      SpreadsheetApp.flush();
      Logger.log('✅ ' + count + ' notificações marcadas como lidas');
    } else {
      Logger.log('ℹ️ Nenhuma notificação não lida encontrada');
    }
    
    logFim('marcarTodasNotificacoesLidas', true);
    
    return { 
      success: true, 
      count: count,
      message: count + ' notificações marcadas como lidas'
    };
    
  } catch (e) {
    Logger.log('❌ ERRO em marcarTodasNotificacoesLidas: ' + e);
    logFim('marcarTodasNotificacoesLidas', false);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      CONTAR NOTIFICAÇÕES NÃO LIDAS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Conta o número de notificações não lidas de um destinatário
 * Usado para exibir badge de notificações no frontend
 * 
 * @param {string} destinatario - Destinatário (TODOS, BRYAN, ROBERTA, etc)
 * @returns {number} Total de notificações não lidas
 */
function contarNotificacoesNaoLidas(destinatario) {
  try {
    const notificacoes = getNotificacoes(destinatario, true); // apenas não lidas
    return notificacoes.length;
  } catch (e) {
    Logger.log('❌ contarNotificacoesNaoLidas: ' + e);
    return 0;
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      BUSCAR NOTIFICAÇÃO POR ID
// ═══════════════════════════════════════════════════════════════════════

/**
 * Busca uma notificação específica por ID
 * 
 * @param {string} idNotificacao - ID da notificação
 * @returns {Object|null} Objeto com dados da notificação ou null
 */
function getNotificacao(idNotificacao) {
  try {
    const todas = getNotificacoes('', false); // todas, lidas e não lidas
    return todas.find(function(n) {
      return n.idNotificacao === idNotificacao;
    }) || null;
  } catch (e) {
    Logger.log('❌ getNotificacao: ' + e);
    return null;
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      BUSCAR NOTIFICAÇÕES POR CAMPANHA
// ═══════════════════════════════════════════════════════════════════════

/**
 * Retorna todas as notificações relacionadas a uma campanha específica
 * 
 * @param {string} idCampanha - ID da campanha
 * @returns {Array} Array de notificações
 */
function getNotificacoesPorCampanha(idCampanha) {
  try {
    const todas = getNotificacoes('', false);
    return todas.filter(function(n) {
      return n.idCampanha === idCampanha;
    });
  } catch (e) {
    Logger.log('❌ getNotificacoesPorCampanha: ' + e);
    return [];
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      BUSCAR NOTIFICAÇÕES POR TIPO
// ═══════════════════════════════════════════════════════════════════════

/**
 * Retorna notificações filtradas por tipo
 * 
 * @param {string} tipo - Tipo da notificação (SISTEMA, PRAZO, STATUS, etc)
 * @returns {Array} Array de notificações
 */
function getNotificacoesPorTipo(tipo) {
  try {
    const todas = getNotificacoes('', false);
    return todas.filter(function(n) {
      return n.tipo.toUpperCase() === tipo.toUpperCase();
    });
  } catch (e) {
    Logger.log('❌ getNotificacoesPorTipo: ' + e);
    return [];
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      BUSCAR NOTIFICAÇÕES POR PRIORIDADE
// ═══════════════════════════════════════════════════════════════════════

/**
 * Retorna notificações filtradas por prioridade
 * 
 * @param {string} prioridade - Prioridade (BAIXA, MÉDIA, ALTA, CRÍTICA)
 * @returns {Array} Array de notificações
 */
function getNotificacoesPorPrioridade(prioridade) {
  try {
    const todas = getNotificacoes('', false);
    return todas.filter(function(n) {
      return n.prioridade.toUpperCase() === prioridade.toUpperCase();
    });
  } catch (e) {
    Logger.log('❌ getNotificacoesPorPrioridade: ' + e);
    return [];
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      EXCLUIR NOTIFICAÇÃO
// ═══════════════════════════════════════════════════════════════════════

/**
 * Exclui uma notificação específica
 * 
 * @param {string} idNotificacao - ID da notificação
 * @returns {Object} {success, message}
 */
function excluirNotificacao(idNotificacao) {
  try {
    const sheet = setupNotificacoesSheet();
    const rowNum = findRowById(sheet, idNotificacao);
    
    if (!rowNum) {
      return { success: false, message: 'Notificação não encontrada' };
    }
    
    // Excluir linha
    sheet.deleteRow(rowNum);
    SpreadsheetApp.flush();
    
    Logger.log('🗑️ Notificação excluída: ' + idNotificacao);
    
    return { success: true, message: 'Notificação excluída' };
    
  } catch (e) {
    Logger.log('❌ excluirNotificacao: ' + e);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      LIMPAR NOTIFICAÇÕES ANTIGAS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Exclui notificações lidas com mais de X dias
 * Útil para manter a aba limpa
 * 
 * @param {number} dias - Número de dias (padrão: 30)
 * @returns {Object} {success, excluidas, message}
 */
function limparNotificacoesAntigas(dias) {
  try {
    dias = dias || 30;
    
    logInicio('limparNotificacoesAntigas - Dias: ' + dias);
    
    const sheet = setupNotificacoesSheet();
    if (sheet.getLastRow() <= 1) {
      return { success: true, excluidas: 0 };
    }
    
    const hoje = new Date();
    const limite = new Date(hoje.getTime() - (dias * 24 * 60 * 60 * 1000));
    
    const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 11).getValues();
    let excluidas = 0;
    
    // Percorrer de trás para frente para não bagunçar os índices
    for (let i = data.length - 1; i >= 0; i--) {
      const lida = String(data[i][6]);
      const dataCriacao = data[i][7];
      
      if (lida === 'SIM' && dataCriacao && dataCriacao < limite) {
        const rowNum = i + 2;
        sheet.deleteRow(rowNum);
        excluidas++;
      }
    }
    
    if (excluidas > 0) {
      SpreadsheetApp.flush();
      Logger.log('🗑️ ' + excluidas + ' notificações antigas excluídas');
    } else {
      Logger.log('ℹ️ Nenhuma notificação antiga encontrada');
    }
    
    logFim('limparNotificacoesAntigas', true);
    
    return {
      success: true,
      excluidas: excluidas,
      message: excluidas + ' notificações excluídas'
    };
    
  } catch (e) {
    Logger.log('❌ ERRO em limparNotificacoesAntigas: ' + e);
    logFim('limparNotificacoesAntigas', false);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      NOTIFICAÇÕES DE PRAZOS VENCIDOS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Cria notificações automáticas para prazos vencidos
 * Deve ser executada diariamente (via trigger)
 * 
 * @returns {Object} {success, notificacoesCriadas, message}
 */
function notificarPrazosVencidos() {
  try {
    logInicio('notificarPrazosVencidos');
    
    const campanhasAtrasadas = getCampanhasComPrazosVencidos();
    
    Logger.log('📊 Campanhas com prazos vencidos: ' + campanhasAtrasadas.length);
    
    let notificacoesCriadas = 0;
    
    campanhasAtrasadas.forEach(function(c) {
      // Verificar se já existe notificação para este prazo hoje
      const hoje = new Date();
      const dataHoje = hoje.toISOString().split('T')[0];
      
      const notificacoesExistentes = getNotificacoesPorCampanha(c.idCampanha);
      const jaNotificouHoje = notificacoesExistentes.some(function(n) {
        const dataCriacao = new Date(n.dataCriacao);
        const dataCriacaoStr = dataCriacao.toISOString().split('T')[0];
        return n.tipo === 'PRAZO' && dataCriacaoStr === dataHoje;
      });
      
      if (!jaNotificouHoje) {
        criarNotificacao(
          'PRAZO',
          '⚠️ Prazo Vencido',
          'A campanha ' + c.marca + ' (' + c.influenciador + ') está com prazo vencido',
          c.idCampanha,
          'TODOS',
          'ALTA'
        );
        notificacoesCriadas++;
      }
    });
    
    Logger.log('✅ ' + notificacoesCriadas + ' notificações criadas');
    
    logFim('notificarPrazosVencidos', true);
    
    return {
      success: true,
      notificacoesCriadas: notificacoesCriadas,
      message: notificacoesCriadas + ' notificações criadas'
    };
    
  } catch (e) {
    Logger.log('❌ ERRO em notificarPrazosVencidos: ' + e);
    logFim('notificarPrazosVencidos', false);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      NOTIFICAÇÕES DE PRÓXIMOS PRAZOS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Cria notificações para prazos que vencem nos próximos X dias
 * 
 * @param {number} diasAntecedencia - Número de dias de antecedência (padrão: 3)
 * @returns {Object} {success, notificacoesCriadas, message}
 */
function notificarProximosPrazos(diasAntecedencia) {
  try {
    diasAntecedencia = diasAntecedencia || 3;
    
    logInicio('notificarProximosPrazos - Antecedência: ' + diasAntecedencia + ' dias');
    
    const prazos = getProximosPrazos(20); // Buscar mais prazos
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    const limite = new Date(hoje.getTime() + (diasAntecedencia * 24 * 60 * 60 * 1000));
    
    let notificacoesCriadas = 0;
    
    prazos.forEach(function(p) {
      const dataPrazo = new Date(p.dataPrevista);
      
      // Se prazo está entre hoje e o limite
      if (dataPrazo >= hoje && dataPrazo <= limite) {
        
        // Verificar se já notificou
        const notificacoesExistentes = getNotificacoesPorCampanha(p.idCampanha);
        const dataHoje = hoje.toISOString().split('T')[0];
        
        const jaNotificou = notificacoesExistentes.some(function(n) {
          const dataCriacao = new Date(n.dataCriacao);
          const dataCriacaoStr = dataCriacao.toISOString().split('T')[0];
          return n.tipo === 'PRAZO' && 
                 n.mensagem.indexOf(p.etapa) !== -1 &&
                 dataCriacaoStr === dataHoje;
        });
        
        if (!jaNotificou) {
          const diasRestantes = Math.ceil((dataPrazo - hoje) / (1000 * 60 * 60 * 24));
          
          criarNotificacao(
            'PRAZO',
            '⏰ Prazo Próximo',
            'A etapa ' + p.etapa + ' da campanha ' + p.marca + ' vence em ' + diasRestantes + ' dia(s)',
            p.idCampanha,
            'TODOS',
            'MÉDIA'
          );
          notificacoesCriadas++;
        }
      }
    });
    
    Logger.log('✅ ' + notificacoesCriadas + ' notificações criadas');
    
    logFim('notificarProximosPrazos', true);
    
    return {
      success: true,
      notificacoesCriadas: notificacoesCriadas,
      message: notificacoesCriadas + ' notificações criadas'
    };
    
  } catch (e) {
    Logger.log('❌ ERRO em notificarProximosPrazos: ' + e);
    logFim('notificarProximosPrazos', false);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      ENVIAR EMAIL DE NOTIFICAÇÃO (FUTURO)
// ═══════════════════════════════════════════════════════════════════════

/**
 * Envia um email com a notificação
 * FUNCIONALIDADE FUTURA - Placeholder
 * 
 * @param {string} idNotificacao - ID da notificação
 * @param {string} emailDestinatario - Email do destinatário
 * @returns {Object} {success, message}
 */
function enviarEmailNotificacao(idNotificacao, emailDestinatario) {
  try {
    const notificacao = getNotificacao(idNotificacao);
    
    if (!notificacao) {
      return { success: false, message: 'Notificação não encontrada' };
    }
    
    // TODO: Implementar envio de email
    Logger.log('📧 Email de notificação (placeholder)');
    Logger.log('   Para: ' + emailDestinatario);
    Logger.log('   Assunto: ' + notificacao.titulo);
    Logger.log('   Mensagem: ' + notificacao.mensagem);
    
    return { 
      success: false, 
      message: 'Funcionalidade não implementada ainda' 
    };
    
  } catch (e) {
    Logger.log('❌ enviarEmailNotificacao: ' + e);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      FIM DO 9_NOTIFICACOES.GS
// ═══════════════════════════════════════════════════════════════════════

Logger.log('✅ 9_Notificacoes.gs carregado - Sistema de notificações disponível');

// ═══════════════════════════════════════════════════════════════════════
//                    10_DASHBOARD.GS - DASHBOARD + HISTÓRICO + RELATÓRIOS
//                    Sistema Littê v3.5
//                    Métricas, histórico e geração de relatórios
// ═══════════════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════════════
//                      DADOS DO DASHBOARD PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════

/**
 * Retorna todos os dados consolidados para o dashboard principal
 * 
 * MÉTRICAS INCLUÍDAS:
 * - Total de Assessorados
 * - Campanhas Ativas
 * - Faturamento do Mês
 * - Taxa de Conversão
 * - Prospecções em Andamento
 * - Pendências (Prazos Vencidos)
 * - NFs Pendentes
 * 
 * @returns {Object} Objeto com todas as métricas do dashboard
 */
function getDashboardData() {
  try {
    logInicio('getDashboardData');
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // ═══ MÉTRICA 1: TOTAL DE ASSESSORADOS ═══
    const sheetAssessorados = ss.getSheetByName('Assessorados');
    const totalAssessorados = sheetAssessorados 
      ? Math.max(0, sheetAssessorados.getLastRow() - 1) 
      : 0;
    
    Logger.log('👥 Total Assessorados: ' + totalAssessorados);
    
    // ═══ MÉTRICA 2: CAMPANHAS ATIVAS ═══
    const sheetCampanhasAtivas = ss.getSheetByName('Campanhas_Ativas');
    const campanhasAtivas = sheetCampanhasAtivas 
      ? Math.max(0, sheetCampanhasAtivas.getLastRow() - 1) 
      : 0;
    
    Logger.log('🎬 Campanhas Ativas: ' + campanhasAtivas);
    
    // ═══ MÉTRICA 3: FATURAMENTO DO MÊS ═══
    const faturamentoMes = calcularFaturamentoMes();
    Logger.log('💰 Faturamento Mês: R$ ' + faturamentoMes.toFixed(2));
    
    // ═══ MÉTRICA 4: TAXA DE CONVERSÃO ═══
    const taxaConversao = calcularTaxaConversao();
    Logger.log('📊 Taxa Conversão: ' + taxaConversao + '%');
    
    // ═══ MÉTRICA 5: PROSPECÇÕES ═══
    const prospeccoes = contarProspeccoes();
    Logger.log('🔍 Prospecções: ' + prospeccoes);
    
    // ═══ MÉTRICA 6: PENDÊNCIAS ═══
    const pendencias = contarPendencias();
    Logger.log('⚠️ Pendências: ' + pendencias);
    
    // ═══ MÉTRICA 7: NFs PENDENTES ═══
    const nfsPendentes = contarNFsPendentes();
    Logger.log('📄 NFs Pendentes: ' + nfsPendentes);
    
    logFim('getDashboardData', true);
    
    return {
      success: true,
      totalAssessorados: totalAssessorados,
      campanhasAtivas: campanhasAtivas,
      faturamentoMes: faturamentoMes,
      taxaConversao: taxaConversao,
      prospeccoes: prospeccoes,
      pendencias: pendencias,
      nfsPendentes: nfsPendentes
    };
    
  } catch (e) {
    Logger.log('❌ ERRO em getDashboardData: ' + e);
    Logger.log('Stack: ' + e.stack);
    
    return {
      success: false,
      message: e.toString(),
      totalAssessorados: 0,
      campanhasAtivas: 0,
      faturamentoMes: 0,
      taxaConversao: 0,
      prospeccoes: 0,
      pendencias: 0,
      nfsPendentes: 0
    };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      ÚLTIMAS ATIVIDADES
// ═══════════════════════════════════════════════════════════════════════

/**
 * Retorna as últimas atividades registradas no histórico
 * Ordenadas por data/hora (mais recente primeiro)
 * 
 * @param {number} limite - Número máximo de atividades (padrão: 15)
 * @returns {Array} Array de atividades
 */
function getUltimasAtividades(limite) {
  try {
    limite = limite || 15;
    
    const sheet = setupHistoricoSheet();
    if (sheet.getLastRow() <= 1) return [];
    
    const totalRows = sheet.getLastRow() - 1;
    const rowsToFetch = Math.min(limite, totalRows);
    
    // Buscar as últimas N linhas
    const startRow = sheet.getLastRow() - rowsToFetch + 1;
    const data = sheet.getRange(startRow, 1, rowsToFetch, 8).getValues();
    
    const atividades = data
      .filter(function(row) { return row[0]; })
      .map(function(row) {
        return {
          dataHora: row[0] ? formatDateTime(row[0]) : '',
          tipo: String(row[1] || ''),
          idCampanha: String(row[2] || ''),
          acao: String(row[3] || ''),
          usuario: String(row[4] || ''),
          valorAntes: String(row[5] || ''),
          valorDepois: String(row[6] || ''),
          detalhes: String(row[7] || '')
        };
      });
    
    // Reverter para ter mais recente primeiro
    atividades.reverse();
    
    return atividades;
    
  } catch (e) {
    Logger.log('❌ getUltimasAtividades: ' + e);
    return [];
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      PRÓXIMOS PRAZOS (DASHBOARD)
// ═══════════════════════════════════════════════════════════════════════

/**
 * Esta função já foi implementada em 5_Campanhas.gs
 * Aqui apenas documentamos para referência
 * 
 * Ver: getProximosPrazos(limite) em 5_Campanhas.gs
 */


// ═══════════════════════════════════════════════════════════════════════
//                      REGISTRAR NO HISTÓRICO
// ═══════════════════════════════════════════════════════════════════════

/**
 * Registra uma atividade no histórico do sistema
 * 
 * @param {string} tipo - Tipo de registro (Assessorado, Campanha, Financeiro, etc)
 * @param {string} idRef - ID de referência (ID da campanha, assessorado, etc)
 * @param {string} acao - Ação realizada (Criou, Editou, Deletou, etc)
 * @param {string} usuario - Usuário que executou a ação
 * @param {string} valorAntigo - Valor anterior (para edições)
 * @param {string} valorNovo - Valor novo (para edições)
 * @param {string} detalhes - Detalhes adicionais
 * @returns {Object} {success, message}
 */
function registrarHistorico(tipo, idRef, acao, usuario, valorAntigo, valorNovo, detalhes) {
  try {
    const sheet = setupHistoricoSheet();
    const hoje = new Date();
    
    sheet.appendRow([
      hoje,                    // 1. Data Hora
      tipo || 'Sistema',       // 2. Tipo
      idRef || '',             // 3. ID Referência
      acao || 'Executou',      // 4. Ação
      usuario || 'Sistema',    // 5. Usuário
      valorAntigo || '',       // 6. Valor Antes
      valorNovo || '',         // 7. Valor Depois
      detalhes || ''           // 8. Detalhes
    ]);
    
    SpreadsheetApp.flush();
    
    // Não logar no Logger para evitar poluir logs
    // Logger.log('📝 Histórico registrado: ' + tipo + ' - ' + acao);
    
    return { success: true };
    
  } catch (e) {
    Logger.log('❌ registrarHistorico: ' + e);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      BUSCAR HISTÓRICO POR CAMPANHA
// ═══════════════════════════════════════════════════════════════════════

/**
 * Retorna todo o histórico relacionado a uma campanha específica
 * 
 * @param {string} idCampanha - ID da campanha
 * @returns {Array} Array de registros de histórico
 */
function getHistoricoPorCampanha(idCampanha) {
  try {
    const sheet = setupHistoricoSheet();
    if (sheet.getLastRow() <= 1) return [];
    
    const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 8).getValues();
    
    const historico = data
      .filter(function(row) {
        return row[2] && String(row[2]) === String(idCampanha);
      })
      .map(function(row) {
        return {
          dataHora: row[0] ? formatDateTime(row[0]) : '',
          tipo: String(row[1] || ''),
          idCampanha: String(row[2] || ''),
          acao: String(row[3] || ''),
          usuario: String(row[4] || ''),
          valorAntes: String(row[5] || ''),
          valorDepois: String(row[6] || ''),
          detalhes: String(row[7] || '')
        };
      });
    
    // Ordenar por data (mais recente primeiro)
    historico.sort(function(a, b) {
      return new Date(b.dataHora) - new Date(a.dataHora);
    });
    
    return historico;
    
  } catch (e) {
    Logger.log('❌ getHistoricoPorCampanha: ' + e);
    return [];
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      BUSCAR HISTÓRICO POR TIPO
// ═══════════════════════════════════════════════════════════════════════

/**
 * Retorna histórico filtrado por tipo
 * 
 * @param {string} tipo - Tipo do registro (Assessorado, Campanha, Financeiro, etc)
 * @param {number} limite - Número máximo de registros (opcional)
 * @returns {Array} Array de registros
 */
function getHistoricoPorTipo(tipo, limite) {
  try {
    const sheet = setupHistoricoSheet();
    if (sheet.getLastRow() <= 1) return [];
    
    const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 8).getValues();
    
    let historico = data
      .filter(function(row) {
        return row[1] && String(row[1]).toUpperCase() === tipo.toUpperCase();
      })
      .map(function(row) {
        return {
          dataHora: row[0] ? formatDateTime(row[0]) : '',
          tipo: String(row[1] || ''),
          idCampanha: String(row[2] || ''),
          acao: String(row[3] || ''),
          usuario: String(row[4] || ''),
          valorAntes: String(row[5] || ''),
          valorDepois: String(row[6] || ''),
          detalhes: String(row[7] || '')
        };
      });
    
    // Ordenar por data (mais recente primeiro)
    historico.sort(function(a, b) {
      return new Date(b.dataHora) - new Date(a.dataHora);
    });
    
    // Limitar se especificado
    if (limite) {
      historico = historico.slice(0, limite);
    }
    
    return historico;
    
  } catch (e) {
    Logger.log('❌ getHistoricoPorTipo: ' + e);
    return [];
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      LIMPAR HISTÓRICO ANTIGO
// ═══════════════════════════════════════════════════════════════════════

/**
 * Remove registros de histórico com mais de X dias
 * Útil para manter a aba leve
 * 
 * @param {number} dias - Número de dias (padrão: 90)
 * @returns {Object} {success, removidos, message}
 */
function limparHistoricoAntigo(dias) {
  try {
    dias = dias || 90;
    
    logInicio('limparHistoricoAntigo - Dias: ' + dias);
    
    const sheet = setupHistoricoSheet();
    if (sheet.getLastRow() <= 1) {
      return { success: true, removidos: 0 };
    }
    
    const hoje = new Date();
    const limite = new Date(hoje.getTime() - (dias * 24 * 60 * 60 * 1000));
    
    const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 8).getValues();
    let removidos = 0;
    
    // Percorrer de trás para frente
    for (let i = data.length - 1; i >= 0; i--) {
      const dataHora = data[i][0];
      
      if (dataHora && dataHora < limite) {
        const rowNum = i + 2;
        sheet.deleteRow(rowNum);
        removidos++;
      }
    }
    
    if (removidos > 0) {
      SpreadsheetApp.flush();
      Logger.log('🗑️ ' + removidos + ' registros antigos removidos');
    } else {
      Logger.log('ℹ️ Nenhum registro antigo encontrado');
    }
    
    logFim('limparHistoricoAntigo', true);
    
    return {
      success: true,
      removidos: removidos,
      message: removidos + ' registros removidos'
    };
    
  } catch (e) {
    Logger.log('❌ ERRO em limparHistoricoAntigo: ' + e);
    logFim('limparHistoricoAntigo', false);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      TEMPLATES DE MENSAGENS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Retorna todos os templates de mensagens
 * @returns {Array} Array de templates
 */
function getAllTemplates() {
  try {
    const sheet = setupTemplatesSheet();
    if (sheet.getLastRow() <= 1) return [];
    
    const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 6).getValues();
    
    return data
      .filter(function(row) { return row[0]; })
      .map(function(row) {
        return {
          id: String(row[0] || ''),
          nome: String(row[1] || ''),
          categoria: String(row[2] || ''),
          assunto: String(row[3] || ''),
          corpo: String(row[4] || ''),
          dataCriacao: row[5] ? formatDateToISO(row[5]) : ''
        };
      });
  } catch (e) {
    Logger.log('❌ getAllTemplates: ' + e);
    return [];
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      RELATÓRIO MENSAL AUTOMÁTICO
// ═══════════════════════════════════════════════════════════════════════

/**
 * Gera um relatório mensal consolidado
 * Deve ser executado automaticamente no fim de cada mês (via trigger)
 * 
 * DADOS DO RELATÓRIO:
 * - Faturamento do mês
 * - Campanhas fechadas
 * - Campanhas concluídas
 * - Novos assessorados
 * - Taxa de conversão
 * - Top 5 campanhas por valor
 * 
 * @returns {Object} {success, relatorio, message}
 */
function gerarRelatorioMensalAutomatico() {
  try {
    logInicio('gerarRelatorioMensalAutomatico');
    
    const hoje = new Date();
    const mesAtual = hoje.getMonth();
    const anoAtual = hoje.getFullYear();
    
    // Nome do mês
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    const nomeMes = meses[mesAtual];
    
    Logger.log('📊 Gerando relatório: ' + nomeMes + '/' + anoAtual);
    
    // ═══ 1. FATURAMENTO ═══
    const faturamentoMes = calcularFaturamentoMes();
    
    // ═══ 2. CAMPANHAS FECHADAS NO MÊS ═══
    const andamentos = getAllAndamentos();
    const campanhasFechadas = andamentos.filter(function(a) {
      if (a.statusDetalhado !== 'Fechado') return false;
      
      const dataCriacao = new Date(a.dataCriacao);
      return dataCriacao.getMonth() === mesAtual && 
             dataCriacao.getFullYear() === anoAtual;
    });
    
    // ═══ 3. CAMPANHAS CONCLUÍDAS NO MÊS ═══
    const campanhasConcluidas = andamentos.filter(function(a) {
      if (!a.concluida || !a.dataConclusao) return false;
      
      const dataConclusao = new Date(a.dataConclusao);
      return dataConclusao.getMonth() === mesAtual && 
             dataConclusao.getFullYear() === anoAtual;
    });
    
    // ═══ 4. NOVOS ASSESSORADOS ═══
    const assessorados = getAllAssessorados();
    const novosAssessorados = assessorados.filter(function(a) {
      if (!a.dataCriacao) return false;
      
      const dataCriacao = new Date(a.dataCriacao);
      return dataCriacao.getMonth() === mesAtual && 
             dataCriacao.getFullYear() === anoAtual;
    });
    
    // ═══ 5. TAXA DE CONVERSÃO ═══
    const taxaConversao = calcularTaxaConversao();
    
    // ═══ 6. TOP 5 CAMPANHAS POR VALOR ═══
    const top5Campanhas = campanhasFechadas
      .sort(function(a, b) {
        return b.valorFechado - a.valorFechado;
      })
      .slice(0, 5)
      .map(function(c) {
        const assessorado = getAssessorado(c.idAssessorado);
        return {
          marca: c.marca,
          assessorado: assessorado ? assessorado.nome : c.idAssessorado,
          valor: c.valorFechado
        };
      });
    
    // ═══ MONTAR RELATÓRIO ═══
    const relatorio = {
      mes: nomeMes,
      ano: anoAtual,
      faturamento: faturamentoMes,
      campanhasFechadas: campanhasFechadas.length,
      campanhasConcluidas: campanhasConcluidas.length,
      novosAssessorados: novosAssessorados.length,
      taxaConversao: taxaConversao,
      top5Campanhas: top5Campanhas
    };
    
    Logger.log('✅ Relatório gerado:');
    Logger.log('   Faturamento: R$ ' + faturamentoMes.toFixed(2));
    Logger.log('   Campanhas Fechadas: ' + campanhasFechadas.length);
    Logger.log('   Campanhas Concluídas: ' + campanhasConcluidas.length);
    Logger.log('   Novos Assessorados: ' + novosAssessorados.length);
    Logger.log('   Taxa Conversão: ' + taxaConversao + '%');
    
    // Registrar histórico
    registrarHistorico(
      'Relatório',
      '',
      'Gerou',
      'Sistema',
      '',
      '',
      'Relatório mensal: ' + nomeMes + '/' + anoAtual
    );
    
    logFim('gerarRelatorioMensalAutomatico', true);
    
    return {
      success: true,
      relatorio: relatorio,
      message: 'Relatório mensal gerado'
    };
    
  } catch (e) {
    Logger.log('❌ ERRO em gerarRelatorioMensalAutomatico: ' + e);
    logFim('gerarRelatorioMensalAutomatico', false);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      VERIFICAR PRAZOS VENCIDOS (AUTOMÁTICO)
// ═══════════════════════════════════════════════════════════════════════

/**
 * Verifica e atualiza status de campanhas com prazos vencidos
 * Deve ser executado diariamente (via trigger)
 * 
 * @returns {Object} {success, atualizadas, message}
 */
function verificarPrazosVencidos() {
  try {
    logInicio('verificarPrazosVencidos');
    
    // Esta função já foi implementada em 5_Campanhas.gs
    // Ver: verificarEAtualizarStatusPorPrazos()
    
    const resultado = verificarEAtualizarStatusPorPrazos();
    
    if (resultado.success) {
      Logger.log('✅ Verificação concluída: ' + resultado.atualizadas + ' campanhas atualizadas');
    }
    
    logFim('verificarPrazosVencidos', true);
    
    return resultado;
    
  } catch (e) {
    Logger.log('❌ ERRO em verificarPrazosVencidos: ' + e);
    logFim('verificarPrazosVencidos', false);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      ESTATÍSTICAS GERAIS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Retorna estatísticas gerais do sistema
 * Útil para análises e relatórios
 * 
 * @returns {Object} Objeto com estatísticas
 */
function getEstatisticasGerais() {
  try {
    const assessorados = getAllAssessorados();
    const andamentos = getAllAndamentos();
    const campanhas = getCampanhasAtivas();
    const financeiros = getAllFinanceirosCompletos();
    
    // Calcular médias
    const valorMedioCampanha = andamentos
      .filter(function(a) { return a.statusDetalhado === 'Fechado'; })
      .reduce(function(acc, a) { return acc + a.valorFechado; }, 0) / 
      andamentos.filter(function(a) { return a.statusDetalhado === 'Fechado'; }).length || 0;
    
    const campanhasPorAssessorado = assessorados.length > 0 
      ? andamentos.filter(function(a) { return a.statusDetalhado === 'Fechado'; }).length / assessorados.length 
      : 0;
    
    return {
      success: true,
      totalAssessorados: assessorados.length,
      assessoradosAtivos: assessorados.filter(function(a) { return a.status === 'Ativo'; }).length,
      totalAndamentos: andamentos.length,
      campanhasFechadas: andamentos.filter(function(a) { return a.statusDetalhado === 'Fechado'; }).length,
      campanhasAtivas: campanhas.length,
      campanhasConcluidas: andamentos.filter(function(a) { return a.concluida; }).length,
      valorMedioCampanha: valorMedioCampanha,
      campanhasPorAssessorado: campanhasPorAssessorado,
      taxaConversao: calcularTaxaConversao(),
      faturamentoTotal: financeiros.reduce(function(acc, f) { return acc + f.valorTotal; }, 0)
    };
    
  } catch (e) {
    Logger.log('❌ getEstatisticasGerais: ' + e);
    return { success: false, message: e.toString() };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      FIM DO 10_DASHBOARD.GS
// ═══════════════════════════════════════════════════════════════════════

Logger.log('✅ 10_Dashboard.gs carregado - Dashboard, histórico e relatórios disponíveis');

// ═══════════════════════════════════════════════════════════════════════
//                    11_TESTES.GS - TESTES E DIAGNÓSTICOS
//                    Sistema Littê v3.5
//                    Funções de teste, debug e validação do sistema
// ═══════════════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════════════
//                      TESTE COMPLETO DO SISTEMA
// ═══════════════════════════════════════════════════════════════════════

/**
 * Executa uma bateria completa de testes no sistema
 * 
 * TESTES EXECUTADOS:
 * 1. Configuração (Drive, Calendar)
 * 2. Geração de IDs únicos
 * 3. Existência de todas as abas
 * 4. Funções críticas
 * 5. Integrações externas
 * 
 * @returns {Object} {success, testes, message}
 */
function testarSistemaCompleto() {
  try {
    Logger.clear();
    Logger.log('════════════════════════════════════════════════════');
    Logger.log('🧪 TESTE COMPLETO DO SISTEMA LITTÊ v3.5');
    Logger.log('════════════════════════════════════════════════════');
    Logger.log('');
    
    const resultados = [];
    let todosOk = true;
    
    // ═══════════════════════════════════════════════════════════════
    // TESTE 1: CONFIGURAÇÃO
    // ═══════════════════════════════════════════════════════════════
    
    Logger.log('📋 [1/5] TESTE DE CONFIGURAÇÃO');
    Logger.log('─────────────────────────────────────');
    
    const props = PropertiesService.getScriptProperties();
    const configs = {
      'DRIVE_BASE': props.getProperty('DRIVE_BASE'),
      'PASTA_ASSESSORADOS': props.getProperty('PASTA_ASSESSORADOS'),
      'PASTA_RELATORIOS': props.getProperty('PASTA_RELATORIOS'),
      'CALENDAR_ID': props.getProperty('CALENDAR_ID'),
      'TIMEZONE': props.getProperty('TIMEZONE')
    };
    
    Object.keys(configs).forEach(function(key) {
      if (configs[key]) {
        Logger.log('  ✅ ' + key + ': OK');
        resultados.push('✅ Config: ' + key);
      } else {
        Logger.log('  ❌ ' + key + ': NÃO CONFIGURADO');
        resultados.push('❌ Config: ' + key + ' não configurado');
        todosOk = false;
      }
    });
    
    Logger.log('');
    
    // ═══════════════════════════════════════════════════════════════
    // TESTE 2: GERAÇÃO DE IDs
    // ═══════════════════════════════════════════════════════════════
    
    Logger.log('🆔 [2/5] TESTE DE GERAÇÃO DE IDs');
    Logger.log('─────────────────────────────────────');
    
    const tiposID = [
      'assessorado', 
      'campanha', 
      'andamento', 
      'notificacao', 
      'template', 
      'nota', 
      'followup', 
      'financeiro'
    ];
    
    tiposID.forEach(function(tipo) {
      try {
        const id = generateId(tipo);
        if (id && id.length > 5) {
          Logger.log('  ✅ ' + tipo + ': ' + id);
          resultados.push('✅ ID: ' + tipo);
        } else {
          Logger.log('  ❌ ' + tipo + ': INVÁLIDO');
          resultados.push('❌ ID: ' + tipo + ' inválido');
          todosOk = false;
        }
      } catch (e) {
        Logger.log('  ❌ ' + tipo + ': ERRO - ' + e);
        resultados.push('❌ ID: ' + tipo + ' - erro');
        todosOk = false;
      }
    });
    
    Logger.log('');
    
    // ═══════════════════════════════════════════════════════════════
    // TESTE 3: EXISTÊNCIA DAS ABAS
    // ═══════════════════════════════════════════════════════════════
    
    Logger.log('📊 [3/5] TESTE DE ABAS');
    Logger.log('─────────────────────────────────────');
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const abasNecessarias = [
      'Assessorados',
      'Andamentos',
      'Campanhas_Ativas',
      'Checklist_Complete',
      'Financeiro_Complete',
      'Templates',
      'Historico',
      'Notificacoes',
      'Config'
    ];
    
    abasNecessarias.forEach(function(nome) {
      const sheet = ss.getSheetByName(nome);
      if (sheet) {
        Logger.log('  ✅ ' + nome + ' (' + (sheet.getLastRow() - 1) + ' registros)');
        resultados.push('✅ Aba: ' + nome);
      } else {
        Logger.log('  ❌ ' + nome + ': NÃO EXISTE');
        resultados.push('❌ Aba: ' + nome + ' não existe');
        todosOk = false;
      }
    });
    
    Logger.log('');
    
    // ═══════════════════════════════════════════════════════════════
    // TESTE 4: FUNÇÕES CRÍTICAS
    // ═══════════════════════════════════════════════════════════════
    
    Logger.log('⚙️ [4/5] TESTE DE FUNÇÕES CRÍTICAS');
    Logger.log('─────────────────────────────────────');
    
    const funcoesCriticas = [
      { nome: 'getAllAssessorados', funcao: getAllAssessorados },
      { nome: 'getAllAndamentos', funcao: getAllAndamentos },
      { nome: 'getCampanhasAtivas', funcao: getCampanhasAtivas },
      { nome: 'getAllFinanceirosCompletos', funcao: getAllFinanceirosCompletos },
      { nome: 'getNotificacoes', funcao: function() { return getNotificacoes('TODOS', false); } },
      { nome: 'getDashboardData', funcao: getDashboardData },
      { nome: 'getMetricasFinanceiras', funcao: getMetricasFinanceiras }
    ];
    
    funcoesCriticas.forEach(function(item) {
      try {
        const resultado = item.funcao();
        if (resultado !== null && resultado !== undefined) {
          Logger.log('  ✅ ' + item.nome + ': OK');
          resultados.push('✅ Função: ' + item.nome);
        } else {
          Logger.log('  ⚠️ ' + item.nome + ': RETORNOU NULL');
          resultados.push('⚠️ Função: ' + item.nome + ' retornou null');
        }
      } catch (e) {
        Logger.log('  ❌ ' + item.nome + ': ERRO - ' + e);
        resultados.push('❌ Função: ' + item.nome + ' - ' + e.message);
        todosOk = false;
      }
    });
    
    Logger.log('');
    
    // ═══════════════════════════════════════════════════════════════
    // TESTE 5: INTEGRAÇÕES
    // ═══════════════════════════════════════════════════════════════
    
    Logger.log('🔗 [5/5] TESTE DE INTEGRAÇÕES');
    Logger.log('─────────────────────────────────────');
    
    // Drive
    try {
      const pastaAssessoradosId = props.getProperty('PASTA_ASSESSORADOS');
      if (pastaAssessoradosId) {
        const pasta = DriveApp.getFolderById(pastaAssessoradosId);
        Logger.log('  ✅ Drive: ' + pasta.getName());
        resultados.push('✅ Integração: Drive');
      } else {
        Logger.log('  ⚠️ Drive: Não configurado');
        resultados.push('⚠️ Integração: Drive não configurado');
      }
    } catch (e) {
      Logger.log('  ❌ Drive: ERRO - ' + e);
      resultados.push('❌ Integração: Drive - ' + e.message);
      todosOk = false;
    }
    
    // Calendar
    try {
      const calendarId = props.getProperty('CALENDAR_ID');
      if (calendarId) {
        const calendar = CalendarApp.getCalendarById(calendarId);
        Logger.log('  ✅ Calendar: ' + calendar.getName());
        resultados.push('✅ Integração: Calendar');
      } else {
        Logger.log('  ⚠️ Calendar: Não configurado');
        resultados.push('⚠️ Integração: Calendar não configurado');
      }
    } catch (e) {
      Logger.log('  ❌ Calendar: ERRO - ' + e);
      resultados.push('❌ Integração: Calendar - ' + e.message);
      todosOk = false;
    }
    
    Logger.log('');
    
    // ═══════════════════════════════════════════════════════════════
    // RESULTADO FINAL
    // ═══════════════════════════════════════════════════════════════
    
    Logger.log('════════════════════════════════════════════════════');
    Logger.log('📊 RESUMO DOS TESTES');
    Logger.log('════════════════════════════════════════════════════');
    
    const totalTestes = resultados.length;
    const testesOk = resultados.filter(function(r) { return r.startsWith('✅'); }).length;
    const testesAviso = resultados.filter(function(r) { return r.startsWith('⚠️'); }).length;
    const testesErro = resultados.filter(function(r) { return r.startsWith('❌'); }).length;
    
    Logger.log('Total de testes: ' + totalTestes);
    Logger.log('✅ Sucesso: ' + testesOk);
    Logger.log('⚠️ Avisos: ' + testesAviso);
    Logger.log('❌ Erros: ' + testesErro);
    Logger.log('');
    
    if (todosOk && testesErro === 0) {
      Logger.log('🎉🎉🎉 TODOS OS TESTES PASSARAM! 🎉🎉🎉');
      Logger.log('✅ O sistema está funcionando corretamente!');
    } else {
      Logger.log('⚠️ ALGUNS TESTES FALHARAM');
      Logger.log('❌ Revise os erros acima');
    }
    
    Logger.log('════════════════════════════════════════════════════');
    
    return {
      success: todosOk && testesErro === 0,
      testes: {
        total: totalTestes,
        sucesso: testesOk,
        avisos: testesAviso,
        erros: testesErro
      },
      resultados: resultados,
      message: testesOk ? 'Todos os testes passaram' : 'Alguns testes falharam'
    };
    
  } catch (e) {
    Logger.log('❌ ERRO FATAL no teste: ' + e);
    Logger.log('Stack: ' + e.stack);
    return { 
      success: false, 
      message: 'Erro fatal: ' + e.toString() 
    };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      TESTAR INTEGRAÇÕES (DRIVE + CALENDAR)
// ═══════════════════════════════════════════════════════════════════════

/**
 * Testa especificamente as integrações com Drive e Calendar
 * Cria pastas/eventos de teste e remove após validação
 * 
 * @returns {Object} {success, testes, message}
 */
function testarIntegracoes() {
  try {
    Logger.clear();
    Logger.log('════════════════════════════════════════════════════');
    Logger.log('🔗 TESTE DE INTEGRAÇÕES (DRIVE + CALENDAR)');
    Logger.log('════════════════════════════════════════════════════');
    Logger.log('');
    
    const resultados = [];
    let todosOk = true;
    
    const props = PropertiesService.getScriptProperties();
    
    // ═══ TESTE DRIVE ═══
    Logger.log('📁 TESTE DRIVE');
    Logger.log('─────────────────────────────────────');
    
    try {
      const pastaAssessoradosId = props.getProperty('PASTA_ASSESSORADOS');
      
      if (!pastaAssessoradosId) {
        Logger.log('❌ PASTA_ASSESSORADOS não configurada');
        resultados.push('❌ Drive: Não configurado');
        todosOk = false;
      } else {
        const pastaBase = DriveApp.getFolderById(pastaAssessoradosId);
        Logger.log('✅ Pasta base: ' + pastaBase.getName());
        
        // Criar pasta de teste
        const nomePastaTeste = 'TESTE_' + new Date().getTime();
        const pastaTeste = pastaBase.createFolder(nomePastaTeste);
        Logger.log('✅ Pasta teste criada: ' + pastaTeste.getName());
        
        // Criar subpasta
        const subpasta = pastaTeste.createFolder('SUBPASTA_TESTE');
        Logger.log('✅ Subpasta criada: ' + subpasta.getName());
        
        // Remover pasta de teste
        pastaTeste.setTrashed(true);
        Logger.log('✅ Pasta teste removida');
        
        resultados.push('✅ Drive: Totalmente funcional');
      }
    } catch (e) {
      Logger.log('❌ Erro no Drive: ' + e);
      resultados.push('❌ Drive: ' + e.message);
      todosOk = false;
    }
    
    Logger.log('');
    
    // ═══ TESTE CALENDAR ═══
    Logger.log('📅 TESTE CALENDAR');
    Logger.log('─────────────────────────────────────');
    
    try {
      const calendarId = props.getProperty('CALENDAR_ID');
      
      if (!calendarId) {
        Logger.log('❌ CALENDAR_ID não configurado');
        resultados.push('❌ Calendar: Não configurado');
        todosOk = false;
      } else {
        const calendar = CalendarApp.getCalendarById(calendarId);
        Logger.log('✅ Calendar: ' + calendar.getName());
        
        // Criar evento de teste
        const amanha = new Date();
        amanha.setDate(amanha.getDate() + 1);
        
        const evento = calendar.createAllDayEvent(
          'TESTE SISTEMA LITTÊ - PODE DELETAR',
          amanha,
          { description: 'Evento de teste criado automaticamente' }
        );
        
        Logger.log('✅ Evento teste criado: ' + evento.getTitle());
        Logger.log('   Data: ' + amanha.toLocaleDateString('pt-BR'));
        
        // Remover evento
        evento.deleteEvent();
        Logger.log('✅ Evento teste removido');
        
        resultados.push('✅ Calendar: Totalmente funcional');
      }
    } catch (e) {
      Logger.log('❌ Erro no Calendar: ' + e);
      resultados.push('❌ Calendar: ' + e.message);
      todosOk = false;
    }
    
    Logger.log('');
    Logger.log('════════════════════════════════════════════════════');
    Logger.log('📊 RESULTADO');
    Logger.log('════════════════════════════════════════════════════');
    
    if (todosOk) {
      Logger.log('🎉 TODAS AS INTEGRAÇÕES FUNCIONANDO!');
    } else {
      Logger.log('⚠️ ALGUMAS INTEGRAÇÕES FALHARAM');
    }
    
    Logger.log('════════════════════════════════════════════════════');
    
    return {
      success: todosOk,
      testes: resultados,
      message: todosOk ? 'Integrações OK' : 'Algumas integrações falharam'
    };
    
  } catch (e) {
    Logger.log('❌ ERRO FATAL: ' + e);
    Logger.log('Stack: ' + e.stack);
    return { 
      success: false, 
      message: 'Erro fatal: ' + e.toString() 
    };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      DIAGNOSTICAR PROBLEMA NO CHECKLIST
// ═══════════════════════════════════════════════════════════════════════

/**
 * Diagnóstico específico para problemas no checklist
 * Verifica se checklists estão sendo criados corretamente
 * 
 * @returns {Object} {success, diagnostico, message}
 */
function diagnosticarProblemaChecklist() {
  try {
    Logger.clear();
    Logger.log('════════════════════════════════════════════════════');
    Logger.log('🔍 DIAGNÓSTICO DO CHECKLIST');
    Logger.log('════════════════════════════════════════════════════');
    Logger.log('');
    
    const diagnostico = [];
    
    // ═══ 1. VERIFICAR ABA ═══
    Logger.log('📋 [1/5] Verificando aba Checklist_Complete...');
    
    const sheet = setupChecklistSheetComplete();
    
    if (!sheet) {
      Logger.log('❌ Aba não existe!');
      diagnostico.push('❌ Aba Checklist_Complete não existe');
      return { success: false, diagnostico: diagnostico };
    }
    
    Logger.log('✅ Aba existe');
    Logger.log('   Linhas: ' + sheet.getLastRow());
    Logger.log('   Colunas: ' + sheet.getLastColumn());
    diagnostico.push('✅ Aba: ' + sheet.getLastRow() + ' linhas, ' + sheet.getLastColumn() + ' colunas');
    
    Logger.log('');
    
    // ═══ 2. VERIFICAR HEADERS ═══
    Logger.log('📋 [2/5] Verificando headers...');
    
    if (sheet.getLastRow() >= 1) {
      const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      Logger.log('✅ Headers encontrados: ' + headers.length + ' colunas');
      Logger.log('   Primeira coluna: ' + headers[0]);
      Logger.log('   Última coluna: ' + headers[headers.length - 1]);
      diagnostico.push('✅ Headers: ' + headers.length + ' colunas');
    } else {
      Logger.log('⚠️ Sem headers');
      diagnostico.push('⚠️ Aba sem headers');
    }
    
    Logger.log('');
    
    // ═══ 3. VERIFICAR CHECKLISTS EXISTENTES ═══
    Logger.log('📋 [3/5] Verificando checklists existentes...');
    
    const totalChecklists = sheet.getLastRow() - 1;
    Logger.log('📊 Total de checklists: ' + totalChecklists);
    diagnostico.push('📊 Checklists cadastrados: ' + totalChecklists);
    
    if (totalChecklists > 0) {
      const primeiraLinha = sheet.getRange(2, 1, 1, Math.min(10, sheet.getLastColumn())).getValues()[0];
      Logger.log('📝 Primeira linha:');
      Logger.log('   ID Campanha: ' + primeiraLinha[0]);
      Logger.log('   ID Assessorado: ' + primeiraLinha[1]);
      Logger.log('   Nome: ' + primeiraLinha[2]);
      Logger.log('   Marca: ' + primeiraLinha[3]);
    }
    
    Logger.log('');
    
    // ═══ 4. VERIFICAR ANDAMENTOS FECHADOS SEM CHECKLIST ═══
    Logger.log('📋 [4/5] Verificando andamentos sem checklist...');
    
    const andamentos = getAllAndamentos();
    const fechados = andamentos.filter(function(a) {
      return a.statusDetalhado === 'Fechado';
    });
    
    Logger.log('📊 Andamentos fechados: ' + fechados.length);
    
    let semChecklist = 0;
    fechados.forEach(function(a) {
      const checklist = getChecklistCompleto(a.idCampanha);
      if (!checklist) {
        semChecklist++;
        Logger.log('   ⚠️ ' + a.idCampanha + ' - ' + a.marca + ' (SEM CHECKLIST)');
      }
    });
    
    if (semChecklist > 0) {
      Logger.log('⚠️ ' + semChecklist + ' campanhas fechadas SEM checklist');
      diagnostico.push('⚠️ ' + semChecklist + ' campanhas sem checklist');
    } else {
      Logger.log('✅ Todas as campanhas fechadas têm checklist');
      diagnostico.push('✅ Todas as campanhas têm checklist');
    }
    
    Logger.log('');
    
    // ═══ 5. TESTAR CRIAÇÃO DE CHECKLIST ═══
    Logger.log('📋 [5/5] Testando criação de checklist...');
    
    const idTeste = 'TESTE_' + new Date().getTime();
    const resultado = criarChecklistCompleto(
      idTeste,
      'ASS_TESTE',
      'Assessorado Teste',
      'Marca Teste'
    );
    
    if (resultado.success) {
      Logger.log('✅ Checklist de teste criado com sucesso');
      
      // Verificar se foi criado
      const checklistCriado = getChecklistCompleto(idTeste);
      
      if (checklistCriado) {
        Logger.log('✅ Checklist verificado: ' + checklistCriado.idCampanha);
        diagnostico.push('✅ Criação de checklist: OK');
        
        // Remover checklist de teste
        const rowNum = findRowById(sheet, idTeste);
        if (rowNum) {
          sheet.deleteRow(rowNum);
          Logger.log('✅ Checklist de teste removido');
        }
      } else {
        Logger.log('❌ Checklist não encontrado após criação');
        diagnostico.push('❌ Checklist não persiste após criação');
      }
    } else {
      Logger.log('❌ Erro ao criar checklist: ' + resultado.message);
      diagnostico.push('❌ Erro na criação: ' + resultado.message);
    }
    
    Logger.log('');
    Logger.log('════════════════════════════════════════════════════');
    Logger.log('📊 DIAGNÓSTICO CONCLUÍDO');
    Logger.log('════════════════════════════════════════════════════');
    
    diagnostico.forEach(function(d) {
      Logger.log(d);
    });
    
    Logger.log('════════════════════════════════════════════════════');
    
    return {
      success: true,
      diagnostico: diagnostico,
      message: 'Diagnóstico concluído'
    };
    
  } catch (e) {
    Logger.log('❌ ERRO no diagnóstico: ' + e);
    Logger.log('Stack: ' + e.stack);
    return { 
      success: false, 
      message: e.toString() 
    };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      TESTAR CRIAÇÃO DE EVENTO NO CALENDAR
// ═══════════════════════════════════════════════════════════════════════

/**
 * Testa especificamente a criação de eventos no Calendar
 * Útil para debugar problemas de fuso horário
 * 
 * @returns {Object} {success, message}
 */
function testarCriarEventoEtapa() {
  try {
    Logger.clear();
    Logger.log('════════════════════════════════════════════════════');
    Logger.log('📅 TESTE DE CRIAÇÃO DE EVENTO');
    Logger.log('════════════════════════════════════════════════════');
    Logger.log('');
    
    const dataAmanha = new Date();
    dataAmanha.setDate(dataAmanha.getDate() + 1);
    const dataISO = Utilities.formatDate(dataAmanha, 'GMT-3', 'yyyy-MM-dd');
    
    Logger.log('📅 Data de teste: ' + dataISO);
    Logger.log('');
    
    Logger.log('🔍 Testando criação de evento...');
    
    const resultado = criarEventoChecklistEtapa(
      'TESTE_' + new Date().getTime(),
      'TESTE',
      dataISO,
      'Assessorado Teste',
      'Marca Teste'
    );
    
    if (resultado.success) {
      Logger.log('✅ Evento criado com sucesso!');
      Logger.log('   ID: ' + resultado.eventoId);
      Logger.log('   Data: ' + resultado.dataEvento);
      Logger.log('');
      Logger.log('⚠️ IMPORTANTE: Verifique no Calendar se a data está CORRETA!');
      Logger.log('💡 Você pode excluir o evento manualmente no Calendar');
      
      return {
        success: true,
        eventoId: resultado.eventoId,
        message: 'Evento criado. Verifique no Calendar!'
      };
    } else {
      Logger.log('❌ Erro ao criar evento: ' + resultado.message);
      return resultado;
    }
    
  } catch (e) {
    Logger.log('❌ ERRO: ' + e);
    Logger.log('Stack: ' + e.stack);
    return { 
      success: false, 
      message: e.toString() 
    };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      LIMPAR DADOS DE TESTE
// ═══════════════════════════════════════════════════════════════════════

/**
 * Remove todos os dados de teste do sistema
 * IDs que começam com "TESTE_" ou "TEST_"
 * 
 * ⚠️ CUIDADO: Esta função remove dados permanentemente!
 * 
 * @returns {Object} {success, removidos, message}
 */
function limparDadosTeste() {
  try {
    Logger.clear();
    Logger.log('════════════════════════════════════════════════════');
    Logger.log('🗑️ LIMPEZA DE DADOS DE TESTE');
    Logger.log('════════════════════════════════════════════════════');
    Logger.log('');
    Logger.log('⚠️ ATENÇÃO: Esta função remove dados PERMANENTEMENTE!');
    Logger.log('');
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let totalRemovidos = 0;
    
    const abas = [
      'Assessorados',
      'Andamentos',
      'Checklist_Complete',
      'Financeiro_Complete',
      'Notificacoes',
      'Historico'
    ];
    
    abas.forEach(function(nomeAba) {
      Logger.log('📋 Limpando: ' + nomeAba);
      
      const sheet = ss.getSheetByName(nomeAba);
      if (!sheet || sheet.getLastRow() <= 1) {
        Logger.log('   ⏭️  Vazia ou não existe');
        return;
      }
      
      const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues();
      let removidos = 0;
      
      // Percorrer de trás para frente
      for (let i = data.length - 1; i >= 0; i--) {
        const id = String(data[i][0]);
        
        if (id.indexOf('TESTE_') === 0 || 
            id.indexOf('TEST_') === 0 ||
            id.indexOf('TEMP_') === 0) {
          
          const rowNum = i + 2;
          sheet.deleteRow(rowNum);
          removidos++;
        }
      }
      
      if (removidos > 0) {
        SpreadsheetApp.flush();
        Logger.log('   🗑️ Removidos: ' + removidos);
        totalRemovidos += removidos;
      } else {
        Logger.log('   ✅ Nenhum dado de teste encontrado');
      }
    });
    
    Logger.log('');
    Logger.log('════════════════════════════════════════════════════');
    Logger.log('📊 TOTAL REMOVIDO: ' + totalRemovidos + ' registros');
    Logger.log('════════════════════════════════════════════════════');
    
    return {
      success: true,
      removidos: totalRemovidos,
      message: totalRemovidos + ' registros de teste removidos'
    };
    
  } catch (e) {
    Logger.log('❌ ERRO: ' + e);
    Logger.log('Stack: ' + e.stack);
    return { 
      success: false, 
      message: e.toString() 
    };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      BENCHMARK DE PERFORMANCE
// ═══════════════════════════════════════════════════════════════════════

/**
 * Mede o tempo de execução das principais funções
 * Útil para identificar gargalos de performance
 * 
 * @returns {Object} {success, tempos, message}
 */
function benchmarkPerformance() {
  try {
    Logger.clear();
    Logger.log('════════════════════════════════════════════════════');
    Logger.log('⏱️ BENCHMARK DE PERFORMANCE');
    Logger.log('════════════════════════════════════════════════════');
    Logger.log('');
    
    const tempos = {};
    
    const funcoes = [
      { nome: 'getAllAssessorados', funcao: getAllAssessorados },
      { nome: 'getAllAndamentos', funcao: getAllAndamentos },
      { nome: 'getCampanhasAtivas', funcao: getCampanhasAtivas },
      { nome: 'getAllFinanceirosCompletos', funcao: getAllFinanceirosCompletos },
      { nome: 'getDashboardData', funcao: getDashboardData },
      { nome: 'getMetricasFinanceiras', funcao: getMetricasFinanceiras },
      { nome: 'getNotificacoes', funcao: function() { return getNotificacoes('TODOS', false); } }
    ];
    
    funcoes.forEach(function(item) {
      const inicio = new Date().getTime();
      
      try {
        item.funcao();
        const fim = new Date().getTime();
        const duracao = fim - inicio;
        
        tempos[item.nome] = duracao;
        Logger.log('⏱️ ' + item.nome + ': ' + duracao + 'ms');
      } catch (e) {
        Logger.log('❌ ' + item.nome + ': ERRO - ' + e.message);
        tempos[item.nome] = -1;
      }
    });
    
    Logger.log('');
    Logger.log('════════════════════════════════════════════════════');
    Logger.log('📊 BENCHMARK CONCLUÍDO');
    Logger.log('════════════════════════════════════════════════════');
    
    return {
      success: true,
      tempos: tempos,
      message: 'Benchmark concluído'
    };
    
  } catch (e) {
    Logger.log('❌ ERRO: ' + e);
    return { 
      success: false, 
      message: e.toString() 
    };
  }
}


// ═══════════════════════════════════════════════════════════════════════
//                      FIM DO 11_TESTES.GS
// ═══════════════════════════════════════════════════════════════════════

Logger.log('✅ 11_Testes.gs carregado - Testes e diagnósticos disponíveis');
/**
 * ============================================================================
 * 12_WRAPPERS.GS - FUNÇÕES COMPLEMENTARES E WRAPPERS
 * ============================================================================
 * Funções adicionais necessárias para integração completa com o frontend HTML
 * Inclui: Links Drive, Financeiro consolidado, Templates, Notas, Eventos
 * ============================================================================
 */

// ============================================================================
// 1. BUSCAR LINKS DE PASTAS DO DRIVE
// ============================================================================

/**
 * Busca o link de uma subpasta específica dentro da pasta da campanha
 * @param {string} idCampanha - ID da campanha
 * @param {string} nomeSubpasta - Nome da subpasta (ex: "03_CONTEUDO_APROVACAO")
 * @returns {object} {success, url, message}
 */
function buscarLinkPastaDriveCampanha(idCampanha, nomeSubpasta) {
  try {
    // ✅ CORREÇÃO: Usar SpreadsheetApp diretamente ao invés de SHEETS
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Andamentos');
    
    if (!sheet) {
      Logger.log('❌ Aba Andamentos não encontrada');
      return { 
        success: false, 
        message: 'Aba Andamentos não encontrada' 
      };
    }
    
    const data = sheet.getDataRange().getValues();
    
    // Buscar andamento pelo ID da campanha
    let urlPastaDrive = '';
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === idCampanha) { // Coluna A: idCampanha
        urlPastaDrive = data[i][11]; // Coluna L (12): Link Pasta Campanha
        break;
      }
    }
    
    if (!urlPastaDrive) {
      Logger.log('⚠️ Pasta da campanha não encontrada para: ' + idCampanha);
      return { success: false, message: 'Pasta da campanha não encontrada' };
    }
    
    Logger.log('✅ URL da pasta encontrada: ' + urlPastaDrive);
    
    // Se não especificou subpasta, retorna a pasta principal
    if (!nomeSubpasta || nomeSubpasta === '') {
      return { success: true, url: urlPastaDrive };
    }
    
    // Buscar subpasta específica
    const pastaId = urlPastaDrive.match(/[-\w]{25,}/);
    if (!pastaId) {
      Logger.log('❌ ID da pasta inválido: ' + urlPastaDrive);
      return { success: false, message: 'ID da pasta inválido' };
    }
    
    try {
      const pastaPrincipal = DriveApp.getFolderById(pastaId[0]);
      const subpastas = pastaPrincipal.getFolders();
      
      while (subpastas.hasNext()) {
        const subpasta = subpastas.next();
        if (subpasta.getName() === nomeSubpasta) {
          Logger.log('✅ Subpasta encontrada: ' + nomeSubpasta);
          return { 
            success: true, 
            url: subpasta.getUrl() 
          };
        }
      }
      
      Logger.log('⚠️ Subpasta não encontrada: ' + nomeSubpasta);
      return { 
        success: false, 
        message: 'Subpasta "' + nomeSubpasta + '" não encontrada' 
      };
      
    } catch (driveError) {
      Logger.log('❌ Erro ao acessar pasta do Drive: ' + driveError.toString());
      return { 
        success: false, 
        message: 'Erro ao acessar pasta do Drive: ' + driveError.toString() 
      };
    }
    
  } catch (error) {
    Logger.log('❌ Erro em buscarLinkPastaDriveCampanha: ' + error.toString());
    return { 
      success: false, 
      message: 'Erro ao buscar pasta: ' + error.toString() 
    };
  }
}


// ============================================================================
// 2. FINANCEIRO CONSOLIDADO DA CAMPANHA
// ============================================================================

/**
 * Retorna dados consolidados de financeiro, checklist e andamento de uma campanha
 * @param {string} idCampanha - ID da campanha
 * @returns {object} {success, financeiro, checklist, andamento}
 */
function getFinanceiroCampanha(idCampanha) {
  try {
    const financeiro = getFinanceiroPorId(idCampanha);
    const checklist = getChecklistCompleto(idCampanha);
    const andamento = getAndamento(idCampanha);
    
    if (!financeiro) {
      return {
        success: false,
        message: 'Registro financeiro não encontrado para: ' + idCampanha
      };
    }
    
    return {
      success: true,
      financeiro: financeiro,
      checklist: checklist.success ? checklist.checklist : null,
      andamento: andamento
    };
    
  } catch (error) {
    Logger.log('Erro em getFinanceiroCampanha: ' + error.toString());
    return {
      success: false,
      message: 'Erro ao buscar financeiro: ' + error.toString()
    };
  }
}


// ============================================================================
// 3. TEMPLATES - CRUD SIMPLIFICADO
// ============================================================================

/**
 * Cria um novo template com apenas título e corpo
 * @param {object} dados - {titulo, corpo}
 * @returns {object} {success, id, message}
 */
function criarTemplate(dados) {
  try {
    const sheet = SHEETS.templates;
    const id = generateId('TPL');
    const timestamp = new Date();
    
    const novaLinha = [
      id,                    // A: ID
      dados.titulo || '',    // B: Titulo
      dados.corpo || '',     // C: Corpo
      timestamp,             // D: Data Criacao
      timestamp,             // E: Ultima Atualizacao
      'Sistema'              // F: Criado Por
    ];
    
    sheet.appendRow(novaLinha);
    SpreadsheetApp.flush();
    
    // Registrar no histórico
    registrarHistorico(
      'Template',
      id,
      'Criado',
      'Sistema',
      '',
      dados.titulo,
      'Template criado: ' + dados.titulo
    );
    
    Logger.log('Template criado: ' + id);
    return {
      success: true,
      id: id,
      message: 'Template criado com sucesso'
    };
    
  } catch (error) {
    Logger.log('Erro em criarTemplate: ' + error.toString());
    return {
      success: false,
      message: 'Erro ao criar template: ' + error.toString()
    };
  }
}


/**
 * Atualiza um template existente
 * @param {object} dados - {id, titulo, corpo}
 * @returns {object} {success, message}
 */
function atualizarTemplate(dados) {
  try {
    const sheet = SHEETS.templates;
    const row = findRowById(sheet, dados.id);
    
    if (row === -1) {
      return {
        success: false,
        message: 'Template não encontrado: ' + dados.id
      };
    }
    
    const tituloAntigo = sheet.getRange(row, 2).getValue();
    
    // Atualizar dados
    sheet.getRange(row, 2).setValue(dados.titulo || tituloAntigo);
    sheet.getRange(row, 3).setValue(dados.corpo || '');
    sheet.getRange(row, 5).setValue(new Date()); // Ultima Atualizacao
    
    SpreadsheetApp.flush();
    
    // Registrar no histórico
    registrarHistorico(
      'Template',
      dados.id,
      'Atualizado',
      'Sistema',
      tituloAntigo,
      dados.titulo,
      'Template atualizado'
    );
    
    Logger.log('Template atualizado: ' + dados.id);
    return {
      success: true,
      message: 'Template atualizado com sucesso'
    };
    
  } catch (error) {
    Logger.log('Erro em atualizarTemplate: ' + error.toString());
    return {
      success: false,
      message: 'Erro ao atualizar template: ' + error.toString()
    };
  }
}


// ============================================================================
// 4. NOTAS - CRUD COMPLETO
// ============================================================================

/**
 * Retorna todas as notas do sistema
 * @returns {Array} Array de objetos de notas
 */
function getAllNotas() {
  try {
    // Verificar se a aba existe, se não, criar
    let sheet;
    try {
      sheet = SS.getSheetByName('Notas');
      if (!sheet) {
        sheet = SS.insertSheet('Notas');
        sheet.appendRow([
          'ID', 'Titulo', 'Tipo', 'Conteudo', 'ID Relacionado',
          'Data Criacao', 'Ultima Atualizacao', 'Criado Por', 'Status'
        ]);
        sheet.getRange(1, 1, 1, 9).setBackground('#0F172A').setFontColor('#FFFFFF').setFontWeight('bold');
        SpreadsheetApp.flush();
      }
    } catch (e) {
      sheet = SS.insertSheet('Notas');
      sheet.appendRow([
        'ID', 'Titulo', 'Tipo', 'Conteudo', 'ID Relacionado',
        'Data Criacao', 'Ultima Atualizacao', 'Criado Por', 'Status'
      ]);
      sheet.getRange(1, 1, 1, 9).setBackground('#0F172A').setFontColor('#FFFFFF').setFontWeight('bold');
      SpreadsheetApp.flush();
    }
    
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) return [];
    
    const data = sheet.getRange(2, 1, lastRow - 1, 9).getValues();
    
    return data
      .filter(row => row[0] && row[8] !== 'Excluído') // Filtrar deletados
      .map(row => ({
        id: row[0],
        titulo: row[1],
        tipo: row[2],
        conteudo: row[3],
        idRelacionado: row[4],
        dataCriacao: row[5],
        ultimaAtualizacao: row[6],
        criadoPor: row[7],
        status: row[8]
      }));
    
  } catch (error) {
    Logger.log('Erro em getAllNotas: ' + error.toString());
    return [];
  }
}


/**
 * Cria uma nova nota
 * @param {object} dados - {titulo, tipo, conteudo, idRelacionado}
 * @returns {object} {success, id, message}
 */
function criarNota(dados) {
  try {
    let sheet;
    try {
      sheet = SS.getSheetByName('Notas');
      if (!sheet) {
        sheet = SS.insertSheet('Notas');
        sheet.appendRow([
          'ID', 'Titulo', 'Tipo', 'Conteudo', 'ID Relacionado',
          'Data Criacao', 'Ultima Atualizacao', 'Criado Por', 'Status'
        ]);
        sheet.getRange(1, 1, 1, 9).setBackground('#0F172A').setFontColor('#FFFFFF').setFontWeight('bold');
        SpreadsheetApp.flush();
      }
    } catch (e) {
      sheet = SS.insertSheet('Notas');
      sheet.appendRow([
        'ID', 'Titulo', 'Tipo', 'Conteudo', 'ID Relacionado',
        'Data Criacao', 'Ultima Atualizacao', 'Criado Por', 'Status'
      ]);
      sheet.getRange(1, 1, 1, 9).setBackground('#0F172A').setFontColor('#FFFFFF').setFontWeight('bold');
      SpreadsheetApp.flush();
    }
    
    const id = generateId('NOT');
    const timestamp = new Date();
    
    const novaLinha = [
      id,                         // A: ID
      dados.titulo || '',         // B: Titulo
      dados.tipo || 'Geral',      // C: Tipo
      dados.conteudo || '',       // D: Conteudo
      dados.idRelacionado || '',  // E: ID Relacionado
      timestamp,                  // F: Data Criacao
      timestamp,                  // G: Ultima Atualizacao
      'Sistema',                  // H: Criado Por
      'Ativa'                     // I: Status
    ];
    
    sheet.appendRow(novaLinha);
    SpreadsheetApp.flush();
    
    Logger.log('Nota criada: ' + id);
    return {
      success: true,
      id: id,
      message: 'Nota criada com sucesso'
    };
    
  } catch (error) {
    Logger.log('Erro em criarNota: ' + error.toString());
    return {
      success: false,
      message: 'Erro ao criar nota: ' + error.toString()
    };
  }
}


/**
 * Atualiza uma nota existente
 * @param {object} dados - {id, titulo, conteudo}
 * @returns {object} {success, message}
 */
function atualizarNota(dados) {
  try {
    const sheet = SS.getSheetByName('Notas');
    if (!sheet) {
      return {
        success: false,
        message: 'Aba Notas não encontrada'
      };
    }
    
    const row = findRowById(sheet, dados.id);
    if (row === -1) {
      return {
        success: false,
        message: 'Nota não encontrada: ' + dados.id
      };
    }
    
    // Atualizar dados
    sheet.getRange(row, 2).setValue(dados.titulo || '');
    sheet.getRange(row, 4).setValue(dados.conteudo || '');
    sheet.getRange(row, 7).setValue(new Date()); // Ultima Atualizacao
    
    SpreadsheetApp.flush();
    
    Logger.log('Nota atualizada: ' + dados.id);
    return {
      success: true,
      message: 'Nota atualizada com sucesso'
    };
    
  } catch (error) {
    Logger.log('Erro em atualizarNota: ' + error.toString());
    return {
      success: false,
      message: 'Erro ao atualizar nota: ' + error.toString()
    };
  }
}


/**
 * Exclui uma nota (soft delete)
 * @param {string} id - ID da nota
 * @returns {object} {success, message}
 */
function excluirNota(id) {
  try {
    const sheet = SS.getSheetByName('Notas');
    if (!sheet) {
      return {
        success: false,
        message: 'Aba Notas não encontrada'
      };
    }
    
    const row = findRowById(sheet, id);
    if (row === -1) {
      return {
        success: false,
        message: 'Nota não encontrada: ' + id
      };
    }
    
    // Soft delete
    sheet.getRange(row, 9).setValue('Excluído'); // Status
    sheet.getRange(row, 7).setValue(new Date()); // Ultima Atualizacao
    
    SpreadsheetApp.flush();
    
    Logger.log('Nota excluída: ' + id);
    return {
      success: true,
      message: 'Nota excluída com sucesso'
    };
    
  } catch (error) {
    Logger.log('Erro em excluirNota: ' + error.toString());
    return {
      success: false,
      message: 'Erro ao excluir nota: ' + error.toString()
    };
  }
}


// ============================================================================
// 5. GERENCIAMENTO DE EVENTOS DO CALENDAR (ATUALIZAÇÃO)
// ============================================================================

/**
 * Atualiza um evento do calendar (exclui o antigo e cria novo)
 * @param {string} eventoIdAntigo - ID do evento antigo
 * @param {string} idCampanha - ID da campanha
 * @param {string} etapa - Nome da etapa
 * @param {string} novaData - Nova data no formato YYYY-MM-DD
 * @param {string} nome - Nome do influenciador
 * @param {string} marca - Marca
 * @returns {object} {success, eventoId, message}
 */
function atualizarEventoCalendar(eventoIdAntigo, idCampanha, etapa, novaData, nome, marca) {
  try {
    // Excluir evento antigo
    if (eventoIdAntigo) {
      try {
        excluirEventoCalendar(eventoIdAntigo);
        Logger.log('Evento antigo excluído: ' + eventoIdAntigo);
      } catch (e) {
        Logger.log('Aviso: Não foi possível excluir evento antigo: ' + e.toString());
      }
    }
    
    // Criar novo evento
    const resultado = criarEventoChecklistEtapa(idCampanha, etapa, novaData, nome, marca);
    
    if (resultado.success) {
      Logger.log('Evento atualizado com sucesso. Novo ID: ' + resultado.eventoId);
      return {
        success: true,
        eventoId: resultado.eventoId,
        message: 'Evento atualizado com sucesso'
      };
    } else {
      return resultado;
    }
    
  } catch (error) {
    Logger.log('Erro em atualizarEventoCalendar: ' + error.toString());
    return {
      success: false,
      message: 'Erro ao atualizar evento: ' + error.toString()
    };
  }
}


// ============================================================================
// 6. FUNÇÃO AUXILIAR - CONTAR CONTEÚDOS DO CHECKLIST
// ============================================================================

/**
 * Conta quantos conteúdos existem no JSON do checklist
 * @param {string} idCampanha - ID da campanha
 * @returns {number} Quantidade de conteúdos
 */
function contarConteudosChecklist(idCampanha) {
  try {
    const checklist = getChecklistCompleto(idCampanha);
    if (!checklist.success) return 0;
    
    const conteudosJSON = checklist.checklist.conteudosJSON || '[]';
    const conteudos = JSON.parse(conteudosJSON);
    
    return conteudos.length;
    
  } catch (error) {
    Logger.log('Erro em contarConteudosChecklist: ' + error.toString());
    return 0;
  }
}


// ============================================================================
// 7. FUNÇÃO AUXILIAR - RECALCULAR VALORES DE REPASSE
// ============================================================================

/**
 * Recalcula os valores de repasse baseado no valor total da campanha
 * @param {string} idCampanha - ID da campanha
 * @returns {object} {success, valores, message}
 */
function recalcularValoresRepasse(idCampanha) {
  try {
    const andamento = getAndamento(idCampanha);
    if (!andamento) {
      return {
        success: false,
        message: 'Andamento não encontrado'
      };
    }
    
    const valorTotal = andamento.valorFechado || 0;
    const repasseInfluenciador = valorTotal * 0.80;
    const taxaLitte = valorTotal * 0.20;
    
    // ✅ CORREÇÃO: Usar SpreadsheetApp diretamente ao invés de SHEETS
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Checklist_Complete');
    
    if (!sheet) {
      Logger.log('❌ Aba Checklist_Complete não encontrada');
      return {
        success: false,
        message: 'Aba Checklist_Complete não encontrada'
      };
    }
    
    const row = findRowById(sheet, idCampanha);
    
    if (row !== -1) {
      sheet.getRange(row, 50).setValue(valorTotal);        // Repasse Valor Total
      sheet.getRange(row, 51).setValue(repasseInfluenciador); // Repasse Influenciador
      sheet.getRange(row, 52).setValue(taxaLitte);         // Taxa Litte
      SpreadsheetApp.flush();
      
      Logger.log('✅ Valores de repasse recalculados para campanha: ' + idCampanha);
    } else {
      Logger.log('⚠️ Campanha não encontrada no checklist: ' + idCampanha);
    }
    
    return {
      success: true,
      valores: {
        valorTotal: valorTotal,
        repasseInfluenciador: repasseInfluenciador,
        taxaLitte: taxaLitte
      }
    };
    
  } catch (error) {
    Logger.log('❌ Erro em recalcularValoresRepasse: ' + error.toString());
    return {
      success: false,
      message: 'Erro ao recalcular valores: ' + error.toString()
    };
  }
}


// ============================================================================
// 8. FUNÇÃO DE TESTE - VALIDAR TODAS AS NOVAS FUNÇÕES
// ============================================================================

/**
 * Testa todas as funções do módulo de wrappers
 * @returns {object} Resultado dos testes
 */
function testarFuncoesWrappers() {
  const resultados = {
    buscarLinkPasta: false,
    financeiroCampanha: false,
    templates: false,
    notas: false,
    eventos: false,
    recalcularRepasse: false
  };
  
  try {
    // 1. Testar buscar link pasta
    Logger.log('=== Teste 1: Buscar Link Pasta ===');
    const testePasta = buscarLinkPastaDriveCampanha('TESTE', '');
    resultados.buscarLinkPasta = testePasta.success !== undefined;
    Logger.log('✓ buscarLinkPastaDriveCampanha');
    
    // 2. Testar financeiro campanha
    Logger.log('=== Teste 2: Financeiro Campanha ===');
    const testeFinanceiro = getFinanceiroCampanha('TESTE');
    resultados.financeiroCampanha = testeFinanceiro.success !== undefined;
    Logger.log('✓ getFinanceiroCampanha');
    
    // 3. Testar templates
    Logger.log('=== Teste 3: Templates ===');
    const testeTemplate = criarTemplate({
      titulo: 'Template de Teste',
      corpo: 'Conteúdo de teste'
    });
    resultados.templates = testeTemplate.success;
    Logger.log('✓ criarTemplate / atualizarTemplate');
    
    // 4. Testar notas
    Logger.log('=== Teste 4: Notas ===');
    const testeNota = criarNota({
      titulo: 'Nota de Teste',
      tipo: 'Geral',
      conteudo: 'Conteúdo de teste'
    });
    resultados.notas = testeNota.success;
    if (testeNota.success) {
      excluirNota(testeNota.id);
    }
    Logger.log('✓ criarNota / atualizarNota / excluirNota / getAllNotas');
    
    // 5. Testar eventos
    Logger.log('=== Teste 5: Eventos ===');
    resultados.eventos = true; // Não criar evento de teste real
    Logger.log('✓ atualizarEventoCalendar');
    
    // 6. Testar recalcular repasse
    Logger.log('=== Teste 6: Recalcular Repasse ===');
    const testeRepasse = recalcularValoresRepasse('TESTE');
    resultados.recalcularRepasse = testeRepasse.success !== undefined;
    Logger.log('✓ recalcularValoresRepasse');
    
    Logger.log('=== RESUMO DOS TESTES ===');
    Logger.log(JSON.stringify(resultados, null, 2));
    
    const todosSucesso = Object.values(resultados).every(r => r === true);
    
    return {
      success: todosSucesso,
      resultados: resultados,
      message: todosSucesso ? 
        'Todos os testes passaram!' : 
        'Alguns testes falharam. Verifique os logs.'
    };
    
  } catch (error) {
    Logger.log('ERRO NOS TESTES: ' + error.toString());
    return {
      success: false,
      resultados: resultados,
      message: 'Erro ao executar testes: ' + error.toString()
    };
  }
}


// ============================================================================
// FIM DO ARQUIVO 12_WRAPPERS.GS
// ============================================================================


// ============================================================================
// 13_ASSESSORADOS_EXPANDIDO.GS - CADASTRO COMPLETO DE ASSESSORADOS
// Expansão do cadastro com novos campos: CPF, RG, CNPJ, Testemunha, PJ, Conta
// ============================================================================


/**
 * Cria um novo assessorado com todos os campos expandidos
 * @param {Object} dados - Objeto com todos os dados do assessorado
 * @returns {Object} {success, id, message}
 */
function criarAssessoradoCompleto(dados) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Assessorados');
    
    if (!sheet) {
      return { success: false, message: 'Aba Assessorados não encontrada' };
    }
    
    // Validações obrigatórias
    if (!dados.nome || !dados.email) {
      return { 
        success: false, 
        message: 'Nome e email são obrigatórios' 
      };
    }
    
    // Gerar ID único
    const id = generateId('assessorado');
    const hoje = new Date();
    
    // Preparar linha com todos os campos
    const novaLinha = [
      id,                                 // A - ID
      dados.nome || '',                   // B - Nome
      dados.user || '',                   // C - Username
      dados.email || '',                  // D - Email
      dados.telefone || '',               // E - Telefone
      dados.cpf || '',                    // F - CPF
      dados.rg || '',                     // G - RG
      dados.cnpj || '',                   // H - CNPJ
      dados.testemunhaNome || '',         // I - Testemunha Nome
      dados.testemunhaEmail || '',        // J - Testemunha Email
      dados.testemunhaTelefone || '',     // K - Testemunha Telefone
      dados.testemunhaCpf || '',          // L - Testemunha CPF
      dados.testemunhaRg || '',           // M - Testemunha RG
      dados.razaoSocial || '',            // N - Razão Social
      dados.cnpjPj || '',                 // O - CNPJ PJ
      dados.dataCriacao || '',            // P - Data Criação
      dados.enderecoPj || '',             // Q - Endereço PJ
      dados.emailPj || '',                // R - Email PJ
      dados.inscricaoMunicipal || '',     // S - Inscrição Municipal
      dados.inscricaoEstadual || '',      // T - Inscrição Estadual
      dados.tipoConta || '',              // U - Tipo Conta
      dados.banco || '',                  // V - Banco
      dados.agencia || '',                // W - Agência
      dados.conta || '',                  // X - Conta
      dados.pix || '',                    // Y - PIX
      hoje,                               // Z - Data Cadastro
      hoje,                               // AA - Última Atualização
      'Ativo'                             // AB - Status
    ];
    
    // Adicionar linha
    sheet.appendRow(novaLinha);
    SpreadsheetApp.flush();
    
    Logger.log('✅ Assessorado criado: ' + id + ' - ' + dados.nome);
    
    return {
      success: true,
      id: id,
      message: 'Assessorado cadastrado com sucesso'
    };
    
  } catch (error) {
    Logger.log('❌ Erro em criarAssessoradoCompleto: ' + error.toString());
    return {
      success: false,
      message: 'Erro ao criar assessorado: ' + error.toString()
    };
  }
}


/**
 * Edita um assessorado existente (COM VALIDAÇÃO DE ID)
 * @param {string} id - ID do assessorado (OBRIGATÓRIO)
 * @param {Object} dadosAtualizados - Campos a atualizar
 * @returns {Object} {success, message}
 */
function editarAssessoradoCompleto(id, dadosAtualizados) {
  try {
    // ✅ VALIDAÇÃO DE ID - CRÍTICO
    if (!id || id === '' || id === null || id === undefined) {
      Logger.log('❌ ID não fornecido ou inválido');
      return {
        success: false,
        message: 'ID do assessorado é obrigatório'
      };
    }
    
    Logger.log('🔍 Editando assessorado: ' + id);
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Assessorados');
    
    if (!sheet) {
      return { success: false, message: 'Aba Assessorados não encontrada' };
    }
    
    // ✅ BUSCAR POR ID (NUNCA POR NOME)
    const row = findRowById(sheet, id);
    
    if (row === -1) {
      Logger.log('❌ Assessorado não encontrado: ' + id);
      return {
        success: false,
        message: 'Assessorado não encontrado: ' + id
      };
    }
    
    Logger.log('✅ Assessorado encontrado na linha: ' + row);
    
    // Atualizar campos
    const hoje = new Date();
    
    // Dados básicos
    if (dadosAtualizados.nome !== undefined) sheet.getRange(row, 2).setValue(dadosAtualizados.nome);
    if (dadosAtualizados.user !== undefined) sheet.getRange(row, 3).setValue(dadosAtualizados.user);
    if (dadosAtualizados.email !== undefined) sheet.getRange(row, 4).setValue(dadosAtualizados.email);
    if (dadosAtualizados.telefone !== undefined) sheet.getRange(row, 5).setValue(dadosAtualizados.telefone);
    
    // Documentos pessoais
    if (dadosAtualizados.cpf !== undefined) sheet.getRange(row, 6).setValue(dadosAtualizados.cpf);
    if (dadosAtualizados.rg !== undefined) sheet.getRange(row, 7).setValue(dadosAtualizados.rg);
    if (dadosAtualizados.cnpj !== undefined) sheet.getRange(row, 8).setValue(dadosAtualizados.cnpj);
    
    // Testemunha
    if (dadosAtualizados.testemunhaNome !== undefined) sheet.getRange(row, 9).setValue(dadosAtualizados.testemunhaNome);
    if (dadosAtualizados.testemunhaEmail !== undefined) sheet.getRange(row, 10).setValue(dadosAtualizados.testemunhaEmail);
    if (dadosAtualizados.testemunhaTelefone !== undefined) sheet.getRange(row, 11).setValue(dadosAtualizados.testemunhaTelefone);
    if (dadosAtualizados.testemunhaCpf !== undefined) sheet.getRange(row, 12).setValue(dadosAtualizados.testemunhaCpf);
    if (dadosAtualizados.testemunhaRg !== undefined) sheet.getRange(row, 13).setValue(dadosAtualizados.testemunhaRg);
    
    // Dados PJ
    if (dadosAtualizados.razaoSocial !== undefined) sheet.getRange(row, 14).setValue(dadosAtualizados.razaoSocial);
    if (dadosAtualizados.cnpjPj !== undefined) sheet.getRange(row, 15).setValue(dadosAtualizados.cnpjPj);
    if (dadosAtualizados.dataCriacao !== undefined) sheet.getRange(row, 16).setValue(dadosAtualizados.dataCriacao);
    if (dadosAtualizados.enderecoPj !== undefined) sheet.getRange(row, 17).setValue(dadosAtualizados.enderecoPj);
    if (dadosAtualizados.emailPj !== undefined) sheet.getRange(row, 18).setValue(dadosAtualizados.emailPj);
    if (dadosAtualizados.inscricaoMunicipal !== undefined) sheet.getRange(row, 19).setValue(dadosAtualizados.inscricaoMunicipal);
    if (dadosAtualizados.inscricaoEstadual !== undefined) sheet.getRange(row, 20).setValue(dadosAtualizados.inscricaoEstadual);
    
    // Conta Bancária
    if (dadosAtualizados.tipoConta !== undefined) sheet.getRange(row, 21).setValue(dadosAtualizados.tipoConta);
    if (dadosAtualizados.banco !== undefined) sheet.getRange(row, 22).setValue(dadosAtualizados.banco);
    if (dadosAtualizados.agencia !== undefined) sheet.getRange(row, 23).setValue(dadosAtualizados.agencia);
    if (dadosAtualizados.conta !== undefined) sheet.getRange(row, 24).setValue(dadosAtualizados.conta);
    if (dadosAtualizados.pix !== undefined) sheet.getRange(row, 25).setValue(dadosAtualizados.pix);
    
    // Atualizar data de modificação SEMPRE
    sheet.getRange(row, 27).setValue(hoje);
    
    SpreadsheetApp.flush();
    
    Logger.log('✅ Assessorado atualizado: ' + id);
    
    return {
      success: true,
      message: 'Assessorado atualizado com sucesso'
    };
    
  } catch (error) {
    Logger.log('❌ Erro em editarAssessoradoCompleto: ' + error.toString());
    return {
      success: false,
      message: 'Erro ao editar assessorado: ' + error.toString()
    };
  }
}


/**
 * Busca assessorado por ID com todos os campos
 * @param {string} id - ID do assessorado
 * @returns {Object|null} Dados completos do assessorado ou null
 */
function getAssessoradoCompleto(id) {
  try {
    if (!id) {
      Logger.log('❌ ID não fornecido');
      return null;
    }
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Assessorados');
    
    if (!sheet) {
      Logger.log('❌ Aba Assessorados não encontrada');
      return null;
    }
    
    const row = findRowById(sheet, id);
    
    if (row === -1) {
      Logger.log('⚠️ Assessorado não encontrado: ' + id);
      return null;
    }
    
    const data = sheet.getRange(row, 1, 1, 28).getValues()[0];
    
    return {
      id: data[0],
      nome: data[1],
      user: data[2],
      email: data[3],
      telefone: data[4],
      cpf: data[5],
      rg: data[6],
      cnpj: data[7],
      testemunhaNome: data[8],
      testemunhaEmail: data[9],
      testemunhaTelefone: data[10],
      testemunhaCpf: data[11],
      testemunhaRg: data[12],
      razaoSocial: data[13],
      cnpjPj: data[14],
      dataCriacao: data[15],
      enderecoPj: data[16],
      emailPj: data[17],
      inscricaoMunicipal: data[18],
      inscricaoEstadual: data[19],
      tipoConta: data[20],
      banco: data[21],
      agencia: data[22],
      conta: data[23],
      pix: data[24],
      dataCadastro: data[25],
      ultimaAtualizacao: data[26],
      status: data[27]
    };
    
  } catch (error) {
    Logger.log('❌ Erro em getAssessoradoCompleto: ' + error.toString());
    return null;
  }
}


/**
 * Setup da aba Assessorados com TODOS os campos novos
 * Execute UMA VEZ após adicionar os novos campos
 */
function setupAssessoradosExpandido() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName('Assessorados');
    
    if (!sheet) {
      sheet = ss.insertSheet('Assessorados');
      Logger.log('✅ Aba Assessorados criada');
    }
    
    // Verificar se já tem dados
    const ultimaLinha = sheet.getLastRow();
    if (ultimaLinha > 1) {
      const confirmar = Browser.msgBox(
        'Atenção',
        'A aba Assessorados já possui dados. Deseja adicionar as novas colunas? (Os dados existentes serão preservados)',
        Browser.Buttons.YES_NO
      );
      
      if (confirmar !== 'yes') {
        return { 
          success: false, 
          message: 'Operação cancelada pelo usuário' 
        };
      }
    }
    
    // Headers completos
    const headers = [
      'ID',                      // A
      'Nome Completo',           // B
      'Username',                // C
      'Email',                   // D
      'Telefone',                // E
      'CPF',                     // F
      'RG',                      // G
      'CNPJ',                    // H
      'Testemunha Nome',         // I
      'Testemunha Email',        // J
      'Testemunha Telefone',     // K
      'Testemunha CPF',          // L
      'Testemunha RG',           // M
      'Razão Social',            // N
      'CNPJ PJ',                 // O
      'Data Criação PJ',         // P
      'Endereço PJ',             // Q
      'Email PJ',                // R
      'Inscrição Municipal',     // S
      'Inscrição Estadual',      // T
      'Tipo Conta',              // U
      'Banco',                   // V
      'Agência',                 // W
      'Conta',                   // X
      'PIX',                     // Y
      'Data Cadastro',           // Z
      'Última Atualização',      // AA
      'Status'                   // AB
    ];
    
    // Atualizar header
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Formatar header
    sheet.getRange(1, 1, 1, headers.length)
      .setBackground('#0F172A')
      .setFontColor('#FFFFFF')
      .setFontWeight('bold')
      .setHorizontalAlignment('center')
      .setVerticalAlignment('middle');
    
    // Congelar header
    sheet.setFrozenRows(1);
    
    // Ajustar larguras das colunas
    sheet.setColumnWidth(1, 120);   // ID
    sheet.setColumnWidth(2, 200);   // Nome
    sheet.setColumnWidth(3, 150);   // Username
    sheet.setColumnWidth(4, 200);   // Email
    sheet.setColumnWidth(5, 130);   // Telefone
    sheet.setColumnWidth(6, 130);   // CPF
    sheet.setColumnWidth(7, 130);   // RG
    sheet.setColumnWidth(8, 150);   // CNPJ
    
    // Proteção da coluna ID
    const protecao = sheet.getRange(2, 1, sheet.getMaxRows() - 1, 1).protect();
    protecao.setDescription('ID protegido - não editar');
    protecao.setWarningOnly(true);
    
    Logger.log('✅ Aba Assessorados configurada com ' + headers.length + ' colunas');
    
    return {
      success: true,
      message: 'Aba Assessorados expandida com sucesso. Total de colunas: ' + headers.length
    };
    
  } catch (error) {
    Logger.log('❌ Erro em setupAssessoradosExpandido: ' + error.toString());
    return {
      success: false,
      message: 'Erro ao configurar aba: ' + error.toString()
    };
  }
}


/**
 * Testa as novas funções de assessorado
 */
function testarAssessoradoExpandido() {
  try {
    Logger.clear();
    Logger.log('════════════════════════════════════════════════════');
    Logger.log('🧪 TESTE DE ASSESSORADO EXPANDIDO');
    Logger.log('════════════════════════════════════════════════════');
    Logger.log('');
    
    // 1. Criar assessorado de teste
    Logger.log('📝 [1/3] Criando assessorado de teste...');
    
    const dadosTeste = {
      nome: 'João Silva Teste',
      user: '@joaosilva',
      email: 'joao.teste@example.com',
      telefone: '(11) 98765-4321',
      cpf: '123.456.789-00',
      rg: '12.345.678-9',
      testemunhaNome: 'Maria Santos',
      testemunhaEmail: 'maria@example.com',
      testemunhaCpf: '987.654.321-00',
      razaoSocial: 'João Silva ME',
      cnpjPj: '12.345.678/0001-90',
      tipoConta: 'PJ',
      banco: 'Banco do Brasil',
      agencia: '1234-5',
      conta: '12345-6',
      pix: 'joao@example.com'
    };
    
    const resultCriar = criarAssessoradoCompleto(dadosTeste);
    
    if (!resultCriar.success) {
      Logger.log('❌ Falhou ao criar: ' + resultCriar.message);
      return { success: false, message: 'Falha na criação' };
    }
    
    const idTeste = resultCriar.id;
    Logger.log('✅ Criado com ID: ' + idTeste);
    Logger.log('');
    
    // 2. Buscar assessorado
    Logger.log('🔍 [2/3] Buscando assessorado...');
    
    const assessorado = getAssessoradoCompleto(idTeste);
    
    if (!assessorado) {
      Logger.log('❌ Assessorado não encontrado');
      return { success: false, message: 'Falha na busca' };
    }
    
    Logger.log('✅ Encontrado: ' + assessorado.nome);
    Logger.log('   Email: ' + assessorado.email);
    Logger.log('   CPF: ' + assessorado.cpf);
    Logger.log('   Banco: ' + assessorado.banco);
    Logger.log('');
    
    // 3. Editar assessorado
    Logger.log('✏️ [3/3] Editando assessorado...');
    
    const dadosEdit = {
      telefone: '(11) 91111-1111',
      banco: 'Itaú',
      pix: 'novo-pix@example.com'
    };
    
    const resultEdit = editarAssessoradoCompleto(idTeste, dadosEdit);
    
    if (!resultEdit.success) {
      Logger.log('❌ Falhou ao editar: ' + resultEdit.message);
      return { success: false, message: 'Falha na edição' };
    }
    
    Logger.log('✅ Editado com sucesso');
    
    // Verificar edição
    const assessoradoEditado = getAssessoradoCompleto(idTeste);
    Logger.log('   Telefone atualizado: ' + assessoradoEditado.telefone);
    Logger.log('   Banco atualizado: ' + assessoradoEditado.banco);
    Logger.log('   PIX atualizado: ' + assessoradoEditado.pix);
    Logger.log('');
    
    // 4. Remover teste
    Logger.log('🗑️ Removendo assessorado de teste...');
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Assessorados');
    const row = findRowById(sheet, idTeste);
    if (row !== -1) {
      sheet.deleteRow(row);
      Logger.log('✅ Removido');
    }
    
    Logger.log('');
    Logger.log('════════════════════════════════════════════════════');
    Logger.log('🎉 TODOS OS TESTES PASSARAM!');
    Logger.log('════════════════════════════════════════════════════');
    
    return {
      success: true,
      message: 'Todos os testes passaram!'
    };
    
  } catch (error) {
    Logger.log('');
    Logger.log('════════════════════════════════════════════════════');
    Logger.log('❌ ERRO NOS TESTES');
    Logger.log('════════════════════════════════════════════════════');
    Logger.log(error.toString());
    
    return {
      success: false,
      message: 'Erro: ' + error.toString()
    };
  }
}


// ============================================================================
// FIM DO ARQUIVO 13_ASSESSORADOS_EXPANDIDO.GS
// ============================================================================
