angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope,$http,$lunbopic,$HomeGoodlistRow,$HomeNewLists,$HomechooseLists,$rootScope,$ionicSideMenuDelegate,$ionicSlideBoxDelegate) {

	$http.post($rootScope.URLAdmin + '/Handler/OfflineCourseHandler.ashx?action=indexshow','').success(function(result){
		//更新轮播图
		$ionicSlideBoxDelegate.$getByHandle("slideimgs").update();
		//让轮播图循环播放
		$ionicSlideBoxDelegate.$getByHandle("slideimgs").loop("true");
		$scope.lunboPic = result.data.bannerList;
		
		$scope.homeGoodlistRows = [[result.data.goodList[0],result.data.goodList[1]],[result.data.goodList[2],result.data.goodList[3]]];
		$scope.homeNewListRow = [[result.data.newList[0],result.data.newList[1]],[result.data.newList[2],result.data.newList[3]]];
		$scope.homechooseList = result.data.chooseList;
	})
	
	$rootScope.tz_study = function(id){
		window.location = '#/tab/study/'+id;
	}

	$scope.toggleLeftSideMenu = function(){
		$ionicSideMenuDelegate.toggleLeft();
	}
	
	
	$rootScope.homesearch = {
		searchText:""
	};
	
	$scope.tz_search =function(){
//		console.log($rootScope.homesearch.searchText)
		if($rootScope.homesearch.searchText){
			window.location = "#/tab/courselist";
		}
	}
	
})

.controller('CourseCtrl', function($scope,$rootScope,$courseLists,$http) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
	
	
	$http.post($rootScope.URLAdmin + '/Handler/OfflineCourseHandler.ashx?action=getcategory','').success(function(response){
		$scope.courseNameData = response.data;

	});
	
	
	
	$scope.lists = [];
	$scope.nowPage = 1;
	$scope.searchText = '';
	$scope.CategoryTwo = '';
	$scope.CpriceId = '';
	
	$scope.showMore = true;
	
	
	$scope.getCourseList = function(){
		$scope.showMore = false;
	  	
	  	$scope.myData = {
	  		'pageStart': $scope.nowPage,
	  		'searchText': $scope.searchText,
	  		'CategoryTwo': $scope.CategoryTwo,
	  		'CpriceId': $scope.CpriceId
	  	};
//	  	console.log($scope.myData.CpriceId);
	  	
	  	// 发送请求数据
		$http.post($rootScope.URLAdmin + '/Handler/OfflineCourseHandler.ashx?action=courseshow',$scope.myData).success(function(response){
//			console.log($scope.myData.CpriceId);
			
			$scope.totalPage = Math.ceil(response.data.count / response.data.pageSize);
			$scope.lists = $scope.lists.concat(response.data.list);
			$scope.nowPage = response.data.pageStart;
			if($scope.myData.searchText || $scope.myData.CategoryTwo || $scope.myData.CpriceId){
				$scope.showMore = false;
			}else if($scope.lists.length >= response.data.count ){
				$scope.showMore = false;
			}else{
				$scope.showMore = true;
			}
		});
	}
	
	$scope.courseSearch = function(searchText, CategoryTwo, CpriceId){
//		console.log(CpriceId)
		$scope.searchText = searchText;
		$scope.CategoryTwo = CategoryTwo;
		$scope.CpriceId = CpriceId;
		
		$scope.lists = [];
		$scope.nowPage = 0;
		
		$scope.getCourseList();
	}
  	
  	
  	
  	$scope.loadMore = function(){
		$scope.nowPage++;
  		$scope.getCourseList();
  		$scope.$broadcast("scroll.infiniteScrollComplete")
  	}
  		
  	$scope.searchInputText = {
  		searchText:""
  	}
  	$scope.myKeyup = function(e){
//		console.log( $scope.searchInputText.searchText)
        var keycode = window.event ? e.keyCode : e.which;
        if(keycode == 0 || keycode == 13){
            $scope.courseSearch($scope.searchInputText.searchText,'', '');
            $scope.searchInputText.searchText = '';
        }
    }
  	
  	$scope.doRefresh = function(){
  		$scope.$broadcast("scroll.refreshComplete");
  	}
		 
	$scope.courseFlag = true;
	$scope.priceFlag = true;
	$scope.isCourseOn = false;
	$scope.isPriceOn = false;
	
	
	$scope.priceBtns=[ 
	  {id:2, btnName:"全部"}, 
	  {id:0, btnName:"免费"}, 
	  {id:100, btnName:"收费"} 
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
	if($rootScope.homesearch.searchText){
		$scope.lists = [];
//		console.log($rootScope.homesearch.searchText)
		$scope.courseSearch($rootScope.homesearch.searchText,'', '');
        $rootScope.homesearch.searchText = '';
	}else{
		
		$scope.getCourseList();
	}
	
})

