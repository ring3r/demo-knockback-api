<?php

	$db = new PDO("mysql:host=localhost;dbname=demo_knockback", "root", "");
	$data = json_decode(file_get_contents('php://input'));

	if ($_SERVER['REQUEST_METHOD'] == "GET"){
		$statement = $db->query('SELECT * FROM persons');
		$statement->setFetchMode(PDO::FETCH_ASSOC);
		echo json_encode($statement->fetchAll());
	}

	if ($_SERVER['REQUEST_METHOD'] == "POST"){
		$sql = "INSERT INTO persons (id,name,email,phone,address,active) values (:id,:name,:email,:phone,:address,:active)";
		$query = $db->prepare($sql);
		$query->execute(array(":name"=>$data->name,":email"=>$data->email,":phone"=>$data->phone,":address"=>$data->address,":active"=>$data->active));
		$result['id'] = $db->lastInsertId();
		echo json_encode($result);
	}

	if ($_SERVER['REQUEST_METHOD'] == "PUT"){
		$sql = "UPDATE persons SET active = :active WHERE id = :id";
		$query = $db->prepare($sql);
		$query->execute(array(":active"=>$data->active, ":id"=>$data->id));
	}
	
	if ($_SERVER['REQUEST_METHOD'] == "DELETE"){
		$sql = "DELETE FROM persons WHERE id = :id";
		$query = $db->prepare($sql);
		$query->execute(array(":id"=>$_GET['id']));
	}

?>