# CORREÇÕES HTML - SISTEMA LITTÊ v3.5
## Guia de Implementação Frontend

---

## 🎯 PROBLEMAS IDENTIFICADOS

### 1. Alterações no HTML não são salvas na planilha
**Causa:** Possível falta de callbacks ou tratamento assíncrono inadequado
**Impacto:** Perda de dados, inconsistência entre interface e backend

### 2. Link da pasta não aparece no HTML
**Causa:** Função `buscarLinkPastaDriveCampanha` com erro (já corrigida no backend)
**Impacto:** Usuário não consegue acessar pasta da campanha

### 3. Comunicação síncrona bloqueante
**Causa:** Uso incorreto de `google.script.run`
**Impacto:** Interface trava durante operações

---

## ✅ PADRÃO CORRETO DE COMUNICAÇÃO

### Template Base para Todas as Operações

```javascript
// ============================================================================
// PADRÃO OBRIGATÓRIO PARA TODAS AS CHAMADAS AO BACKEND
// ============================================================================

function salvarDados(dados) {
  // 1️⃣ FEEDBACK IMEDIATO (não bloqueia UI)
  mostrarLoading('Salvando...');
  
  // 2️⃣ CHAMADA ASSÍNCRONA COM CALLBACKS
  google.script.run
    .withSuccessHandler(function(response) {
      // 3️⃣ ESCONDER LOADING
      esconderLoading();
      
      // 4️⃣ TRATAR RESPOSTA
      if (response && response.success) {
        mostrarToast('✅ Salvo com sucesso!', 'success');
        
        // 5️⃣ ATUALIZAR INTERFACE (não recarregar página)
        atualizarInterfaceLocal(dados);
        
      } else {
        // 6️⃣ TRATAR ERRO DO BACKEND
        const mensagem = response && response.message ? response.message : 'Erro desconhecido';
        mostrarToast('❌ Erro: ' + mensagem, 'error');
      }
    })
    .withFailureHandler(function(error) {
      // 7️⃣ TRATAR ERRO DE COMUNICAÇÃO
      esconderLoading();
      mostrarToast('❌ Erro de conexão', 'error');
      console.error('Erro:', error);
    })
    .funcaoDoBackend(dados);  // 8️⃣ CHAMADA DA FUNÇÃO
  
  // 9️⃣ INTERFACE CONTINUA RESPONSIVA (não espera resposta)
}
```

---

## 📝 IMPLEMENTAÇÕES ESPECÍFICAS

### 1. SALVAR ALTERAÇÕES EM ASSESSORADO

```javascript
// ============================================================================
// EDITAR ASSESSORADO - COM VALIDAÇÃO DE ID
// ============================================================================

function salvarAssessorado(idAssessorado, dadosFormulario) {
  // ✅ VALIDAÇÃO LOCAL PRIMEIRO
  if (!idAssessorado) {
    mostrarToast('❌ Erro: ID do assessorado não encontrado', 'error');
    return;
  }
  
  if (!dadosFormulario.nome || !dadosFormulario.email) {
    mostrarToast('❌ Nome e email são obrigatórios', 'error');
    return;
  }
  
  // ✅ VALIDAR CPF/CNPJ SE FORNECIDO
  if (dadosFormulario.cpf && !validarCPF(dadosFormulario.cpf)) {
    mostrarToast('❌ CPF inválido', 'error');
    return;
  }
  
  if (dadosFormulario.cnpj && !validarCNPJ(dadosFormulario.cnpj)) {
    mostrarToast('❌ CNPJ inválido', 'error');
    return;
  }
  
  // ✅ FEEDBACK IMEDIATO
  mostrarLoading('Salvando alterações...');
  desabilitarBotaoSalvar();
  
  // ✅ CHAMADA ASSÍNCRONA
  google.script.run
    .withSuccessHandler(function(response) {
      esconderLoading();
      habilitarBotaoSalvar();
      
      if (response && response.success) {
        mostrarToast('✅ Assessorado atualizado!', 'success');
        
        // Atualizar interface local (sem recarregar)
        atualizarCardAssessorado(idAssessorado, dadosFormulario);
        
        // Fechar modal se aberto
        fecharModal();
        
      } else {
        mostrarToast('❌ Erro: ' + (response.message || 'Erro ao salvar'), 'error');
      }
    })
    .withFailureHandler(function(error) {
      esconderLoading();
      habilitarBotaoSalvar();
      mostrarToast('❌ Erro de conexão', 'error');
      console.error('Erro ao salvar assessorado:', error);
    })
    .editarAssessoradoCompleto(idAssessorado, dadosFormulario);
  
  // Interface continua responsiva
}

// ============================================================================
// CRIAR NOVO ASSESSORADO
// ============================================================================

function criarNovoAssessorado(dadosFormulario) {
  // Validações locais
  if (!dadosFormulario.nome || !dadosFormulario.email) {
    mostrarToast('❌ Nome e email são obrigatórios', 'error');
    return;
  }
  
  mostrarLoading('Criando assessorado...');
  desabilitarBotaoSalvar();
  
  google.script.run
    .withSuccessHandler(function(response) {
      esconderLoading();
      habilitarBotaoSalvar();
      
      if (response && response.success) {
        mostrarToast('✅ Assessorado criado! ID: ' + response.id, 'success');
        
        // Adicionar na lista local
        adicionarAssessoradoNaLista({
          id: response.id,
          ...dadosFormulario
        });
        
        fecharModal();
        limparFormulario();
        
      } else {
        mostrarToast('❌ Erro: ' + (response.message || 'Erro ao criar'), 'error');
      }
    })
    .withFailureHandler(function(error) {
      esconderLoading();
      habilitarBotaoSalvar();
      mostrarToast('❌ Erro de conexão', 'error');
      console.error('Erro ao criar assessorado:', error);
    })
    .criarAssessoradoCompleto(dadosFormulario);
}
```