.controller('MycourseCtrl', function($scope,$rootScope,$http) {

	$scope.loginFalg = false;
  	$scope.mycourseIsVisibale = false;
  	$scope.collectIsVisibale = true;
  	$scope.courseSelectOn = true;
	$scope.collectSelectOn = false;
	$scope.isEdit = false;
	
	
	$http.post($rootScope.URLAdmin + '/Handler/UserHandler.ashx?action=isLogin','').success(function(response){
		if(response.success){			
			$scope.loginFalg = true;
				$scope.getMycourseList();
  				$scope.getMycollectList();
		}
	});
		
		
  	$scope.showEdit = function(){
			$scope.shouldShowDelete = !$scope.shouldShowDelete;
	}
  	
  	$scope.getMycourseList = function(){
  		$http.get($rootScope.URLAdmin + '/Handler/OnCourseHandler.ashx?action=mycourse').success(function(response){
			$scope.itemFir = response.data;
		});
  	}
  	
  	$scope.getMycollectList = function(){
  		$http.get($rootScope.URLAdmin + '/Handler/OnCourseHandler.ashx?action=mycollection').success(function(response){
			$scope.itemSec =  response.data;
		});
  	}
  	
  	$scope.deleteCollect = function(id){
  		var course = {
  			courseId:id
  		}
  		console.log(course)
  		$http.post($rootScope.URLAdmin + '/Handler/OnCourseHandler.ashx?action=deletecollection',course).success(function(response){
			console.log(response);
  			if(response.err){
  				$ionicPopup.alert({
					title: "提示信息",
					template: response.err
				});	
  			}else{
  				$scope.itemSec.splice($scope.itemSec.indexOf(id),1);
  			}
		});
  	}
  	
  	//分享课程
    $scope.share = function(itemID) {
    	console.log(itemID)
        window.plugins.socialsharing.share('给你分享一个很棒的课程', null, null,$rootScope.URLAdmin+'/www/index.html#/tab/lesslistStudy/'+itemID);
    };
  	
  	$scope.mycourseToggle = function(){
		$scope.mycourseIsVisibale = false;
		$scope.collectIsVisibale = true;
		$scope.courseSelectOn = true;
		$scope.collectSelectOn = false;
		$scope.isEdit = false;
	};
	
	$scope.collectToggle = function(){
		$scope.collectIsVisibale = false;
		$scope.mycourseIsVisibale = true;
		$scope.collectSelectOn = true;
		$scope.courseSelectOn = false;
		$scope.isEdit = true;
	}
})

.controller('UserCenterCtrl', function($scope,$http,$rootScope,$ionicPopup) {
	$scope.settings = {
	   enableFriends: true
	};
	
	$rootScope.hideTabs = false;
	
	$http.post($rootScope.URLAdmin + '/Handler/UserHandler.ashx?action=isLogin','').success(function(response){
		if(response.success){
			window.location = "#/tab/information";
		}
	});
	
	$scope.loginuser = {
		name:'',
		pwd:''
	};
	
	$scope.loginInfor = {
		userName:'',
		userPwd:''
	};
	
	
	$scope.doLogin = function(infor){
		if(!!infor.name && !! infor.pwd){
			$scope.loginInfor = {
				userName:infor.name,
				userPwd:infor.pwd
			};
			$scope.loginCheck($scope.loginInfor);
		}
	}
	
	$scope.loginCheck = function(infor){
		$http.post($rootScope.URLAdmin + '/Handler/UserHandler.ashx?action=login',infor).success(function(response){
			if(response.err){
				$ionicPopup.alert({
					title: "提示信息",
					template: response.err
				});		
			}else{
				window.location = "#/tab/information";
			}
		});
	}
})


