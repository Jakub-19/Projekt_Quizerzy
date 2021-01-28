<!DOCTYPE html>
<html>
	<head>
		<meta  charset="UTF-8" />  
		<title>Milionerzy</title>
		<link href='https://fonts.googleapis.com/css?family=Didact Gothic' rel='stylesheet'>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>		
	<style>
		html {
			height: 100%;
		}
		body {
			height: 100%;
			background-color: #21209c;
			margin: 0;
		}
		h1 {
			color: #fdb827;
			font-size: 7em;
			margin-bottom: 80px;
			text-shadow: 5px 5px 10px #23120b;
			font-family: 'Didact Gothic';
		}

		h3 {
			color: #fdb827;
			font-size: 4em;
			text-shadow: 5px 5px 10px #23120b;
			margin-bottom: 30px;
			font-family: 'Didact Gothic';
		}
		#playBtn {
			width: 5em;
			height: 2em;
			color: #23120b;
			background-color: #fdb827;
			font-size: 3em;
			margin-bottom: 80px;
			box-shadow: 5px 5px 10px #23120b;
			font-family: 'Didact Gothic';
		}
		#playBtn:hover, #playBtn:focus {
			transition: 0.8s;
			background-color:#23120b;
			color: #fdb827;
		}
		footer {
			color: #f1f1f1;
			text-shadow: 2px 2px 5px #23120b;
			font-family: 'Didact Gothic';
		}
		table {
			background-color: #f1f1f1;
			border-radius: 15px;
			font-size: 1.5em;
			font-family: 'Didact Gothic';
		}
		td {
			border-top: 1px solid black;
		}
		tr td:first-child {
			border-right: 1px solid black;
		}
		th:first-child {
			border-top-left-radius: 15px;
		}
		th + th{
			border-top-right-radius: 15px;
		}
	</style>
		</head>
	
	<body>
		<div class="container">
			<header>
				<h1 class="text-center">Quizerzy The Game</h1>
			</header>
			<main class="row">
			<div class="col-12 text-center">
				<a href="game.html" id="playBtn" class="btn text-center fw-bold align-content-center pt-1">Graj</a>
			</div>
		<div class="col-12 text-center">
		<h3>Ranking</h3>
		<div class="row">
				<div class="col col-12 justify-content-center text-center">
				<?php
				$path = "scripts/results.json";
				$file = fopen($path, "r");
				$data = fread($file, filesize($path));
				fclose($file);
				$data = json_decode($data);

				echo "<table style='width:80%; margin: auto;'><thead style='background-color: #fdb827;'><tr><th scope='col'>Imię</th><th scope='col'>Wygrana</th></tr></thead><tbody>";
				foreach($data as $value)
				{
					$prize = 0;
					switch ($value->result) {
						case 0:
							$prize = 0;
							break;
						case 1:
							$prize = 500;
							break;
						case 2:
							$prize = 1000;
							break;
						case 3:
							$prize = 2000;
							break;
						case 4:
							$prize = 5000;
							break;
						case 5:										
							$prize = 10000;
							break;
						case 6:
							$prize = 20000;
							break;
						case 7:
							$prize = 40000;
							break;
						case 8:
							$prize = 75000;
							break;													
						case 9:
							$prize = 125000;
							break;
						case 10:
							$prize = 250000;
							break;
						case 11:
							$prize = 500000;
							break;
						case 12:
							$prize = 1000000;
							break;
					}

					echo "<tr scope='row'>";
					echo "<td>".$value->nick."</td>";
					echo "<td>".$prize." zł</td>";
					echo "</tr>";
				}
				echo "</tbody></table>";
			?>

				</div>

			</div>
		</div>
			
			
			
		</main>
		<footer class="text-center align-bottom mt-5">
				By Jakub Wadas & Krzysztof Grzesica
		</footer>
		</div>
	
	</body>
</html>