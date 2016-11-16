var myApp = angular.module("myModule",  ['angularUtils.directives.dirPagination']);


states = {     "AL": "Alabama",     "AK": "Alaska",     "AS": "American Samoa",     "AZ": "Arizona",     "AR": "Arkansas",     "CA": "California",     "CO": "Colorado",     "CT": "Connecticut",     "DE": "Delaware",     "DC": "District Of Columbia",    "FL": "Florida",     "GA": "Georgia",     "GU": "Guam",     "HI": "Hawaii",     "ID": "Idaho",     "IL": "Illinois",     "IN": "Indiana",     "IA": "Iowa",     "KS": "Kansas",     "KY": "Kentucky",     "LA": "Louisiana",     "ME": "Maine",     "MH": "Marshall Islands",     "MD": "Maryland",     "MA": "Massachusetts",     "MI": "Michigan",     "MN": "Minnesota",     "MS": "Mississippi",     "MO": "Missouri",     "MT": "Montana",     "NE": "Nebraska",     "NV": "Nevada",     "NH": "New Hampshire",     "NJ": "New Jersey",     "NM": "New Mexico",     "NY": "New York",     "NC": "North Carolina",     "ND": "North Dakota",     "MP": "Northern Mariana Islands",     "OH": "Ohio",     "OK": "Oklahoma",     "OR": "Oregon",     "PW": "Palau",     "PA": "Pennsylvania",     "PR": "Puerto Rico",     "RI": "Rhode Island",     "SC": "South Carolina",     "SD": "South Dakota",     "TN": "Tennessee",     "TX": "Texas",     "UT": "Utah",     "VT": "Vermont",     "VI": "Virgin Islands",     "VA": "Virginia",     "WA": "Washington",     "WV": "West Virginia",     "WI": "Wisconsin",     "WY": "Wyoming" }

