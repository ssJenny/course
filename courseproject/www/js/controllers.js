angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope,$lunbopic,$HomeGoodlistRow,$HomeNewLists,$HomechooseLists,$rootScope,$ionicSideMenuDelegate) {

	$rootScope.tz_study = function(id){
		window.location = '#/tab/study/'+id;
	}

	$scope.toggleLeftSideMenu = function(){
		$ionicSideMenuDelegate.toggleLeft();
	}

	// $rootScope.isLogin = false;

	$scope.lunboPic = $lunbopic.all();
	$scope.homeGoodlistRows = $HomeGoodlistRow.all();
	$scope.homeNewListRow = $HomeNewLists.all();
	$scope.homechooseList = $HomechooseLists.all();
})

.controller('CourseCtrl', function($scope,$courseLists) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
//
	$scope.showMore = true;
	$scope.chats = $courseLists.some(1);
	$scope.remove = function(chat) {
	    $courseLists.remove(chat);
	};
	
	$scope.loadMore = function () {
	    var pagedata = $courseLists.some(1);
	    if(pagedata.length==0){
	      $scope.showMore=false;
	    }
	    $scope.chats = $scope.chats.concat(pagedata);
	    $scope.$broadcast("scroll.infiniteScrollComplete");
	 }
	 $scope.doRefresh =function () {
//            $scope.arr.push($scope.arr.length);
        $scope.$broadcast("scroll.refreshComplete")
    }
	 
	$scope.courseFlag = true;
	$scope.priceFlag = true;
	$scope.isCourseOn = false;
	$scope.isPriceOn = false;
	
	$scope.courseListBtns=[ 
	  {id:0, btnName:"全部"}, 
	  {id:1, btnName:"UI"}, 
	  {id:2, btnName:"JAVA"}, 
	  {id:3, btnName:"Android"}, 
	  {id:4, btnName:"IOS"}, 
	  {id:5, btnName:"其它"} 
	] ;
	
	$scope.priceBtns=[ 
	  {id:0, btnName:"全部"}, 
	  {id:1, btnName:"免费"}, 
	  {id:2, btnName:"收费"} 
	];
	
	$scope.courseToggle = function(){
		$scope.courseFlag = !$scope.courseFlag;
		$scope.priceFlag = true;
		$scope.isCourseOn = !$scope.isCourseOn;
		$scope.isPriceOn = false;
	};
	
	$scope.priceToggle = function(){
		$scope.priceFlag = !$scope.priceFlag;
		$scope.courseFlag = true;
		$scope.isPriceOn = !$scope.isPriceOn;
		$scope.isCourseOn = false;
	}
})

.controller('CourseDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('MycourseCtrl', function($scope,$courseFirst,$courseSecond) {
  $scope.settings = {
    enableFriends: true
  };

	$scope.showEdit = function(){
			$scope.shouldShowDelete = !$scope.shouldShowDelete;
	}

	$scope.itemFir = $courseFirst.all();
	$scope.itemSec = $courseSecond.all();
  
  	$scope.loginFalg = true;
  	$scope.mycourseIsVisibale = false;
  	$scope.collectIsVisibale = true;
  	$scope.courseSelectOn = true;
	$scope.collectSelectOn = false;
  	
  	$scope.mycourseToggle = function(){
		$scope.mycourseIsVisibale = false;
		$scope.collectIsVisibale = true;
		$scope.courseSelectOn = true;
		$scope.collectSelectOn = false;
	};
	
	$scope.collectToggle = function(){
		$scope.collectIsVisibale = false;
		$scope.mycourseIsVisibale = true;
		$scope.collectSelectOn = true;
		$scope.courseSelectOn = false;
	}




})

.controller('UserCenterCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };

	$scope.loginuser = {
		name:'',
		pwd:''
	};
	$scope.doLogin = function(){
		if(!!$scope.loginuser.name && !! $scope.loginuser.pwd){
			window.location="#/tab/information";
			// $rootScope.isLogin = true;
		}
	}
})

.controller('InformationCtrl',function($scope){
	$scope.logOut = function(){
		window.location="#/tab/register";
	}

	$scope.user = {
		name:"au-revoir",
		email:"742356899@qq.com",
		phone:"18723547056"
	}
})

.controller('StudyCtrl',function($scope,$rootScope,studyList,assessList,$ionicModal){

	$scope.isLogin = false;
	console.log($scope.isLogin)

	$scope.studyMulu = studyList.all();
	$scope.assesslist = assessList.all();

	$scope.mymulu = true;
	$scope.mydetail = false;
	$scope.color = {color:"#63aafc"};

	$scope.contents_left = function(){
		console.log(11244);
		$scope.mymulu = true;
		$scope.mydetail = false;
		$scope.color = {color:"#63aafc"};
		$scope.colorc = {color:"#333"};
	}

	$scope.detail_right = function(){
		$scope.mymulu = false;
		$scope.mydetail = true;
		$scope.color = {color:"#333"};
		$scope.colorc = {color:"#63aafc"};
	}

	$ionicModal.fromTemplateUrl('templates/modal.html',{
		$scope:$scope
		
	}).then(function(modal) {
		$scope.modal = modal;
	});

	$scope.createContact = function(u){
		$scope.contacts.push({pingjia:u.pingjia});
		$scope.modal.hide();
	}

	$scope.toLogin = function(){
			$scope.isLogin = true;
		window.location = '#/tab/login';
	}


	$scope.toBack = function(){
			window.location = '#/tab/home';
	}
})

.controller('TaskCtrl',function($scope) {
	$scope.close = function(){
		$scope.modal.hide();
		console.log(111)
	}
})

.controller('RegisterCtrl',function($scope,$ionicPopup) {
	$scope.infor = {
		name:'',
		email:'',
		phone:'',
		pwd:'',
		pwdt:''
	};
	$scope.doRegister = function(infor){
		var email_reg = /^([a-zA-Z0-9_\.\-])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var phone_reg = /^1[3,5,7,8]\d{9}$/;
		console.log(!!phone_reg.test( infor.phone));
		if(!!infor.name && !! infor.email && !!infor.phone && !!infor.pwd && !!infor.pwdt){
			if(email_reg.test(infor.email) == false){
				$ionicPopup.alert({
					title: "提示信息",
					template:'请输入正确的邮箱地址！'
				});
			}else if(phone_reg.test(infor.phone) == false){
				$ionicPopup.alert({
					title: "提示信息",
					template:'请输入正确的手机号码！'
				});
			}else if(infor.pwd != infor.pwdt){
				$ionicPopup.alert({
					title: "提示信息",
					template:'两次密码输入不一致'
				});
			}else{
				 window.location = "#/tab/login";
			}
		}else{
			$ionicPopup.alert({
				title: "提示信息",
				template:'请输入信息！'
			});
		}
	}
})

/*底部tabs隐藏显示的指令*/
  .directive('hideTabs', function ($rootScope) {
    return {
      restrict: 'A',
      link: function (scope, element, attributes) {
        scope.$on('$ionicView.beforeEnter', function () {
          $rootScope.hideTabs = attributes.hideTabs;
        });

        scope.$on('$ionicView.beforeLeave', function () {
          $rootScope.hideTabs = false;
        });
      }
    };
  });
