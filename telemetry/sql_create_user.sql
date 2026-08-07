-- 1. Cria o usuário com uma senha forte
-- Substitua 'iot_user' pelo nome desejado e 'Senha_Forte_IoT_2026' por uma senha segura
CREATE USER 'iot_user'@'%' IDENTIFIED BY 'Senha_Forte_IoT_2026';

-- 2. Concede apenas as permissões de manipulação de dados no banco específico
GRANT SELECT, INSERT, UPDATE, DELETE ON iot_monitoring.* TO 'iot_user'@'%';

-- 3. Aplica as alterações de privilégios imediatamente
FLUSH PRIVILEGES;