---

### 2. EXIBIR LINK DA PASTA DA CAMPANHA

```javascript
// ============================================================================
// BUSCAR E EXIBIR LINK DA PASTA
// ============================================================================

function exibirLinkPastaCampanha(idCampanha, containerElemento) {
  // Verificar se já tem link no DOM (cache local)
  const linkExistente = containerElemento.querySelector('.link-pasta');
  if (linkExistente) {
    return; // Já carregado
  }
  
  // Mostrar skeleton/loading
  containerElemento.innerHTML = '<div class="skeleton h-10 w-48"></div>';
  
  // Buscar link do backend
  google.script.run
    .withSuccessHandler(function(response) {
      if (response && response.success && response.url) {
        // ✅ Exibir link
        containerElemento.innerHTML = `
          <a href="${response.url}" 
             target="_blank" 
             class="link-pasta flex items-center gap-2 text-litte-green hover:text-litte-accent transition">
            <i data-lucide="folder-open" class="w-5 h-5"></i>
            <span>Abrir Pasta da Campanha</span>
            <i data-lucide="external-link" class="w-4 h-4"></i>
          </a>
        `;
        
        // Inicializar ícones Lucide
        lucide.createIcons();
        
      } else {
        // ⚠️ Link não disponível
        containerElemento.innerHTML = `
          <div class="text-slate-400 text-sm flex items-center gap-2">
            <i data-lucide="alert-circle" class="w-4 h-4"></i>
            <span>Pasta não disponível</span>
          </div>
        `;
        
        lucide.createIcons();
      }
    })
    .withFailureHandler(function(error) {
      console.error('Erro ao buscar link da pasta:', error);
      containerElemento.innerHTML = `
        <div class="text-red-500 text-sm">
          Erro ao carregar link
        </div>
      `;
    })
    .buscarLinkPastaDriveCampanha(idCampanha, '');
}

// ============================================================================
// ATUALIZAR LINK QUANDO STATUS MUDAR PARA "FECHADO"
// ============================================================================

function aoMudarStatusCampanha(idCampanha, novoStatus) {
  // Salvar status
  salvarStatusCampanha(idCampanha, novoStatus);
  
  // Se ficou "Fechado", atualizar link da pasta
  if (novoStatus === 'Fechado') {
    const containerPasta = document.getElementById('pasta-' + idCampanha);
    if (containerPasta) {
      exibirLinkPastaCampanha(idCampanha, containerPasta);
    }
  }
}
```

---

### 3. AUTO-SAVE EM FORMULÁRIOS

