# IR Game Lab Mobile

Jogo mobile em **HTML único** para ensinar **espectroscopia no infravermelho (IR)** de forma visual, interativa e atrativa em sala de aula.

Foi pensado para funcionar bem no **celular dos alunos**, sem instalação e com opção de uso:
- **offline**, salvando ranking no próprio aparelho
- **online**, com ranking compartilhado para toda a turma

## O que o material oferece

### Modo explorar
- espectros IR interativos
- bandas clicáveis
- animações de vibração molecular
- moléculas modelo com explicações
- regiões principais do IR
- roteiro rápido de interpretação

### Modo jogo
- **3 fases** progressivas
- **140 segundos** de desafio
- **3 vidas**
- sistema de **pontuação com bônus por sequência**
- **medalhas**: Bronze, Prata, Ouro e IR Master
- **sons** de acerto, erro, início e fim
- **tela final** com resultado do aluno
- ranking local ou web compartilhado

## Arquivos do pacote

- `index.html` → jogo completo
- `ranking_web_apps_script.gs` → backend simples para ranking compartilhado
- `LICENSE` → licença MIT

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie os arquivos deste pacote para o repositório.
3. Vá em **Settings > Pages**.
4. Em **Build and deployment**, escolha:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` (ou `master`)
   - **Folder**: `/root`
5. Salve.
6. O GitHub vai gerar um link público para o `index.html`.

## Como ativar o ranking compartilhado na web

Por padrão, o jogo funciona com ranking local no navegador.

Para que **todos os alunos vejam o mesmo ranking**, use o Google Apps Script:

### Passo 1 — Criar a planilha
Crie uma planilha no Google Sheets para guardar os nomes e pontuações.

### Passo 2 — Criar o Apps Script
1. Abra a planilha.
2. Vá em **Extensões > Apps Script**.
3. Apague o conteúdo inicial.
4. Cole o código do arquivo `ranking_web_apps_script.gs`.
5. Ajuste, no script, o ID da planilha se necessário.

### Passo 3 — Publicar como Web App
1. Clique em **Deploy > New deployment**.
2. Escolha **Web app**.
3. Permissões:
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Publique e copie a URL final do Web App.

### Passo 4 — Colar a URL no jogo
No arquivo `index.html`, procure este bloco:

```js
const APP_CONFIG = {
  gameDurationSeconds: 140,
  webRankingUrl: ''
};
```

Cole a URL do Web App entre as aspas de `webRankingUrl`.

Exemplo:

```js
const APP_CONFIG = {
  gameDurationSeconds: 140,
  webRankingUrl: 'https://script.google.com/macros/s/SEU_WEB_APP/exec'
};
```

Depois, faça commit novamente no GitHub.

## Uso em aula

Sugestão de sequência didática:

1. **Explorar** as regiões principais do IR.
2. Pedir que os alunos toquem nas bandas e observem as vibrações.
3. Fazer interpretação guiada de 2 ou 3 moléculas.
4. Abrir o **modo jogo**.
5. Projetar ou compartilhar o link para o ranking da turma.
6. Usar a pontuação final como atividade de revisão.

## Personalizações rápidas

Você pode editar facilmente no `index.html`:
- moléculas
- bandas e textos explicativos
- tempo total
- número de rodadas
- pontuação
- medalhas
- mensagens finais

## Observação importante

Sem backend, o ranking fica salvo apenas no aparelho do aluno.

Para ranking compartilhado entre todos os celulares, é necessário usar o `ranking_web_apps_script.gs` ou outro backend equivalente.

## Licença

MIT.


## Atualização importante de cache no celular
Se o GitHub Pages ainda mostrar uma versão antiga no celular, faça uma recarga forçada do navegador ou limpe o cache do site. Esta versão remove a exibição da resposta na pergunta das fases 1 e 2.