myApp.controller("myController",function($scope, $filter) {
	
		$.ajax({
        url: '../main.php',
        type: 'GET',
//         dataType: "json",
        data:  {action: "content"},
        success: function(data) {
	        data = JSON.parse(data);
	        					console.log(data);

// 	        data = JSON.stringify(data);
// 			data = read_from_local_file('leg.json');
			legislators = data[0]["results"];	
			billsOld = data[2]["results"];
			billsNew= data[3]["results"];
			committees = data[1]["results"];
			$scope.people =[];	
			$scope.billsNew =[];	
			$scope.billsOld =[];	
			$scope.committees =[];	
			$scope.favorites = [];
			//get legislators
			$(legislators).each( function(index, obj){
				if(obj.district==null) {
					obj.district="N.A";
				} else {
					obj.district="District "+obj.district;
				}
				var state=obj.state;
				var partyImage="http://cs-server.usc.edu:45678/hw/hw8/images/r.png";
				var chamberImageForLegislators = "http://cs-server.usc.edu:45678/hw/hw8/images/h.png";
				if(obj.party=="D") {
					partyImage="http://cs-server.usc.edu:45678/hw/hw8/images/d.png";
				}
				if(obj.chamber.charAt(0).toUpperCase() + obj.chamber.slice(1) == "Senate") {
					chamberImageForLegislators = "http://cs-server.usc.edu:45678/hw/hw8/images/s.svg";
				}
				$scope.$apply(function() {
					$scope.people.push({
						"id":obj.bioguide_id,
						"party": obj.party,
						"firstName": obj.first_name,
						"lastName": obj.last_name,
						"chamber": obj.chamber.charAt(0).toUpperCase() + obj.chamber.slice(1),
						"district": obj.district,
						"state": states[state],
						"partyImage":partyImage,
						"chamberImage":chamberImageForLegislators
					});
				
				}); 
			});
			//new bills
			
			// fields=bill_id,bill_type,chamber,introduced_on,official_title,sponsor
			
			$(billsNew).each( function(index, obj){
				if(obj.district==null) {
					obj.district="N.A";
				} else {
					obj.district="District "+obj.district;
				}
				var state=obj.state;
				var chamberImageForBills = "http://cs-server.usc.edu:45678/hw/hw8/images/h.png";
				if(obj.party=="D") {
					partyImage="http://cs-server.usc.edu:45678/hw/hw8/images/d.png";
				}
				if(obj.chamber.charAt(0).toUpperCase() + obj.chamber.slice(1) == "Senate") {
					chamberImageForBills = "http://cs-server.usc.edu:45678/hw/hw8/images/s.svg";
				}
				$scope.$apply(function() {
					$scope.billsNew.push({
						"id": obj.bill_id,
						"type": obj.bill_type,
						"title": obj.official_title,
						"chamber": obj.chamber.charAt(0).toUpperCase() + obj.chamber.slice(1),
						"introduced": obj.introduced_on,
						"sponsor": obj.sponsor,
						"chamberImage":chamberImageForBills,
						"version":obj.last_version,
						"active":obj.history.active,
						"congressURL":obj.urls.congress
					});
				
				}); 
			});
			//old bills
			$(billsOld).each( function(index, obj){
				if(obj.district==null) {
					obj.district="N.A";
				} else {
					obj.district="District "+obj.district;
				}
				var state=obj.state;
				var chamberImageForBills = "http://cs-server.usc.edu:45678/hw/hw8/images/h.png";
				if(obj.party=="D") {
					partyImage="http://cs-server.usc.edu:45678/hw/hw8/images/d.png";
				}
				if(obj.chamber.charAt(0).toUpperCase() + obj.chamber.slice(1) == "Senate") {
					chamberImageForBills = "http://cs-server.usc.edu:45678/hw/hw8/images/s.svg";
				}
				$scope.$apply(function() {
					$scope.billsOld.push({
						"id": obj.bill_id,
						"type": obj.bill_type,
						"title": obj.official_title,
						"chamber": obj.chamber.charAt(0).toUpperCase() + obj.chamber.slice(1),
						"introduced": obj.introduced_on,
						"sponsor": obj.sponsor,
						"chamberImage":chamberImageForBills,
						"version":obj.last_version,
						"active":obj.history.active,
						"congressURL":obj.urls.congress
					});
				
				}); 
			});	
			$(committees).each( function(index, obj){
				if(obj.office==null) {
					obj.office="N.A";
				}
				if(obj.phone==null) {
					obj.phone="N.A";
				}
				if(obj.parent_committee_id==null) {
					obj.parent_committee_id="N.A";
				}
				if(obj.name==null) {
					obj.name="N.A";
				}
				var chamberImageForCommittees = "http://cs-server.usc.edu:45678/hw/hw8/images/s.svg";
				
				if(obj.chamber.charAt(0).toUpperCase() + obj.chamber.slice(1) == "House") {
					chamberImageForCommittees = "http://cs-server.usc.edu:45678/hw/hw8/images/h.png";
				}
				$scope.$apply(function() {
					$scope.committees.push({
						"name": obj.name,
						"parent": obj.parent_committee_id,
						"id": obj.committee_id,
						"chamber": obj.chamber.charAt(0).toUpperCase() + obj.chamber.slice(1),
						"contact": obj.phone,
						"office": obj.office,

						"chamberImage":chamberImageForCommittees
					});
				}); 
			});			  
			  
			  
			  
        },
        error: function(xhr, status, error){
	        console.log(error);

        }
    });
    $scope.stateSelects = ['All States','Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
	$scope.orderByState="state";
	$scope.orderByLastName="lastName";
	$scope.R="r.jpg";
	$scope.D="d.jpg";
	$scope.pageSize = 5;
	$scope.currentPage = 1;
	$scope.customFilter = 'state';
	$scope.customOrder = '';
	//stack button
	$(document).on("ready", function (e) {
		$('#myTabs [role="presentation"]:first a').click();
		
	});
	$(function() {
		$('.favButton').on("click", function(e) {
			console.log("ASDF");
		});
		$('#left-side a:first').click();
		});
		 $(window).on("load", function() {

		$('.detailsButton').on("click", function(e) {
			console.log('asdf');
				e.preventDefault();
			});
			
			// STAR CLICKED
			window.favClicked = function (button) {
				console.log(button);
				if($(button).find('i').attr('class') =="fa fa-star-o") {
					$(button).find('i').removeClass();
					$(button).find('i').addClass('fa fa-star');
					$(button).find('i').css('color','yellow');
				} else if ($(button).find('i').attr('class') =="fa fa-star"){
					$(button).find('i').removeClass();
					$(button).find('i').addClass('fa fa-star-o');
					$(button).find('i').css('color','black');
				}
				$(this).addClass('fa-star');
			}
	});
	$('#tabButton').click(function(e) {
		e.preventDefault();
		if($('#left-side').css('display')=="table-cell") {
			$('#left-side').css("display","none");
		}			
		else {
			$('#left-side').css("display","table-cell");
		}
	});
/*
	myApp.directive('button', function(){
        return {
           restrict:'A',
           link:function(scope, elem, attrs){
	           
               // here elem is div with attribute 'data-button' so:
               console.loge(elem.button());
               // angular.element(elem).button(); // with jqLite
               // $(elem).button();
           }
        };
   });
*/

	//bills view detail button clicked
	$scope.billsButtonClicked = function(obj) {
		$scope.billDetail = {};
		$scope.billDetail = obj;
		if($scope.billDetail.active==true) {
			$scope.billDetail.active = "Active";
		}
		else {
			$scope.billDetail.active = "New";
		}
		console.log($scope.billDetail);
		
	}
	$('.favButton').on("click", function(e) {
		e.preventDefault();
		console.log('click');
		
	});
	//legislators view detail button clicked

	$scope.buttonClicked = function(obj){
		if(obj.target.attributes[3] && obj.target.attributes[3].value.length) {
			var targetId = obj.target.attributes[3].value;
		}
			var targetIdHash = '#'+targetId;
		var elementExists = document.getElementById(targetId);
		if(elementExists) {
			var index = $('#legislator-carousel .carousel-inner #'+targetId).index();
					$('#legislator-carousel').carousel(index);		


		} else {
			$.ajax({
				url: '../main.php',
			    type: 'GET',
				data: {action: "leg", id: targetId},
				success: function(data) {
					data = JSON.parse(data);
					console.log(data);
					person = data[0].results[0];
					personBills={};
					personBills = data[1].results;
					personComms = data[2].results;
					console.log(person);
/*
					$scope.$apply(function() {
						$scope.person = {};
						$scope.person.push({
							"name": person.name,
							"parent": person.parent_committee_id,
							"id": person.committee_id,
							"chamber": obj.chamber.charAt(0).toUpperCase() + obj.chamber.slice(1),
							"contact": obj.phone,
							"office": obj.office,
	
							"chamberImage":chamberImageForCommittees
						});
					});
*/		
						
	
	
					if(person.party=="D") {
						personPartyImage="http://cs-server.usc.edu:45678/hw/hw8/images/d.png";
						personPartyWord = "Democrat";
					}else {
						personPartyImage="http://cs-server.usc.edu:45678/hw/hw8/images/r.png";
						personPartyWord = "Republican";
					}
					
					//  Append a slide to the carousel div
		// 			var a = $('<div class="item" data-id="1" id="'+targetId+'"><a href="#legislator-carousel"  data-slide-to="0"><button class="btn btn-default"><span class="glyphicon glyphicon-chevron-left"></span></button></a></div>') 
					var content= '<div class="item" data-id="1" id="'+targetId+'">' 
					+ 	  	'<a href="#legislator-carousel"  data-slide-to="0">' 
					+			'<button  class="btn btn-default" style="margin:10px">'
					+				'<span class="glyphicon glyphicon-chevron-left">' 
					+				'</span>' 
					+			'</button>' 
					+		'</a>' +		'<h2 class="h2">Details</h2>'
					+	'<button onclick="favClicked(this)" ng-click="favButtonClicked()" class="favButton btn btn-default" style="margin:10px; float:right">'
					+				'<i class="fa fa-star-o" aria-hidden="true"></i>'
					+			'</button>' 
					+	'<table class="table details-table">' 
					+		'<tbody>' 
					+			'<tr>' 		
					+				' <td class="details-left-column"><hr>' 		
					+					'<table>' 		
					+						'<tr>' 		
					+							'<td rowspan="6" class="detail-left-column-image-td">' 		
					+								'<img class="details-person-image" src="https://theunitedstates.io/images/congress/original/'+targetId+'.jpg"/>' 		
					+							'</td>' 		
					+						'</tr>' 		
					+						'<tr>' 		
					+							'<td colspan="2"><hr>' 		
					+								person.title + '. ' + person.last_name + ', ' + person.first_name	
					+							'</td>' 		
					+						'</tr>' 		
					+						'<tr>' 		
					+							'<td colspan="2"><hr>'		
					+								'<a href="mailto:'+person.oc_email+'">'+person.oc_email+'</a>'	
					+							'</td>' 		
					+						'</tr>' 	
					+						'<tr>' 		
					+							'<td colspan="2"><hr>' 		
					+								'Chamber: ' + person.chamber.charAt(0).toUpperCase() + person.chamber.slice(1)
					+							'</td>' 		
					+						'</tr>' 
					+						'<tr>' 		
					+							'<td colspan="2"><hr>' 		
					+								'Contact: <a href="tel:'+person.phone+'">'+person.phone+'</a>'		
					+							'</td>' 		
					+						'</tr>' 
					+						'<tr>' 		
					+							'<td colspan="2"><hr>' 		
					+								'<img class="details-party-image" src="'+personPartyImage+'"/>'+personPartyWord 		
					+							'</td>' 		
					+						'</tr>' 
					+						'<tr>' 		
					+							'<td colspan="2"><hr>' 		
					+								'<div class="details-under-image-titles"><b>Start Term</b></div><div class="details-under-image-content">' +moment(person.term_start).format("MMM D, YYYY")+'</div>'
					+							'</td>' 		
					+						'</tr>' 
					+						'<tr>' 		
					+							'<td colspan="2"><hr>' 		
					+								'<div class="details-under-image-titles"><b>End Term</b></div><div class="details-under-image-content">'+moment(person.term_end).format("MMM D, YYYY")+'</div>'
					+							'</td>' 		
					+						'</tr>' 
					+						'<tr>' 		
					+							'<td colspan="2"><hr> ' 		
					+								'<div class="details-under-image-titles"><b>Term</b></div><div class="details-under-image-content"><div class="progress"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="'+Math.floor((moment().unix()-moment(person.term_start).unix())/(moment(person.term_end).unix()-moment(person.term_start).unix())*100)+'" aria-valuemin="0" aria-valuemax="100" style="width:'+Math.floor((moment().unix()-moment(person.term_start).unix())/(moment(person.term_end).unix()-moment(person.term_start).unix())*100)+'%">'+Math.floor((moment().unix()-moment(person.term_start).unix())/(moment(person.term_end).unix()-moment(person.term_start).unix())*100)+'%</div><div class="col-sm-4"><uib-progressbar value="55"></uib-progressbar></div></div></div>'		
					+							'</td>' 		
					+						'</tr>' 
					+						'<tr>' 		
					+							'<td colspan="2"><hr>' 		
					+								'<div class="details-under-image-titles"><b>Office</b></div><div class="details-under-image-content">'+person.office+'</div>' 		
					+							'</td>' 		
					+						'</tr>' 	
					+						'<tr>' 		
					+							'<td colspan="2"><hr>' 		
					+								'<div class="details-under-image-titles"><b>State</b></div><div class="details-under-image-content">'+person.state_name+'</div>' 		
					+							'</td>' 		
					+						'</tr>' 
					+						'<tr>' 		
					+							'<td colspan="2"><hr>' 		
					+								'<div class="details-under-image-titles"><b>Fax</b></div><div class="details-under-image-content"><a href="fax:'+person.fax+'">'+person.fax+'</div>'		
					+							'</td>' 		
					+						'</tr>' 
					+						'<tr>' 		
					+							'<td colspan="2"><hr>' 		
					+								'<div class="details-under-image-titles"><b>Birthday</b></div><div class="details-under-image-content">'+moment(person.birthday).format("MMM D, YYYY")+'</div>'		
					+							'</td>' 		
					+						'</tr>' 
					+						'<tr>' 		
					+							'<td colspan="2"><hr>' 		
					+								'<div class="details-under-image-titles"><b>Social Links</b></div><div class="details-under-image-content">';
					if(person.twitter_id) {
						content+='<a href="https://twitter.com/'+person.twitter_id+'" target="_blank"><img class="details-social-img" src="http://cs-server.usc.edu:45678/hw/hw8/images/t.png"/></a>';
					}
					if(person.facebook_id) {
						content+='<a href="https://facebook.com/'+person.facebook_id+'" target="_blank"><img class="details-social-img" src="http://cs-server.usc.edu:45678/hw/hw8/images/f.png"/></a>';
					}
					if(person.website) {
						content+='<a href="'+person.website+'" target="_blank"><img class="details-social-img" src="http://cs-server.usc.edu:45678/hw/hw8/images/w.png"/></a></div>';
					}
					
					content+=					'</td>' 		
					+						'</tr>' 
					+					'</table>' 
					+				'</td>' 
					+				'<td class="details-right-column" style="padding-left: 30px;">' 
					+					'<h4 style="padding-bottom: 10px;" class="h4">Committees</h4>'
					+					'<table class="details-comm-table"><tr><th style="width:15%">Chamber</th><th style="width:15%">Committee ID</th><th>Name</th></tr>';
					 					
					 $(personComms).each( function(index, obj) {
						 content+= '<tr><td><hr>'+obj.chamber.charAt(0).toUpperCase() + obj.chamber.slice(1)+'</td>'
						 		+		'<td><hr>'+obj.committee_id+'</td>'
						 		+		'<td style="width: 70%"><hr>'+obj.name+'</td></tr>';
					 });
					content+=	'</table><h4 style="padding: 30px 0px 10px;" class="h4">Bills</h4><table class="details-bills-table"><tr><th style="width:15%">Bill ID</th><th>Title</th><th>Chamber</th><th>Bill Type</th><th>Congress</th><th>Link</th></tr>';

					$(personBills).each( function(index, obj) {
						if (!obj.urls.pdf) {
							obj.urls.pdf = "#";
						}
						 content+= '<tr><td><hr>'+obj.bill_id+'</td>'
						 		+		'<td style="width:20%"><hr>'+obj.official_title+'</td>'
						 		+		'<td><hr>'+obj.chamber+'</td>'
						 		+		'<td><hr>'+obj.bill_type+'</td>'
						 		+		'<td><hr>'+obj.congress+'</td>'
						 		+		'<td><hr><a href="'+obj.urls.pdf+'">Link</a></td></tr>';
					 });
					 
					content+=		'</table></td>' 
					+			'</tr>' 
					+		'</tbody>' 
					+	'</table>'
					+	'</div>';
					
					
					var a = $(content);
		
					a.appendTo('.carousel-inner');
					var index = $('#legislator-carousel .carousel-inner #'+targetId).index();
							$('#legislator-carousel').carousel(index);
							
		

				},
				error: function(xhr, status, error){
		        	console.log(error);
	    		}
			});
		} // end else
		
		
$scope.favButtonClicked = function () {
		console.log("asdfs");
	}


  	};
  	$scope.favButtonClicked = function () {
		console.log("asdfs");
	}
  	//ignore All States option in dropdown
	$scope.ignoreNullComparator = function(actual, expected){
	    if (expected === "All States") {
	        return true;
	    } else {
	        return angular.equals(expected, actual);
	    }
	};
	$('#myTabs a').click(function (e) {
		
		e.preventDefault();
		$scope.search="";
		$scope.select1 = "All States";
		$('.highlight input').css('display','none');
		var filterBy = $(this).attr('id');
		if (filterBy== "senate") {
			$('.dist').css("display","none");
			$('#highlight-title')[0].innerHTML = "Legislators By Senate";
			$('.highlight input').css('display','block');
			$('.highlight select').css('display','none');
			orderBy='lastName';
		}
		else if (filterBy=="house") {
			$('.dist').css("display","table-cell");
			$('#highlight-title')[0].innerHTML = "Legislators By House";
			$('.highlight input').css('display','block');
			$('.highlight select').css('display','none');
			orderBy='lastName';
		}
		//state clicked
		else {
			$('.dist').css("display","table-cell");
			$('#highlight-title')[0].innerHTML = "Legislators By State";
			orderBy=['state', 'lastName'];
// 			$filter('orderBy')($scope.customOrder, ['orderByState', 'orderByLastName']);
			$('.highlight input').css('display','none');
			$('.highlight select').css('display','block');


		}//orderByState, orderByLastName

// 		var orderBy = $(this).attr('data-order');
		$scope.$apply(function() {
			$scope.customFilter = filterBy;
			$scope.customOrder = orderBy;
		});
// 		$(this).tab('show')
// 		console.log($scope.customOrder);
	});
	$scope.titleText = '';
	$('#billsTabs a').click(function (e) {
		$scope.currentBill = filterBy;
		e.preventDefault();
		$scope.search="";
		
		$('.highlight input').css('display','block');
		var filterBy = $(this).attr('id');
		
		
		if (filterBy== "active") {
			$('#highlight-bills-title')[0].innerHTML = "Active Bills";
			orderBy='introduced';
		
			
		}
		else if (filterBy=="new") {
			$('#highlight-bills-title')[0].innerHTML = "New Bills";
			orderBy='introduced';
			
			
		}
		$scope.bills = function() {
			if (filterBy== "active") {
				return $scope.billsOld;
			} else {
				return $scope.billsNew;
			}

		};
		$scope.$apply(function() {
			$scope.customFilter = filterBy;
			$scope.customOrder = orderBy;
		});
// 		$(this).tab('show')
// 		console.log($scope.customOrder);
	});	
	$('#commTabs a').click(function (e) {
		
		e.preventDefault();
		$scope.search="";
		
		$('.highlight input').css('display','block');
		var filterBy = $(this).attr('data-filter');
		
		
		if (filterBy== "house") {
			$('#highlight-comm-title')[0].innerHTML = "House";
		}
		else if (filterBy=="senate") {
			$('#highlight-comm-title')[0].innerHTML = "Senate";

		} else {
			$('#highlight-comm-title')[0].innerHTML = "Joint";
		}

		$scope.$apply(function() {
			$scope.customFilter = filterBy;
			$scope.customOrder = orderBy;
		});
// 		$(this).tab('show')
// 		console.log($scope.customOrder);
	});	

	
	$('.highlight input').on("change", function(e) {
		e.preventDefault();
		$('.dist').css("display","none");

	});
	
	$('#left-side a').on("click", function(e) { 
		
		e.preventDefault(); 
		
		var target = $(this).attr("data-target");
		$('#right-side [data-current="true"]').css('display',"none");
		$('#right-side [data-current="true"]').attr('data-current',"false");
		
		var targetNode = document.getElementById(target);   
		$(targetNode).css("display","block");
		$(targetNode).attr('data-current',"true");
		
		$(targetNode).find('[role="presentation"]:first a').click();
		
	});
	
	
	
});













