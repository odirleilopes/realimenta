<?php
class Entidade {
    public static function create($data) {
        $conn = Database::getConnection();
		
		$query = "INSERT INTO entidades (razaoSocial, nomeFantasia, endereco, bairro, cidade, estado, cep, telefone, emailContato, cnpj, responsavel, telefoneResponsavel, emailLogin, senhaLogin, dataCriacao)
                  VALUES (:razaoSocial, :nomeFantasia, :endereco, :bairro, :cidade, :estado, :cep, :telefone, :emailContato, :cnpj, :responsavel, :telefoneResponsavel, :emailLogin, :senhaLogin, NOW())";

        $stmt = $conn->prepare($query);
        $stmt->bindParam(':razaoSocial', $dados['razaoSocial']);
        $stmt->bindParam(':nomeFantasia', $dados['nomeFantasia']);
        $stmt->bindParam(':endereco', $dados['endereco']);
        $stmt->bindParam(':bairro', $dados['bairro']);
        $stmt->bindParam(':cidade', $dados['cidade']);
        $stmt->bindParam(':estado', $dados['estado']);
        $stmt->bindParam(':cep', $dados['cep']);
        $stmt->bindParam(':telefone', $dados['telefone']);
        $stmt->bindParam(':emailContato', $dados['emailContato']);
        $stmt->bindParam(':cnpj', $dados['cnpj']);
        $stmt->bindParam(':responsavel', $dados['responsavel']);
        $stmt->bindParam(':telefoneResponsavel', $dados['telefoneResponsavel']);
        $stmt->bindParam(':emailLogin', $dados['emailLogin']);
        $stmt->bindParam(':senhaLogin', password_hash($dados['senhaLogin'], PASSWORD_DEFAULT));		
		
        $stmt->execute();
        return ['id' => $conn->lastInsertId(), 'razaoSocial' => $data['razaoSocial']];
    }

    public static function getAll() {
        $conn = Database::getConnection();
        $stmt = $conn->prepare("SELECT * FROM entidades");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function getById($id) {
        $conn = Database::getConnection();
        $stmt = $conn->prepare("SELECT * FROM entidades WHERE id = :id");
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function update($id, $data) {
        $conn = Database::getConnection();
        //$stmt = $conn->prepare("UPDATE entidades SET razaoSocial = :razaoSocial, nomeFantasia = :nomeFantasia WHERE id = :id");
		
		$query = "UPDATE entidades SET 
                    razaoSocial = :razaoSocial, 
                    nomeFantasia = :nomeFantasia, 
                    endereco = :endereco, 
                    bairro = :bairro, 
                    cidade = :cidade, 
                    estado = :estado, 
                    cep = :cep, 
                    telefone = :telefone, 
                    emailContato = :emailContato, 
                    cnpj = :cnpj, 
                    responsavel = :responsavel, 
                    telefoneResponsavel = :telefoneResponsavel, 
                    emailLogin = :emailLogin, 
                    senhaLogin = :senhaLogin 
                  WHERE idEntidade = :idEntidade";
        
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':idEntidade', $dados['idEntidade']);
        $stmt->bindParam(':razaoSocial', $dados['razaoSocial']);
        $stmt->bindParam(':nomeFantasia', $dados['nomeFantasia']);
        $stmt->bindParam(':endereco', $dados['endereco']);
        $stmt->bindParam(':bairro', $dados['bairro']);
        $stmt->bindParam(':cidade', $dados['cidade']);
        $stmt->bindParam(':estado', $dados['estado']);
        $stmt->bindParam(':cep', $dados['cep']);
        $stmt->bindParam(':telefone', $dados['telefone']);
        $stmt->bindParam(':emailContato', $dados['emailContato']);
        $stmt->bindParam(':cnpj', $dados['cnpj']);
        $stmt->bindParam(':responsavel', $dados['responsavel']);
        $stmt->bindParam(':telefoneResponsavel', $dados['telefoneResponsavel']);
        $stmt->bindParam(':emailLogin', $dados['emailLogin']);
        $stmt->bindParam(':senhaLogin', password_hash($dados['senhaLogin'], PASSWORD_DEFAULT));		
	
        $stmt->execute();
        return $data;
    }

    public static function delete($id) {
        $conn = Database::getConnection();
		$query = "DELETE FROM entidades WHERE idEntidade = :idEntidade";
        $stmt = $conn->prepare($query);
		
        $stmt->bindParam(':idEntidade', $id);
        $stmt->execute();
    }
}
