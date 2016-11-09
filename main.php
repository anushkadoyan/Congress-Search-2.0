<?php /*
 Marco Papa 5 days ago Notice that you can "prefetch" everything at the browser opening the initial page. With Ajax, you can load the first page tab and at the same time trigger the data for the other tabs. After initial load of the first page, there will be ZERO delay between tabs. Only when you look for "details" you will have another API call and a slight delay. Once that is done, going back and forth between list and details should also take ZERO time, if you stay on the same representative. 



http://congress.api.sunlightfoundation.com/legislators?per_page=all&apikey=9d713eee2bda4febb053035ef76e5f4c

*/



// include('congress.html');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
/* get all legislators without pagination */
$legislators = request("http://congress.api.sunlightfoundation.com/legislators?per_page=all&fields=party,first_name,last_name,chamber,district,state&apikey=9d713eee2bda4febb053035ef76e5f4c");
$committees = request("http://congress.api.sunlightfoundation.com/committees?per_page=all&fields=chamber,committee_id,name,parent_committee_id,phone&apikey=9d713eee2bda4febb053035ef76e5f4c");
//&fields=bill_id,bill_type,chamber,introduced_on,official_title,sponsor
$billsOld = request("http://congress.api.sunlightfoundation.com/bills?per_page=50&history.active=true&fields=bill_id,bill_type,chamber,introduced_on,official_title,sponsor&apikey=9d713eee2bda4febb053035ef76e5f4c");
$billsNew = request("http://congress.api.sunlightfoundation.com/bills?per_page=50&history.active=false&fields=bill_id,bill_type,chamber,introduced_on,official_title,sponsor&apikey=9d713eee2bda4febb053035ef76e5f4c");
$content = array($legislators,$committees,$billsOld,$billsNew);
echo (json_encode($content));


function request($url) {
	$response = "";
	$jsonobj="";
	
	$response = @file_get_contents($url);
	$jsonobj=json_decode($response,true);
	
	return $jsonobj;
}
?>
