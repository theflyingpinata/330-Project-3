<?php
	// 1) ID
	$URL_ID = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/";

	$summoner = "theflyingpinata";
	if(array_key_exists('summoner', $_GET)){
		$summoner = $_GET['summoner'];
	}

	$apiKey = "RGAPI-0aba2c2c-ebb5-4ea1-a265-6ab0824fa7e4";
	if(array_key_exists('apiKey', $_GET)){
		$apiKey = $_GET['apiKey'];
	}

	$beginTime = 1605225600;
	if(array_key_exists('beginTime', $_GET)){
		$beginTime = $_GET['beginTime'];
	}

	$endIndex = 2;
	if(array_key_exists('endIndex', $_GET)){
		$endIndex = $_GET['endIndex'];
	}

	$URL_ID = $URL_ID . $summoner . "?api_key=" . $apiKey;

	// 5) The `stream_context_create()` function is where we can specify the POST method
	// https://www.php.net/manual/en/context.http.php

	// Example for ID
	// https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/theflyingpinata?apiKey=RGAPI-0aba2c2c-ebb5-4ea1-a265-6ab0824fa7e4

	$opts = array('http' =>
			array(
					'method'  => 'GET',
					'header'  => 'Content-Type: application/json'
			)
	);
	$context = stream_context_create($opts);


	// 6) Call the web service
	$result_Id = file_get_contents($URL_ID, false, $context);

	$obj_ID = json_decode($result_Id);

	$accountId = $obj_ID->accountId;

	// 2) Match History
	// Example for Match History
	// https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/ihBG1EIlGbon_KNR8HJ0J6lQM03qPILNpcJWK3_wlV5pSVc?beginTime=1605225600000&endIndex=5
	$URL_History = 'https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/';

	$URL_History = $URL_History . $accountId . '?beginTime=' . $beginTime . '&endIndex=' . $endIndex . '&api_key=' . $apiKey;

	$result_History = file_get_contents($URL_History, false, $context);

	$obj_match_IDs = json_decode($result_History);

	$endIndex = $obj_match_IDs->endIndex;
	// loop through all the matches, and put their ids in an array
	for($i = 0; $i < $endIndex; $i++){

		$matches_IDs[$i] = $obj_match_IDs->matches[$i]->gameId;
	}
	// 3) Individual matches
	// Example for an individual match
	// https://na1.api.riotgames.com/lol/match/v4/matches/3665816766?api_key=RGAPI-0aba2c2c-ebb5-4ea1-a265-6ab0824fa7e4
	$URL_Match = 'https://na1.api.riotgames.com/lol/match/v4/matches/';

	for($i = 0; $i < $endIndex; $i++){
		$URL_Match_Temp = $URL_Match . $matches_IDs[$i] . '?api_key=' . $apiKey;
		$result_match = file_get_contents($URL_Match_Temp, false, $context);
		$result_match = json_decode($result_match);
		$matches[$i] = $result_match;
	}

	$jsonToSend = json_encode($matches); 
	// 4) Echo results 
	header('content-type:application/json'); // tell the requestor that this is JSON
	header("Access-Control-Allow-Origin: *"); // turn on CORS for that shout-client.html can use this service
	echo $jsonToSend;
?>