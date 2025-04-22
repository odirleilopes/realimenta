<?php
class EntidadeController {
    public static function listAll() {
        $entidades = Entidade::getAll();
        return json_encode($entidades);
    }

    public static function create($data) {
        $entidade = Entidade::create($data);
        return json_encode(['message' => 'Entidade criada com sucesso', 'entidade' => $entidade]);
    }

    public static function getById($id) {
        $entidade = Entidade::getById($id);
        return $entidade ? json_encode($entidade) : json_encode(['error' => 'Entidade não encontrada']);
    }

    public static function update($id, $data) {
        $entidade = Entidade::update($id, $data);
        return json_encode(['message' => 'Entidade atualizada com sucesso', 'entidade' => $entidade]);
    }

    public static function delete($id) {
        Entidade::delete($id);
        return json_encode(['message' => 'Entidade deletada']);
    }
}