```javascript
// ============================================================================
// AUTO-SAVE COM DEBOUNCE
// ============================================================================

// Cache de timers para debounce
const autoSaveTimers = {};

function configurarAutoSave(formId, idRegistro, funcaoSalvar) {
  const form = document.getElementById(formId);
  if (!form) return;
  
  // Adicionar listeners em todos os inputs
  const inputs = form.querySelectorAll('input, textarea, select');
  
  inputs.forEach(input => {
    // Salvar ao perder foco
    input.addEventListener('blur', function() {
      salvarComDebounce(formId, idRegistro, funcaoSalvar, 500);
    });
    
    // Salvar ao digitar (com debounce maior)
    input.addEventListener('input', function() {
      salvarComDebounce(formId, idRegistro, funcaoSalvar, 2000);
    });
  });
}

function salvarComDebounce(formId, idRegistro, funcaoSalvar, delay) {
  // Limpar timer anterior
  if (autoSaveTimers[formId]) {
    clearTimeout(autoSaveTimers[formId]);
  }
  
  // Criar novo timer
  autoSaveTimers[formId] = setTimeout(function() {
    // Coletar dados do formulário
    const form = document.getElementById(formId);
    const dadosFormulario = coletarDadosFormulario(form);
    
    // Mostrar indicador sutil de salvamento
    mostrarIndicadorAutoSave();
    
    // Salvar
    funcaoSalvar(idRegistro, dadosFormulario);
    
  }, delay);
}

function mostrarIndicadorAutoSave() {
  const indicador = document.getElementById('auto-save-indicator');
  if (indicador) {
    indicador.textContent = '💾 Salvando...';
    indicador.classList.remove('hidden');
    
    setTimeout(function() {
      indicador.textContent = '✅ Salvo';
      setTimeout(function() {
        indicador.classList.add('hidden');
      }, 1000);
    }, 500);
  }
}
```

---

### 4. CRIAR EVENTO NO CALENDÁRIO

```javascript
// ============================================================================
// CRIAR EVENTO COM VALIDAÇÃO DE DATA
// ============================================================================

function criarEventoChecklistEtapa(idCampanha, etapa, dataPrevista, nome, marca) {
  // ✅ VALIDAR DATA LOCALMENTE ANTES DE ENVIAR
  if (!dataPrevista) {
    mostrarToast('❌ Data é obrigatória', 'error');
    return;
  }
  
  // Converter para formato ISO (YYYY-MM-DD)
  const dataISO = converterParaISO(dataPrevista);
  
  if (!dataISO) {
    mostrarToast('❌ Data inválida', 'error');
    return;
  }
  
  console.log('Criando evento:', {
    idCampanha,
    etapa,
    dataISO,
    nome,
    marca
  });
  
  mostrarLoading('Criando evento no calendário...');
  
  google.script.run
    .withSuccessHandler(function(response) {
      esconderLoading();
      
      if (response && response.success) {
        mostrarToast('✅ Evento criado!', 'success');
        
        // Salvar ID do evento localmente
        if (response.eventoId) {
          salvarEventoIdLocal(idCampanha, etapa, response.eventoId);
        }
        
      } else {
        mostrarToast('❌ Erro: ' + (response.message || 'Erro ao criar evento'), 'error');
      }
    })
    .withFailureHandler(function(error) {
      esconderLoading();
      mostrarToast('❌ Erro de comunicação', 'error');
      console.error('Erro ao criar evento:', error);
    })
    .criarEventoChecklistEtapa(idCampanha, etapa, dataISO, nome, marca);
}

// ============================================================================
// CONVERTER DATA PARA ISO
// ============================================================================

function converterParaISO(data) {
  try {
    let dataObj;
    
    // Se for string
    if (typeof data === 'string') {
      // Se já está em ISO
      if (data.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return data;
      }
      
      // Tentar parsear
      dataObj = new Date(data);
    } 
    // Se for objeto Date
    else if (data instanceof Date) {
      dataObj = data;
    }
    // Se for input type="date"
    else if (data && data.value) {
      return data.value; // Já retorna em ISO
    }
    else {
      return null;
    }
    
    // Verificar se é válida
    if (isNaN(dataObj.getTime())) {
      return null;
    }
    
    // Converter para ISO (YYYY-MM-DD)
    const ano = dataObj.getFullYear();
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const dia = String(dataObj.getDate()).padStart(2, '0');
    
    return `${ano}-${mes}-${dia}`;
    
  } catch (error) {
    console.error('Erro ao converter data:', error);
    return null;
  }
}
```

---

## 🔧 FUNÇÕES AUXILIARES OBRIGATÓRIAS

