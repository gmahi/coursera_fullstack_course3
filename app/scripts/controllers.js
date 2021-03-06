'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.showMenu = false;
            $scope.message = "Loading ...";

            menuFactory.getDishes().query(
              function (response) {
                  $scope.dishes = response;
                  $scope.showMenu = true;
              },
              function (response) {
                  $scope.message = "Error: " + response.status + " " + response.statusText;
              });

                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])


        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory', function ($scope, feedbackFactory) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                   
                    $scope.invalidChannelSelection = false;

                    var feedback = feedbackFactory.getFeedback().get();
                    feedback.mychannel = $scope.feedback.mychannel;
                    feedback.firstName = $scope.feedback.firstName;
                    feedback.lastName = $scope.feedback.lastName;
                    feedback.agree = $scope.feedback.agree;
                    feedback.email = $scope.feedback.email;
                    feedback.$save();



                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

           
            $scope.showDish = false;
            $scope.message = "Loading ...";

            $scope.dish = menuFactory.getDishes().get({ id: parseInt($stateParams.id, 10) })
            .$promise.then(
                            function (response) {
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function (response) {
                                $scope.message = "Error: " + response.status + " " + response.statusText;
                            }
            );
          
            
        }])

        .controller('DishCommentController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
            
            $scope.comment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {

                $scope.comment.date = new Date().toISOString();
                console.log($scope.comment);

                $scope.dish.comments.push($scope.comment);
                menuFactory.getDishes().update({ id: $scope.dish.id }, $scope.dish);

                $scope.commentForm.$setPristine();

                $scope.comment = { rating: 5, comment: "", author: "", date: "" };
            };
        }])

// implement the IndexController and About Controller here

.controller('IndexController', ['$scope', 'corporateFactory', 'menuFactory', function ($scope, corporateFactory, menuFactory) {

   

    $scope.showChef = true;
    $scope.chefStatus = "Loading...";
    $scope.chef = corporateFactory.getLeader(3).get()
        .$promise.then(
            function (response) {
                $scope.chef = response;
                $scope.showChef = true;
            },
            function (response) {
                $scope.chefStatus = "Error: " + response.status + " " + response.statusText;
            }
        );


    $scope.showPromotion = false;
    $scope.promotionMessage = "Loading...";
    $scope.promotion = menuFactory.getPromotion(0).get()
        .$promise.then(
            function (response) {
                $scope.promotion = response;
                $scope.showPromotion = true;
            },
            function (response) {
                $scope.promotionMessage = "Error: " + response.status + " " + response.statusText;
            }
        );

    
    $scope.showDish = false;
    $scope.message = "Loading ...";

    $scope.featuredDish = menuFactory.getDishes().get({id:0})
                        .$promise.then(
                            function (response) {
                                $scope.featuredDish = response;
                                $scope.showDish = true;
                            },
                            function (response) {
                                $scope.message = "Error: " + response.status + " " + response.statusText;
                            }
                        );

}])


 .controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {

     $scope.showLeaders = true;
     $scope.leadersStatus = "Loading...";
     $scope.leaders = corporateFactory.getLeaders().query(
         function (response) {
             $scope.leaders = response;
             $scope.showLeaders = true;
         },
         function (response) {
             $scope.leadersStatus = "Error: " + response.status + " " + response.statusText;
         });
 }])



;
