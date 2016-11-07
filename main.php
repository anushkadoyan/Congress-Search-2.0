<?php /*
 Marco Papa 5 days ago Notice that you can "prefetch" everything at the browser opening the initial page. With Ajax, you can load the first page tab and at the same time trigger the data for the other tabs. After initial load of the first page, there will be ZERO delay between tabs. Only when you look for "details" you will have another API call and a slight delay. Once that is done, going back and forth between list and details should also take ZERO time, if you stay on the same representative. 



http://congress.api.sunlightfoundation.com/legislators?per_page=all&apikey=9d713eee2bda4febb053035ef76e5f4c

*/



// include('congress.html');


/* get all legislators without pagination */
$legislators = request("http://congress.api.sunlightfoundation.com/legislators?per_page=all&apikey=9d713eee2bda4febb053035ef76e5f4c");
$committees = request("http://congress.api.sunlightfoundation.com/committees?per_page=all&apikey=9d713eee2bda4febb053035ef76e5f4c");
$billsOld = request("http://congress.api.sunlightfoundation.com/bills?per_page=50&history.active=true&apikey=9d713eee2bda4febb053035ef76e5f4c");
$billsNew = request("http://congress.api.sunlightfoundation.com/bills?per_page=50&history.active=false&apikey=9d713eee2bda4febb053035ef76e5f4c");

echo json_encode($legislators);

function request($url) {
	$response = "";
	$jsonobj="";
	
	$response = @file_get_contents($url);
	$jsonobj=json_decode($response,true);
	
	return $jsonobj;
}
?>