.controller('RegisterCtrl',function($scope,$ionicPopup,$http,$rootScope) {
	$scope.registerInfor = {
		userName:'',		
		email:'',
		phone:'',
		userPwd:'',
		nickname:'',
		userPic:''
	};
	
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
				$scope.registerInfor = {
					userName:infor.name,		
					email:infor.email,
					phone:infor.phone,
					userPwd:infor.pwd,
					nickname:'',
					userPic:''
				};
				 $scope.register($scope.registerInfor);
			}
		}else{
			$ionicPopup.alert({
				title: "提示信息",
				template:'请输入信息！'
			});
		}
	}
	
	$scope.register = function(regInfor){
		$http.post($rootScope.URLAdmin + '/Handler/UserHandler.ashx?action=add',regInfor).success(function(response){
			if(response.err){
				$ionicPopup.alert({
				title: "提示信息",
				template:response.err
			});
			}else{
				window.location = "#/tab/usercenter";
			}
		});
	}
})


.controller('InformationCtrl',function($scope,$http,$rootScope){
	$scope.user = {};
	$scope.getUeserInfor = function(){
		$http.get($rootScope.URLAdmin + '/Handler/OnCourseHandler.ashx?action=returnuserinfo').success(function(response){
			if(response.success){
				
				$scope.user = response;
			}
			console.log($scope.user)
			
		});
	}
	$scope.logOut = function(){
		$http.post($rootScope.URLAdmin + '/Handler/UserHandler.ashx?action=quit','').success(function(response){
			console.log(response);
			if(response.success){
				window.location="#/tab/usercenter";
			}
		});
	}
	
	$scope.getUeserInfor();
})


