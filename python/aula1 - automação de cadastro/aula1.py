# bibliotecas
import pyautogui
import time

# definições e variáveis
pyautogui.PAUSE = 0.3
link = "https://dlp.hashtagtreinamentos.com/python/intensivao/login"
login = "pythonimpressionador@gmail.com"
senha = "Sua Senha"
arquivo = "python/aula1/produtos.csv"

# PASSO 1 : ABRIR O NAVEGADOR
# abrir o chrome
pyautogui.press("win")
pyautogui.write("chrome")
pyautogui.press("enter")
time.sleep(2)
# entrar no link 
pyautogui.write(link)
pyautogui.press("enter")
time.sleep(1)

# PASSO 2: FAZER LOGIN
# selecionar o campo de email
pyautogui.click(x=852, y=378)
# escrever o seu email
pyautogui.write(login)
pyautogui.press("tab") # passando pro próximo campo
pyautogui.write(senha)
pyautogui.click(x=971, y=531) # clique no botao de login
time.sleep(1)

# PASSO 3: IMPORTAR A BASE DE PRODUTOS
import pandas as pd
tabela = pd.read_csv(arquivo)
print(tabela)

# PASSO 4: CADASTRAR OS PRODUTOS
for linha in tabela.index:
    pyautogui.click(x=819, y=262)
    # pegar da tabela o valor do campo que a gente quer preencher
    codigo = tabela.loc[linha, "codigo"]
    # preencher o campo
    pyautogui.write(str(codigo))
    # passar para o proximo campo
    pyautogui.press("tab")
    # preencher o campo
    pyautogui.write(str(tabela.loc[linha, "marca"]))
    pyautogui.press("tab")
    pyautogui.write(str(tabela.loc[linha, "tipo"]))
    pyautogui.press("tab")
    pyautogui.write(str(tabela.loc[linha, "categoria"]))
    pyautogui.press("tab")
    pyautogui.write(str(tabela.loc[linha, "preco_unitario"]))
    pyautogui.press("tab")
    pyautogui.write(str(tabela.loc[linha, "custo"]))
    pyautogui.press("tab")
    obs = tabela.loc[linha, "obs"]
    if not pd.isna(obs):
        pyautogui.write(str(tabela.loc[linha, "obs"]))
    pyautogui.press("tab")
    pyautogui.press("enter") # cadastra o produto (botao enviar)
    # dar scroll de tudo pra cima
    pyautogui.scroll(1000)

