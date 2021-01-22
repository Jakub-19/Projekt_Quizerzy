<!DOCTYPE html>
<html>
	<head>
		<meta  charset="UTF-8" />  
		<title>Milionerzy</title>		
	</head>
	
	<body>
	<header>
		<h1>Milionerzy</h1>
	</header>
		<main>
			<a href="game.html">Graj</a>
			<h3>Ranking:</h3>
			<?php
				$path = "scripts/results.json";
				$file = fopen($path, "r");
				$data = fread($file, filesize($path));
				fclose($file);
				$data = json_decode($data);

				echo "<table><tr><th>Imię</th><th>Wygrana</th></tr>";
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

					echo "<tr>";
					echo "<td>".$value->nick."</td>";
					echo "<td>".$prize." zł</td>";
					echo "</tr>";
				}
				echo "</table>";
			?>
		</main>
		<footer>

		</footer>
	</body>
</html>