```javascript
// ============================================================================
// VALIDAÇÃO DE CPF
// ============================================================================

function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]/g, '');
  
  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = 11 - (soma % 11);
  let digito1 = resto >= 10 ? 0 : resto;
  
  if (digito1 !== parseInt(cpf.charAt(9))) return false;
  
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = 11 - (soma % 11);
  let digito2 = resto >= 10 ? 0 : resto;
  
  return digito2 === parseInt(cpf.charAt(10));
}

// ============================================================================
// VALIDAÇÃO DE CNPJ
// ============================================================================

function validarCNPJ(cnpj) {
  cnpj = cnpj.replace(/[^\d]/g, '');
  
  if (cnpj.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(cnpj)) return false;
  
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  
  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(0)) return false;
  
  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  return resultado == digitos.charAt(1);
}

// ============================================================================
// COLETAR DADOS DO FORMULÁRIO
// ============================================================================

function coletarDadosFormulario(form) {
  const formData = {};
  const inputs = form.querySelectorAll('input, textarea, select');
  
  inputs.forEach(input => {
    const nome = input.name || input.id;
    if (nome) {
      if (input.type === 'checkbox') {
        formData[nome] = input.checked;
      } else if (input.type === 'radio') {
        if (input.checked) {
          formData[nome] = input.value;
        }
      } else {
        formData[nome] = input.value;
      }
    }
  });
  
  return formData;
}

// ============================================================================
// SISTEMA DE TOAST
// ============================================================================

function mostrarToast(mensagem, tipo) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${tipo}`;
  
  const icone = tipo === 'success' ? 'check-circle' : 
                tipo === 'error' ? 'x-circle' : 'info';
  
  toast.innerHTML = `
    <i data-lucide="${icone}" class="w-5 h-5"></i>
    <span>${mensagem}</span>
  `;
  
  container.appendChild(toast);
  lucide.createIcons();
  
  // Remover após 4 segundos
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(400px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ============================================================================
// LOADING OVERLAY
// ============================================================================

function mostrarLoading(texto) {
  const overlay = document.getElementById('loading-overlay');
  const loadingText = document.getElementById('loading-text');
  
  if (overlay) {
    overlay.classList.remove('hidden');
    if (loadingText && texto) {
      loadingText.textContent = texto;
    }
  }
}

function esconderLoading() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) {
    overlay.classList.add('hidden');
  }
}
```

---

## 📋 FORMULÁRIO DE ASSESSORADO EXPANDIDO

```html
<!-- ============================================================================ -->
<!-- FORMULÁRIO COMPLETO DE ASSESSORADO -->
<!-- ============================================================================ -->

