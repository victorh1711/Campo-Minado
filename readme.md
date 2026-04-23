# Campo Minado (Minesweeper)

Um jogo de Campo Minado moderno desenvolvido com **JavaScript puro, HTML e CSS**, focado em lógica, interatividade e experiência visual refinada.

---

## Funcionalidades

*  Grid dinâmico (Easy, Normal, Hard)
*  Geração aleatória de bombas (com proteção no primeiro clique)
*  Sistema de bandeiras com `Ctrl + Click`
*  Contador de bombas ao redor (estilo clássico)
*  Timer em tempo real
*  Sistema de **melhor tempo (best score)** por dificuldade
*  Persistência com `localStorage`
*  Animações:
  * Plantar bandeira 
  * Explosão de bombas 

*  Feedback sonoro (flag, vitória, derrota)
*  UI moderna com efeitos de hover, sombra e glassmorphism

---

## Mecânicas

* O primeiro clique **nunca é uma bomba**
* Áreas vazias se expandem automaticamente
* Vitória ao revelar todos os campos seguros
* Derrota ao clicar em uma bomba
* Bandeiras limitadas ao número de bombas

---

## Sistema de Recordes

Cada dificuldade possui seu próprio recorde:

* Easy
* Normal
* Hard

Os tempos são salvos automaticamente no navegador.

---

## Controles

| Ação                     | Comando          |
| ------------------------ | ---------------- |
| Revelar campo            | Clique           |
| Colocar/remover bandeira | `Ctrl + Clique`  |
| Reiniciar jogo           | Botão de restart |
| Trocar dificuldade       | Select           |

---

## Tecnologias

* HTML5
* CSS3 (animações, grid, pseudo-elements)
* JavaScript (ES Modules)

---

## Estrutura do Projeto

```
📁 JS/
 ├── game.js        # lógica principal
 ├── field.js       # grid e bombas
 ├── timer.js       # controle de tempo
 ├── audio.js       # sistema de áudio
📁 icons/
📁 audio/
index.css
index.html
```

---

## Como rodar

1. Clone o repositório e acesse a pasta:
   ```bash
   git clone https://github.com/seu-usuario/seu-repo.git
   cd seu-repo
   ```

2. Execute com um servidor local (ex: VSCode Live Server ou npx):
   ```bash
   npx serve .
   ```

---

## Melhorias futuras

* Ranking local (top 3 tempos)
* Efeitos de partículas
* Responsividade mobile
* Modo “infinito”
* Deploy online

---

## Preview

*(adicione aqui um print do jogo depois)*

---

## Licença

Este projeto é de uso livre para fins de estudo e aprendizado.

---

## Autor

Victorh1711