.controller('StudyCtrl',function($scope,$rootScope,studyList,assessList,$ionicModal,$http,$stateParams,$ionicPopup){
	
	$scope.course = {
  		courseId:$stateParams.courseid
	};
	$rootScope.courseid = $stateParams.courseid;
	
	$http.post($rootScope.URLAdmin + '/Handler/UserHandler.ashx?action=isLogin','').success(function(response){
		if(response.success){
			$scope.isLogin = true;
			$scope.getStudyInforLogin();
		}else{
			$scope.getStudyInforNotLogin();
			$scope.isLogin = false;
		}
	});
	
	//未登录的请求
	$scope.getStudyInforNotLogin = function(){
		$http.post($rootScope.URLAdmin + '/Handler/OfflineCourseHandler.ashx?action=learnshow',$scope.course).success(function(response){
			if(response.success){
				$scope.studyMulu = response.data;
				$scope.Vurl = $rootScope.URLAdmin + $scope.studyMulu.CDlist[0].Vlist[0].Vurl;
				console.log($scope.studyMulu);
			}
		});
	}
	//已登录的请求
	$scope.getStudyInforLogin = function(){
		$http.post($rootScope.URLAdmin + '/Handler/OnCourseHandler.ashx?action=learnshow',$scope.course).success(function(response){
			if(response.success){
				$scope.studyMulu = response.data;
				$scope.Vurl = $rootScope.URLAdmin + $scope.studyMulu.CDlist[0].Vlist[0].Vurl;
				if($scope.studyMulu.ifColected){
					$scope.ifCollect = {
						collectText:"已收藏",
						isActive: true
					}									
				}else{
					$scope.ifCollect = {
						collectText:"收藏",
						isActive: false
					}
				}
				if($scope.studyMulu.ifPay){
					$scope.ifPayed = {
						payText:"已购买",
						isPayActive: true,
						ifPay:true
					}
					
				}else{
					$scope.ifPayed = {
						payText:"购买",
						isPayActive: false,
						ifPay:false
					}
					
				}
				
				for(var i = 0; i < $scope.studyMulu.CDlist.length; i++){
					for(var j = 0; j < $scope.studyMulu.CDlist[i].Vlist.length; j++){
						if($scope.studyMulu.CDlist[i].Vlist[j].isViewed){
							$scope.isViewed = true;
						}else{
							$scope.isViewed = false;
						}
					}
				}
//				if($scope.studyMulu.ifColected)
			}
		});
	}
	console.log($scope.ifPayed);
	
	$scope.addCollect = function (){

		$http.post($rootScope.URLAdmin + '/Handler/OnCourseHandler.ashx?action=collection',$scope.course).success(function(response){
			if(response.success){
				$scope.ifCollect.isActive = !$scope.ifCollect.isActive
				$ionicPopup.alert({
					title: "提示信息",
					template:response.success
				});	
				if(response.ifColected){
					$scope.ifCollect.collectText = "已收藏"
				}else{
					$scope.ifCollect.collectText = "收藏"
				}
				console.log(response)	
			}
			
		});
	}
	$scope.buyCourse = function(){
		$http.post($rootScope.URLAdmin + '/Handler/OnCourseHandler.ashx?action=buy',$scope.course).success(function(response){
			if(response.success){
				$ionicPopup.alert({
					title: "提示信息",
					template:response.success
				});	
				$scope.ifPayed = {
					payText:"已购买",
					isPayActive: true,
					ifPay:true
				}
			}
		});
	
	}
	
	$scope.play = function(vList){
		console.log(vList)
		if($scope.isLogin == false){
			$ionicPopup.alert({
				title: "提示信息",
				template:"请先登录"
			});	
		} else if($scope.ifPay == false){
			$ionicPopup.alert({
				title: "提示信息",
				template:"请先购买"
			});	
		} else{
			$scope.Vurl = vList.Vlist;			
		}
	}
	
	$scope.mymulu = true;
	$scope.mydetail = false;
	$scope.color = {color:"#63aafc"};

	$scope.contents_left = function(){
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

	$scope.toBack = function(){
			window.location = '#/tab/home';
	}
})

.controller('TaskCtrl',function($scope,$rootScope,$http,$stateParams,$ionicPopup) {
	
	console.log($rootScope.courseid)
	$scope.idLogin = false;
	$scope.close = function(){
		$scope.modal.hide();
	}
	
	$http.post($rootScope.URLAdmin + '/Handler/UserHandler.ashx?action=isLogin','').success(function(response){
		if(response.success){
			$scope.idLogin = true;
		}else{
			$scope.idLogin = false;
		}
	});
		
	
	$scope.evaluate ={
		courseId:$rootScope.courseid,
		evaluate:''
	}	
	$scope.createContact = function(){
			$http.post($rootScope.URLAdmin + '/Handler/OnCourseHandler.ashx?action=addcoursecomments',$scope.evaluate).success(function(response){
				console.log(response)
				console.log($scope.evaluate)
				if(response.err){
					$ionicPopup.alert({
						title: "提示信息",
						template:response.err
					});				
				}else{
					$ionicPopup.alert({
						title: "提示信息",
						template:"评论成功"
					});		
					$scope.modal.hide();
				}
			});
	}
})




/*底部tabs隐藏显示的指令*/
  .directive('hideTabs', function ($rootScope) {
    return {
      restrict: 'A',
      link: function (scope, element, attributes) {
        scope.$on('$ionicView.beforeEnter', function () {
          scope.$watch(attributes.hideTabs, function(value){
                    $rootScope.hideTabs = value;
            });
        });

        scope.$on('$ionicView.beforeLeave', function () {
          $rootScope.hideTabs = false;
        });
      }
    };
  });
  
  
  