<form id="form-assessorado" class="space-y-6">
  
  <!-- DADOS BÁSICOS -->
  <div class="border-b pb-6">
    <h3 class="text-lg font-semibold mb-4">Dados Básicos</h3>
    
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium mb-2">Nome Completo *</label>
        <input type="text" name="nome" required
               class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-litte-green">
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-2">Username</label>
        <input type="text" name="user" placeholder="@username"
               class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-litte-green">
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-2">Email *</label>
        <input type="email" name="email" required
               class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-litte-green">
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-2">Telefone</label>
        <input type="tel" name="telefone" placeholder="(11) 98765-4321"
               class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-litte-green">
      </div>
    </div>
  </div>
  
  <!-- DOCUMENTOS PESSOAIS -->
  <div class="border-b pb-6">
    <h3 class="text-lg font-semibold mb-4">Documentos Pessoais</h3>
    
    <div class="grid grid-cols-3 gap-4">
      <div>
        <label class="block text-sm font-medium mb-2">CPF</label>
        <input type="text" name="cpf" placeholder="000.000.000-00"
               class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-litte-green">
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-2">RG</label>
        <input type="text" name="rg" placeholder="00.000.000-0"
               class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-litte-green">
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-2">CNPJ</label>
        <input type="text" name="cnpj" placeholder="00.000.000/0000-00"
               class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-litte-green">
      </div>
    </div>
  </div>
  
  <!-- TESTEMUNHA -->
  <div class="border-b pb-6">
    <h3 class="text-lg font-semibold mb-4">Dados da Testemunha</h3>
    
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium mb-2">Nome Completo</label>
        <input type="text" name="testemunhaNome"
               class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-litte-green">
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-2">Email</label>
        <input type="email" name="testemunhaEmail"
               class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-litte-green">
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-2">Telefone</label>
        <input type="tel" name="testemunhaTelefone"
               class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-litte-green">
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-2">CPF</label>
        <input type="text" name="testemunhaCpf"
               class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-litte-green">
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-2">RG</label>
        <input type="text" name="testemunhaRg"
               class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-litte-green">
      </div>
    </div>
  </div>
  
  <!-- DADOS PJ -->
  <div class="border-b pb-6">
    <h3 class="text-lg font-semibold mb-4">Dados da Pessoa Jurídica</h3>
    
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium mb-2">Razão Social</label>
        <input type="text" name="razaoSocial"
               class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-litte-green">
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-2">CNPJ PJ</label>
        <input type="text" name="cnpjPj"
               class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-litte-green">
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-2">Data de Criação</label>
        <input type="date" name="dataCriacao"
               class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-litte-green">
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-2">Email PJ</label>
        <input type="email" name="emailPj"
               class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-litte-green">
      </div>
      
      <div class="col-span-2">
        <label class="block text-sm font-medium mb-2">Endereço PJ</label>
        <input type="text" name="enderecoPj"
               class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-litte-green">
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-2">Inscrição Municipal</label>
        <input type="text" name="inscricaoMunicipal"
               class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-litte-green">
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-2">Inscrição Estadual</label>
        <input type="text" name="inscricaoEstadual"
               class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-litte-green">
      </div>
    </div>
  </div>
  
  <!-- DADOS BANCÁRIOS -->
  <div class="pb-6">
    <h3 class="text-lg font-semibold mb-4">Dados Bancários</h3>
    
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium mb-2">Tipo de Conta</label>
        <select name="tipoConta"
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-litte-green">
          <option value="">Selecione</option>
          <option value="PF">Pessoa Física</option>
          <option value="PJ">Pessoa Jurídica</option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-2">Banco</label>
        <input type="text" name="banco" placeholder="Nome do banco"
               class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-litte-green">
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-2">Agência</label>
        <input type="text" name="agencia" placeholder="0000-0"
               class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-litte-green">
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-2">Conta</label>
        <input type="text" name="conta" placeholder="00000-0"
               class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-litte-green">
      </div>
      
      <div class="col-span-2">
        <label class="block text-sm font-medium mb-2">Chave PIX</label>
        <input type="text" name="pix" placeholder="email@example.com, telefone ou CPF"
               class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-litte-green">
      </div>
    </div>
  </div>
  
  <!-- BOTÕES -->
  <div class="flex justify-end gap-3 pt-4 border-t">
    <button type="button" onclick="fecharModal()" 
            class="btn-secondary px-6 py-2 rounded-lg">
      Cancelar
    </button>
    <button type="submit" id="btn-salvar-assessorado"
            class="btn-primary px-6 py-2 rounded-lg">
      Salvar Assessorado
    </button>
  </div>
  
</form>

<!-- Auto-save indicator -->
<div id="auto-save-indicator" 
     class="fixed bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-lg hidden">
  💾 Salvando...
</div>
```

---

## 🎯 CHECKLIST DE IMPLEMENTAÇÃO

### Frontend (HTML/JS)

- [ ] Substituir todas as chamadas síncronas por assíncronas com callbacks
- [ ] Adicionar formulário expandido de assessorado
- [ ] Implementar validação de CPF/CNPJ
- [ ] Adicionar auto-save em formulários
- [ ] Implementar exibição do link da pasta
- [ ] Adicionar tratamento de erros em todas as operações
- [ ] Implementar sistema de toast
- [ ] Configurar loading overlay
- [ ] Testar todas as operações

### Testes Obrigatórios

- [ ] Criar assessorado com todos os campos
- [ ] Editar assessorado existente
- [ ] Verificar auto-save funcionando
- [ ] Criar evento no calendário
- [ ] Visualizar link da pasta após fechar campanha
- [ ] Testar offline/erro de conexão
- [ ] Verificar sincronização HTML ↔ Sheets

---

## ⚠️ REGRAS CRÍTICAS

1. **NUNCA bloquear a interface** - Usar sempre callbacks assíncronos
2. **SEMPRE validar dados localmente** antes de enviar ao backend
3. **SEMPRE tratar erros** em `withFailureHandler`
4. **SEMPRE dar feedback** ao usuário (loading, toast, etc)
5. **SEMPRE usar ID** como chave primária (nunca nome)
6. **SEMPRE converter datas** para formato ISO antes de enviar
7. **NUNCA recarregar página** - Atualizar interface localmente

---

**Documento criado em:** 2026-01-07
**Versão:** 1.0
**Sistema:** Littê v3.5
