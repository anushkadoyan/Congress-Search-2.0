var myApp = angular.module("myModule",  ['angularUtils.directives.dirPagination']);


states = {     "AL": "Alabama",     "AK": "Alaska",     "AS": "American Samoa",     "AZ": "Arizona",     "AR": "Arkansas",     "CA": "California",     "CO": "Colorado",     "CT": "Connecticut",     "DE": "Delaware",     "DC": "District Of Columbia",     "FM": "Federated States Of Micronesia",     "FL": "Florida",     "GA": "Georgia",     "GU": "Guam",     "HI": "Hawaii",     "ID": "Idaho",     "IL": "Illinois",     "IN": "Indiana",     "IA": "Iowa",     "KS": "Kansas",     "KY": "Kentucky",     "LA": "Louisiana",     "ME": "Maine",     "MH": "Marshall Islands",     "MD": "Maryland",     "MA": "Massachusetts",     "MI": "Michigan",     "MN": "Minnesota",     "MS": "Mississippi",     "MO": "Missouri",     "MT": "Montana",     "NE": "Nebraska",     "NV": "Nevada",     "NH": "New Hampshire",     "NJ": "New Jersey",     "NM": "New Mexico",     "NY": "New York",     "NC": "North Carolina",     "ND": "North Dakota",     "MP": "Northern Mariana Islands",     "OH": "Ohio",     "OK": "Oklahoma",     "OR": "Oregon",     "PW": "Palau",     "PA": "Pennsylvania",     "PR": "Puerto Rico",     "RI": "Rhode Island",     "SC": "South Carolina",     "SD": "South Dakota",     "TN": "Tennessee",     "TX": "Texas",     "UT": "Utah",     "VT": "Vermont",     "VI": "Virgin Islands",     "VA": "Virginia",     "WA": "Washington",     "WV": "West Virginia",     "WI": "Wisconsin",     "WY": "Wyoming" }

myApp.controller("myController",function($scope, $filter) {
	
		$.ajax({
        url: '../main.php',
        type: 'GET',
        dataType: "json",
        data: {},
        success: function(data) {
// 			data = read_from_local_file('leg.json');
			legislators = data[0]["results"];	
			billsOld = data[2]["results"];
			billsNew= data[3]["results"];
			committees = data[1]["results"];
			$scope.people =[];	
			$scope.billsNew =[];	
			$scope.billsOld =[];	
			$scope.committees =[];	
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
						"chamberImage":chamberImageForBills
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
						"chamberImage":chamberImageForBills
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
				var chamberImageForCommittees = "http://cs-server.usc.edu:45678/hw/hw8/images/h.png";
				
				if(obj.chamber.charAt(0).toUpperCase() + obj.chamber.slice(1) == "Senate") {
					chamberImageForCommittees = "http://cs-server.usc.edu:45678/hw/hw8/images/s.svg";
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
        }
    });
    $scope.stateSelects = ['All States','Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
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
		$('#left-side a:first').click();
		});
		 $(window).on("load", function() {

		$('.detailsButton').on("click", function(e) {
			console.log('asdf');
				e.preventDefault();
				alert("ASDF");
			});
			});
	$('#tabButton').click(function(e) {
		e.preventDefault();
		if($('#left-side').css('display')=="table-cell") {
			console.log("nono");
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

	//view detail button clicked
	$scope.buttonClicked = function(obj){



	
		
	if(elementExists) {
		var index = $('#Zendesk-carousel .carousel-inner #'+id).index();
		$('#Zendesk-carousel').carousel(index);
		$(ticketID).css('border-left','3px solid #78a300');
		$('.Zendesk-controls').on('click', function() {
			$(ticketID).css('border-left','none');
		});
		//find div with same id
		$('p.expander').expander({
			expandText: '[...]',
			expandEffect: 'slideDown',
			collapseEffect: 'slideUp',
			userCollapseText: '[^]'
		});

	} //if(elementExists)	

		if(obj.target.attributes[3] && obj.target.attributes[3].value.length) {
			var targetId = obj.target.attributes[3].value;
		}
			var targetIdHash = '#'+targetId;
		var elementExists = document.getElementById(targetId);
		if(elementExists) {
			var index = $('#legislator-carousel .carousel-inner #'+targetId).index();

		} else {
			//  Append a slide to the carousel div
			var a = $('<div class="item" data-id="1" id="'+targetId+'"><a href="#legislator-carousel"  data-slide-to="0"><button class="btn btn-default"><span class="glyphicon glyphicon-chevron-left"></span></button></a></div>');
			a.appendTo('.carousel-inner');
			var index = $('#legislator-carousel .carousel-inner #'+targetId).index();
	
		}

		$('#legislator-carousel').carousel(index);		



  	};
  	
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













