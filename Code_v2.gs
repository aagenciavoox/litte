/**
 * ═══════════════════════════════════════════════════════════════
 * GOOGLE APPS SCRIPT - BACKEND MÍNIMO VIÁVEL
 * Sistema Littê v4.0 - Reconstruído do zero
 * ═══════════════════════════════════════════════════════════════
 */

/**
 * Função principal - Retorna o HTML da aplicação
 */
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Sistema Littê v4.0')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * ═══════════════════════════════════════════════════════════════
 * FUNÇÕES DE EXEMPLO - BACKEND
 * ═══════════════════════════════════════════════════════════════
 */

/**
 * Retorna dados básicos do sistema
 */
function getDadosSistema() {
  try {
    return {
      success: true,
      data: {
        nome: 'Sistema Littê',
        versao: '4.0',
        status: 'Operacional',
        timestamp: new Date().toISOString()
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * Exemplo de função que retorna estatísticas fictícias
 */
function getEstatisticas() {
  try {
    return {
      success: true,
      data: {
        totalCampanhas: 12,
        totalInfluencers: 8,
        valorTotal: 45000,
        campanhasAtivas: 5
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * Testa a conexão com o backend
 */
function testarConexao() {
  try {
    return {
      success: true,
      message: 'Backend conectado com sucesso!',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}
