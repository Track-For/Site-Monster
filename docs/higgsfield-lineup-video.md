# Vídeo da seção “Um impacto. Cinco formas.”

O filme começa com a **Monster Energy Original Green**, a lata preta com o símbolo verde, e termina mostrando os **cinco sabores do site juntos**. Ele ocupa um momento próprio entre o título “UM IMPACTO. CINCO FORMAS.” e o elenco de cinco latas. Use as cópias de 500 × 1250 px em `docs/higgsfield-references/` como referências visuais das embalagens. A seção mantém o layout atual caso o arquivo de vídeo ainda não exista.

## Como conectar ao visual do site

O vídeo deve parecer a continuação do impacto da abertura: fundo preto grafite `#050705`, verde elétrico `#a4dc24`, linha de luz no piso, grade em perspectiva quase invisível e uma onda circular de energia. A onda revela as outras quatro latas e termina na mesma formação do elenco abaixo: **Original Green, Ultra White, Mango Loco, Pipeline Punch e Ultra Watermelon**, da esquerda para a direita, todas do mesmo tamanho e apoiadas na mesma linha de piso. O título e as legendas já existem em HTML, então o vídeo não precisa de texto adicional.

## Formato

- Duração: **15 segundos**, em um plano contínuo, sem cortes.
- Quadro: **16:9 horizontal**, idealmente 1920 × 1080. Mantenha as cinco latas do quadro final dentro da área central, com margem nas laterais para o recorte no celular.
- Exportação: MP4, de preferência H.264, 24 fps, sem áudio.
- Ação: um movimento contínuo e lento de câmera, adequado para avançar e voltar conforme o scroll. As cinco latas precisam permanecer fiéis às imagens de referência, com forma, cores e logotipos estáveis.

Referências na ordem do quadro final: [original.png](higgsfield-references/original.png), [white.png](higgsfield-references/white.png), [mango.png](higgsfield-references/mango.png), [pipeline.png](higgsfield-references/pipeline.png), [watermelon.png](higgsfield-references/watermelon.png).

## Referências no Higgsfield

Para este prompt, envie os cinco PNGs de **`docs/higgsfield-references/`** como **referências de produto**, cada um com seu nome de sabor. Todas as cópias medem **500 × 1250 px**, acima do mínimo de 300 px informado pelo Higgsfield. Os arquivos de 250 × 625 px usados pelo site permanecem em `public/media/cans/`; a ampliação das cópias preserva a arte, mas não cria detalhes que não existiam no original.

Indique no início do prompt que `original.png` é a lata presente desde o primeiro segundo e que `white.png`, `mango.png`, `pipeline.png` e `watermelon.png` aparecem na revelação final, nessa ordem. Assim o gerador recebe tanto a identidade de cada embalagem quanto a função dela na cena.

O [Seedance 2.0 no Higgsfield](https://higgsfield.ai/seedance/2.0) aceita até nove imagens em uma geração e produz clipes de até 15 segundos, então comporta as cinco referências. Confira o quadro final antes de usar o vídeo: as cinco latas devem estar inteiras, com rótulos corretos, mesma altura e ordem do site.

## Direção por tempo

| Tempo | Cena |
| --- | --- |
| 0–3 s | A lata Original já está inteira em cena, quase em silhueta. Uma linha verde acende no piso como continuação do impacto da abertura. |
| 3–7 s | Uma luz verde estreita percorre a lata e revela o logotipo, o metal preto e a condensação. A câmera recua lentamente para abrir espaço no enquadramento. |
| 7–11 s | Uma única onda circular se expande pelo piso. A grade em perspectiva aparece de forma discreta. As outras quatro latas começam a surgir da escuridão, sem transformar a Original. |
| 11–15 s | As cinco latas ficam inteiras, igualmente grandes e alinhadas: Original Green, Ultra White, Mango Loco, Pipeline Punch e Ultra Watermelon. Luzes discretas nas cores dos sabores se acendem atrás delas. O conjunto permanece estável nos últimos dois segundos para conectar ao elenco logo abaixo. |

## Prompt para Higgsfield

```text
Use the five uploaded can images as exact product references. The final lineup must show these real Monster Energy flavors, from left to right: Original Green (black can, green claw M), Ultra White (white can), Mango Loco (blue illustrated can), Pipeline Punch (pink illustrated can), and Ultra Watermelon (red can). Preserve each can's actual shape, label artwork, colors and readable logo; make all five the same physical size. Create a 15-second cinematic product film in one continuous shot that visually continues a dark website hero where the Original Green can has just landed with an impact. The environment is an abstract black-graphite stage near #050705, with a thin electric-green #a4dc24 line across a subtly reflective floor and a very faint perspective grid fading into darkness. Begin with only the upright Original Green can illuminated, its front facing camera. A narrow green light travels across its black metal and condensation as the camera slowly pulls back. One restrained circular shockwave spreads from its base across the floor. As the wave reaches five positions, reveal the other four cans from the darkness with controlled individual backlights: cool white, cyan, pink and red. The Original can remains the same can throughout; it does not morph into another flavor. By second 12, all five cans are fully visible, evenly spaced, upright, front facing, equal in height, and resting on the same floor line. Hold this exact five-can composition steady for the final three seconds so it leads naturally into the website's five-can lineup. Deep blacks, precise product lighting, restrained green energy, subtle reflections and film grain. Keep every can inside the central safe area of a horizontal 16:9 frame. 15 seconds, 24 fps, no audio. No cuts, no added text, no extra cans, no invented flavors or packaging, no changing labels, no warped logos, no explosions, no lightning storm, no camera shake, no rapid flashes.
```

## Usar no site

Salve a exportação como `public/media/lineup-impact.mp4` e reinicie o servidor de desenvolvimento ou gere um novo build. A página detecta esse arquivo e sincroniza três frases com o scroll: a origem, a multiplicação da energia e a revelação dos cinco sabores. O filme permanece fixo no quadro enquanto o GSAP ScrollTrigger percorre os 15 segundos; ao rolar para cima, vídeo e frases também voltam. No final, o elenco estático sobe sobre o quadro das cinco latas, cobrindo o filme. Com movimento reduzido ativado no sistema, aparece a imagem estática da lata Original.

O arquivo enviado foi preparado para a web em H.264, 1920 × 1080, 24 fps e sem áudio no caminho acima. A exportação original em HEVC está preservada em `docs/video-source/lineup-impact-higgsfield-hevc.mp4`.

Para deixar a busca de quadros mais fluida, uma versão H.264 com keyframes frequentes pode ser gerada com FFmpeg:

```bash
ffmpeg -i higgsfield-export.mp4 -an -vf "fps=24,scale=1920:-2" -c:v libx264 -crf 21 -preset medium -g 6 -keyint_min 6 -sc_threshold 0 -movflags +faststart public/media/lineup-impact.mp4
```
